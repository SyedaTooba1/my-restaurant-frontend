import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MicButton from "../components/MicButton";
import VoiceCallManager from "../components/VoiceCallManager";

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function safeString(v) {
  if (v === undefined || v === null || v === "") return "-";
  return String(v);
}

function parseDateCandidate(d) {
  // Accept ISO strings or timestamps or Date objects
  if (!d) return null;
  try {
    // If object with many shapes, try common keys
    if (typeof d === "object" && d !== null) {
      if (d.date) return new Date(d.date);
      if (d.datetime) return new Date(d.datetime);
      if (d.time) return new Date(d.time);
      if (d.ts) return new Date(d.ts);
    }
    return new Date(d);
  } catch {
    return null;
  }
}

function formatDateTimeForUI(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "-";
  // British-style formatting
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function findClosestFutureBooking(bookings = []) {
  if (!Array.isArray(bookings) || bookings.length === 0) return null;
  const now = Date.now();
  let best = null;
  let bestTs = Infinity;

  for (const b of bookings) {
    // accept booking as string, object, etc.
    // try several fields where date might be stored
    const candidates = [
      b?.date,
      b?.datetime,
      b?.time,
      b?.start,
      b?.when,
      b, // fallback if it's a plain string or timestamp
    ];
    for (const c of candidates) {
      const dt = parseDateCandidate(c);
      if (dt && dt.getTime() > now && dt.getTime() < bestTs) {
        best = b;
        bestTs = dt.getTime();
      }
    }
  }

  return best;
}

export default function Assistant() {
  const [listening, setListening] = useState(false);
  const [connectedSince, setConnectedSince] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [disconnectNotice, setDisconnectNotice] = useState("");

  // session + polling
  const [sessionId, setSessionId] = useState(null);
  const pollingRef = useRef(null);
  const timerRef = useRef(null);

  // data shown in UI
  const [customer, setCustomer] = useState({ name: "-", phone: "-", address: "-" });
  const [orderSummary, setOrderSummary] = useState({ lines: ["-"] });
  const [bookingUI, setBookingUI] = useState({ date: "-", guests: "-", location: "-" });

  // timer for listening elapsed
  useEffect(() => {
    if (listening && connectedSince) {
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - connectedSince);
      }, 250);
      return () => clearInterval(timerRef.current);
    }
    return undefined;
  }, [listening, connectedSince]);

  function toggleListening(next) {
    if (next) {
      setDisconnectNotice("");
      const now = Date.now();
      setConnectedSince(now);
      setListening(true);
      setElapsedMs(0);
    } else {
      // disconnect
      clearInterval(timerRef.current);
      const durationMs = Date.now() - (connectedSince || Date.now());
      const formatted = formatTime(durationMs);
      setListening(false);
      setConnectedSince(null);
      setElapsedMs(0);
      setDisconnectNotice(`Connected for ${formatted}`);
      setTimeout(() => setDisconnectNotice(""), 3500);
    }
  }

  // create session on mount and start polling
  useEffect(() => {
    let mounted = true;

    async function createSessionAndStart() {
      try {
        const resp = await fetch("https://175.107.202.121:5672/sessions", {
          method: "POST",
        });
        if (!resp.ok) throw new Error(`Failed to create session: ${resp.status}`);
        const data = await resp.json();
        if (!mounted) return;
        const sid = data.session_id;
        setSessionId(sid);

        // initial fetch immediately
        await fetchCurrentAndUpdateUI(sid);

        // start polling every 10s (10000 ms)
        pollingRef.current = setInterval(() => {
          fetchCurrentAndUpdateUI(sid).catch((err) => {
            // keep polling; optionally you can stop on repeated errors
            console.error("Polling error:", err);
          });
        }, 10000);
      } catch (err) {
        console.error("Could not create session:", err);
      }
    }

    createSessionAndStart();

    return () => {
      mounted = false;
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // empty deps -> runs once on full page load
  }, []);

  async function fetchCurrentAndUpdateUI(sid) {
    if (!sid) return;
    try {
      const resp = await fetch(`https://175.107.202.121:5672/sessions/${sid}/current`);
      if (!resp.ok) {
        console.warn("Failed to fetch current session data:", resp.status);
        return;
      }
      const body = await resp.json();
      // body: { order: {...}, customer: {...}, bookings: [...] }

      // CUSTOMER
      const cust = body.customer || {};
      const name = safeString(cust.name ?? cust.full_name ?? cust.customer_name ?? "-");
      const phone = safeString(cust.phone ?? cust.phone_number ?? cust.mobile ?? "-");
      const address = safeString(cust.address ?? cust.addr ?? cust.location ?? "-");
      setCustomer({ name, phone, address });

      // ORDER: try multiple shapes
      const order = body.order ?? {};
      let lines = [];
      // If order has items as array of {name, qty, price} or simple list
      if (Array.isArray(order.items) && order.items.length > 0) {
        lines = order.items.map((it) => {
          const n = safeString(it.name ?? it.item ?? "-");
          const q = it.qty ?? it.quantity ?? it.q ?? 1;
          const p = it.price ?? it.cost ?? "";
          return `${n}: ${q} qty${p ? ` - ${p}` : ""}`;
        });
      } else if (order?.lines && Array.isArray(order.lines) && order.lines.length > 0) {
        lines = order.lines.map((l) => safeString(l));
      } else if (Object.keys(order).length === 0) {
        lines = ["-"];
      } else {
        // try to present some keys
        const entries = Object.entries(order).slice(0, 5);
        lines = entries.map(([k, v]) => `${k}: ${safeString(v)}`);
      }
      setOrderSummary({ lines });

      // BOOKINGS: pick closest future booking
      const bookings = Array.isArray(body.bookings) ? body.bookings : [];
      const closest = findClosestFutureBooking(bookings);
      if (closest) {
        // attempt to find date/time, guests, location
        const dateObj =
          parseDateCandidate(closest.date) ??
          parseDateCandidate(closest.datetime) ??
          parseDateCandidate(closest.time) ??
          parseDateCandidate(closest.start) ??
          parseDateCandidate(closest.when) ??
          null;
        const dateStr = dateObj ? formatDateTimeForUI(dateObj) : "-";
        const guests = safeString(closest.guests ?? closest.num_guests ?? closest.party ?? "-");
        const location = safeString(
          closest.location ?? closest.venue ?? closest.place ?? closest.address ?? "-"
        );
        setBookingUI({ date: dateStr, guests, location });
      } else {
        // no future bookings
        setBookingUI({ date: "-", guests: "-", location: "-" });
      }
    } catch (err) {
      console.error("Error fetching session current:", err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6">
        <section className="w-full max-w-2xl">
          <div className="relative bg-white/60 backdrop-blur-sm border border-amber-100 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute -inset-16 -z-10 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-amber-100 opacity-40 blur-3xl animate-pulse-slow" />
            </div>

            <h1 className="text-3xl font-display font-bold text-amber-800 mb-2">Voice Assistant</h1>
            <p className="text-gray-600 mb-6">Tap the microphone and speak — I'll handle the rest.</p>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                {/* VoiceCallManager handles microphone, VAD, WS and playback */}
                <VoiceCallManager sessionId={sessionId} />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <div>Session: {sessionId ?? <em>creating…</em>}</div>
            </div>
          </div>
        </section>
      </main>

      {/* Customer, Booking, and Order Details */}
      <section className="p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Details</h3>
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Phone Number:</strong> {customer.phone}
              </p>
              <p>
                <strong>Address:</strong> {customer.address}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Details</h3>
              {orderSummary.lines.length === 0 ? (
                <p>-</p>
              ) : (
                orderSummary.lines.map((l, i) => (
                  <p key={i} className="text-sm">
                    {l}
                  </p>
                ))
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Booking Details</h3>
              <p>
                <strong>Date:</strong> {bookingUI.date}
              </p>
              <p>
                <strong>Guests:</strong> {bookingUI.guests}
              </p>
              <p>
                <strong>Location:</strong> {bookingUI.location}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

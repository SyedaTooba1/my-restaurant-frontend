// src/components/VoiceCallManager.jsx
import React, { useEffect, useRef, useState } from "react";
import CallButton from "./CallButton"; // adjust path if needed
import MicButton from "./MicButton";   // adjust path if needed

const WS_URL = "ws://localhost:8000/ws/audio";
const SILENCE_TIMEOUT_MS = 1000; // ms of silence to consider utterance finished
const VAD_POLL_MS = 100;         // how often to check volume (ms)
const ABSOLUTE_START_THRESHOLD = 0.08; // absolute RMS floor (ignore anything quieter)
const NOISE_MULTIPLIER = 3.0;    // require RMS > noiseFloor * MULTIPLIER
const REQUIRED_CONSECUTIVE_FRAMES = 3; // require N consecutive frames above threshold to start

export default function VoiceCallManager() {
  const [connected, setConnected] = useState(false);      // call active
  const [status, setStatus] = useState("Ready");         // Ready | Listening | Processing | Speaking
  const wsRef = useRef(null);

  // media/audio refs
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);

  // VAD state
  const vadTimerRef = useRef(null);
  const silenceSinceRef = useRef(null);
  const isRecordingRef = useRef(false);
  const isProcessingRef = useRef(false);

  const noiseFloorRef = useRef(0);       // running estimate of background noise RMS
  const aboveCountRef = useRef(0);       // consecutive above-threshold frames counter
  const noiseUpdateAlpha = 0.05;         // smoothing for noise floor update

  // audio element for playback
  const audioRef = useRef(null);

  // open websocket + get mic
  async function startCall() {
    // open websocket
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.binaryType = "arraybuffer";

    wsRef.current.onopen = () => {
      console.log("WS open");
      setConnected(true);
      setStatus("Ready");
    };

    wsRef.current.onmessage = (ev) => {
      // binary audio -> play
      if (ev.data instanceof ArrayBuffer) {
        const arr = new Uint8Array(ev.data);
        // create blob (we expect the same mime type as the recorder; here we use "audio/webm" or browser default)
        const blob = new Blob([arr], { type: "audio/webm" });
        playAudioBlob(blob);
        return;
      }
      // text messages (JSON)
      try {
        const data = JSON.parse(ev.data);
        if (data.event === "processing") {
          console.log("server processing...");
        } else if (data.event === "done") {
          // server done: nothing special here
        } else if (data.event === "no_audio") {
          console.warn("Server reported no audio");
        } else if (data.event === "error") {
          console.error("Server error:", data.message);
        }
      } catch (e) {
        // not JSON - ignore
      }
    };

    wsRef.current.onclose = () => {
      console.log("WS closed");
      setConnected(false);
      // cleanup media if any
      stopMediaCapture();
      setStatus("Ready");
    };

    wsRef.current.onerror = (err) => {
      console.error("WS error", err);
    };

    // request microphone access and start VAD/recorder
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaStreamRef.current = stream;

      // prepare MediaRecorder for chunks
      const options = { mimeType: "audio/webm" }; // browser default - works in Chromium/Firefox
      const mr = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mr.onstop = () => {
        // create final blob and send
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        recordedChunksRef.current = [];

        // send binary audio over websocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          // notify server that we're starting to send
          wsRef.current.send(JSON.stringify({ event: "start" }));
          // send bytes
          blob.arrayBuffer().then((ab) => {
            wsRef.current.send(ab);
            // notify server end (start processing)
            wsRef.current.send(JSON.stringify({ event: "end" }));
            // mark processing
            isProcessingRef.current = true;
            setStatus("Processing");
          });
        } else {
          console.warn("WebSocket not open - cannot send audio");
          setStatus("Ready");
          isProcessingRef.current = false;
        }
      };

      // create AudioContext + analyser for VAD
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024;
      sourceNodeRef.current.connect(analyserRef.current);

      noiseFloorRef.current = 0;    // reset adaptive noise floor on new session
      aboveCountRef.current = 0;

      // VAD poll loop
      silenceSinceRef.current = null;
      vadTimerRef.current = setInterval(checkVadAndRecord, VAD_POLL_MS);
      setStatus("Ready");
    } catch (err) {
      console.error("Could not get microphone:", err);
      setStatus("Ready");
    }
  }

  // stop media capture and VAD
  function stopMediaCapture() {
    if (vadTimerRef.current) {
      clearInterval(vadTimerRef.current);
      vadTimerRef.current = null;
    }
    if (mediaRecorderRef.current && isRecordingRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.disconnect(); } catch {}
      sourceNodeRef.current = null;
    }
    if (analyserRef.current) {
      try { analyserRef.current.disconnect(); } catch {}
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    isRecordingRef.current = false;
    isProcessingRef.current = false;
  }

  // disconnect call
  function stopCall() {
    setConnected(false);
    setStatus("Ready");
    // close ws
    if (wsRef.current) {
      try {
        wsRef.current.send(JSON.stringify({ event: "stop" }));
      } catch {}
      try { wsRef.current.close(); } catch {}
      wsRef.current = null;
    }
    stopMediaCapture();
  }

  // toggle via CallButton
  function onToggleCall(next) {
    if (next) {
      startCall();
    } else {
      stopCall();
    }
  }

  // VAD + control flow:
  function checkVadAndRecord() {
    if (!analyserRef.current || !mediaRecorderRef.current || isProcessingRef.current) return;

    // get instantaneous waveform
    const buf = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(buf);

    // compute normalized RMS in range [0..1]
    let sum = 0;
    for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128;
        sum += v * v;
    }
    const rms = Math.sqrt(sum / buf.length);

    // Update running noise floor only when we're not currently recording and signal is quiet
    // This slowly adapts to ambient background noise.
    if (!isRecordingRef.current && rms < noiseFloorRef.current + 0.0001) {
        // relax noise floor toward current quiet RMS
        noiseFloorRef.current = noiseFloorRef.current * (1 - noiseUpdateAlpha) + rms * noiseUpdateAlpha;
    } else if (!isRecordingRef.current && noiseFloorRef.current === 0) {
        // initialize if zero
        noiseFloorRef.current = rms;
    }

    // compute the effective threshold: higher of absolute floor or adaptive multiple
    const adaptiveThreshold = Math.max(ABSOLUTE_START_THRESHOLD, noiseFloorRef.current * NOISE_MULTIPLIER);

    // If RMS is above threshold => candidate speech frame
    if (rms >= adaptiveThreshold) {
        // count consecutive frames above threshold
        aboveCountRef.current = aboveCountRef.current + 1;
        // require a small run of consecutive frames to avoid false starts
        if (!isRecordingRef.current && aboveCountRef.current >= REQUIRED_CONSECUTIVE_FRAMES) {
        try {
            recordedChunksRef.current = [];
            mediaRecorderRef.current.start();
            isRecordingRef.current = true;
            setStatus("Listening");
        } catch (err) {
            console.error("Failed to start recorder:", err);
        }
        // reset counter once recording starts
        aboveCountRef.current = 0;
        } else {
        // still warming up to a recording; show Listening only if already recording
        if (isRecordingRef.current) setStatus("Listening");
        }
        // reset silence timer
        silenceSinceRef.current = null;
    } else {
        // below threshold
        aboveCountRef.current = 0; // break the consecutive sequence

        if (isRecordingRef.current) {
        // track silence start while recording
        if (!silenceSinceRef.current) silenceSinceRef.current = Date.now();
        const silentFor = Date.now() - silenceSinceRef.current;
        if (silentFor > SILENCE_TIMEOUT_MS) {
            // commit utterance: stop MediaRecorder and let onstop send audio
            try {
            mediaRecorderRef.current.stop();
            } catch (e) {
            console.error("stop() error", e);
            isRecordingRef.current = false;
            setStatus("Ready");
            }
            isRecordingRef.current = false;
            // status will be set to Processing in onstop after we send audio
        } else {
            // still within silence timeout while recording
            setStatus("Listening");
        }
        } else {
        // not recording and quiet: remain Ready
        setStatus("Ready");
        // slowly decay noiseFloor a little (optional)
        // noiseFloorRef.current = Math.max(0, noiseFloorRef.current * 0.999);
        }
    }
    }


  // play an audio blob, set statuses accordingly
  function playAudioBlob(blob) {
    // block VAD while speaking
    isProcessingRef.current = true;
    setStatus("Speaking");
    const url = URL.createObjectURL(blob);
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;
    }
    audio.src = url;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      audio.src = "";
      isProcessingRef.current = false;
      setStatus("Ready");
    };
    // play (user previously gave gesture when starting call, so should be allowed)
    audio.play().catch((err) => {
      console.warn("Audio play blocked:", err);
      // still reset state eventually
      setTimeout(() => {
        isProcessingRef.current = false;
        setStatus("Ready");
      }, 1000);
    });
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopCall();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // UI: show status and the CallButton & MicButton (mic is optional)
  return (
    <div className="voice-call-manager">
      <div className="flex items-center gap-4">
        <CallButton onToggleCall={onToggleCall} />
        <MicButton
          listening={status === "Listening"}
          onToggle={(next) => {
            // manual override to start a listening cycle: only if Ready
            if (next && status === "Ready" && connected && mediaRecorderRef.current) {
              // start a short manual recording cycle
              try {
                recordedChunksRef.current = [];
                mediaRecorderRef.current.start();
                isRecordingRef.current = true;
                setStatus("Listening");
              } catch (err) {
                console.error("manual start error", err);
              }
            } else if (!next && isRecordingRef.current && mediaRecorderRef.current) {
              try {
                mediaRecorderRef.current.stop();
                isRecordingRef.current = false;
              } catch {}
            }
          }}
          size="md"
        />
        <div>
          <div className="text-sm font-semibold">Status: <span className="ml-2">{status}</span></div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <strong>Notes:</strong> While status is <em>Processing</em> or <em>Speaking</em>, new audio is ignored.
      </div>
    </div>
  );
}

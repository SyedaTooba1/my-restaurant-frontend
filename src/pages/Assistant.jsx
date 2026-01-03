import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import MicButton from '../components/MicButton'

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Assistant() {
  const [listening, setListening] = useState(false)
  const [connectedSince, setConnectedSince] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [disconnectNotice, setDisconnectNotice] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    if (listening && connectedSince) {
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - connectedSince)
      }, 250)
      return () => clearInterval(timerRef.current)
    }
    return undefined
  }, [listening, connectedSince])

  function toggleListening(next) {
    if (next) {
      setDisconnectNotice('')
      const now = Date.now()
      setConnectedSince(now)
      setListening(true)
      setElapsedMs(0)
    } else {
      // disconnect
      clearInterval(timerRef.current)
      const durationMs = Date.now() - (connectedSince || Date.now())
      const formatted = formatTime(durationMs)
      setListening(false)
      setConnectedSince(null)
      setElapsedMs(0)
      setDisconnectNotice(`Connected for ${formatted}`)
      setTimeout(() => setDisconnectNotice(''), 3500)
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
                <MicButton listening={listening} onToggle={toggleListening} size="lg" />
              </div>

              <div className="min-h-[1.5rem]">
                {listening ? (
                  <div className="flex items-center gap-3 text-amber-700 font-mono">
                    <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-lg animate-pulse" />
                    <span className="text-lg">{formatTime(elapsedMs)}</span>
                  </div>
                ) : disconnectNotice ? (
                  <div className="text-amber-600 font-medium transition-opacity">{disconnectNotice}</div>
                ) : (
                  <div className="text-gray-500">Ready — press to start</div>
                )}
              </div>
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
              <p><strong>Name:</strong> Ali</p>
              <p><strong>Phone Number:</strong> 0311223344</p>
              <p><strong>Address:</strong> 36th Street</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Details</h3>
              <p><strong>Burger:</strong> 2 qty - 1200 PKR</p>
              <p><strong>Fries:</strong> 1 qty - 300 PKR</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Booking Details</h3>
              <p><strong>Date:</strong> 2026-01-15 3:00</p>
              <p><strong>Guests:</strong> 4</p>
              <p><strong>Location:</strong> Tipu Sultan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

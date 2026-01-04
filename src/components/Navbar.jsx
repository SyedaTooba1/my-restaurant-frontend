import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ logoSrc, onMenuToggle }) {
  const [open, setOpen] = useState(false)

  function handleToggle() {
    const next = !open
    setOpen(next)
    if (onMenuToggle) onMenuToggle(next)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo as Link */}
            <Link to="/" className="flex items-center">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-10 w-auto mr-3" />
              ) : (
                <span className="text-xl font-bold text-gray-800">Feast Mode</span>
              )}
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Menu
            </Link>

            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>

            <Link
              to="/assistant"
              aria-label="Assistant"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-gray-800 text-white shadow-sm hover:bg-gray-700 transition"
            >
              AI Assistant
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggle}
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
              aria-expanded={open}
              aria-label="Open menu"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Menu
            </Link>

            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <Link
              to="/assistant"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              AI Assistant
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

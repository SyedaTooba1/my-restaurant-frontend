import React from 'react'
import PropTypes from 'prop-types'

export default function MicButton({ listening, onToggle, size = 'md' }) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-lg',
  }

  return (
    <button
      aria-pressed={listening}
      aria-label={listening ? 'Stop listening' : 'Start voice assistant'}
      onClick={() => onToggle(!listening)}
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-200 transition-transform transform active:scale-95 ${sizes[size]}`}
    >
      <span className={`absolute inset-0 rounded-full ${listening ? 'mic-pulse' : ''}`} aria-hidden="true" />

      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m0 0a3 3 0 003-3V6a3 3 0 10-6 0v3a3 3 0 003 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0" />
      </svg>

      {/* decorative wave for accessibility/visual */}
      {listening && <span className="absolute -inset-2 mic-wave" aria-hidden="true" />}
    </button>
  )
}

MicButton.propTypes = {
  listening: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

MicButton.defaultProps = {
  listening: false,
  size: 'md',
}

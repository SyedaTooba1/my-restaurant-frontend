import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function CallButton({ onToggleCall }) {
  const [active, setActive] = useState(false)

  function handleClick() {
    const next = !active
    setActive(next)
    if (typeof onToggleCall === 'function') onToggleCall(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={
        `inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors focus:outline-none ` +
        (active
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-indigo-600 text-white hover:bg-indigo-700')
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2.003 5.884l2-3A2 2 0 016 2h2a1 1 0 011 1v3a1 1 0 01-1 1H7.414a7.003 7.003 0 003.172 3.172V11a1 1 0 011 1v2a2 2 0 01-1.884 1.995l-3 .3A2 2 0 014 16.293l-.997-3.99A2 2 0 012 10V6a1 1 0 01.003-.116z" />
      </svg>

      <span>{active ? 'Disconnect' : 'Connect to Assistant'}</span>
    </button>
  )
}

CallButton.propTypes = {
  onToggleCall: PropTypes.func,
}

CallButton.defaultProps = {
  onToggleCall: undefined,
}

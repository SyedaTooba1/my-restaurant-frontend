import React, { useRef, useEffect } from 'react'

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('opacity-100', 'translate-y-0')
            el.classList.remove('opacity-0', 'translate-y-6')
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    // start hidden
    el.classList.add('opacity-0', 'translate-y-6')
    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-700 ${className}`}>
      {children}
    </div>
  )
}

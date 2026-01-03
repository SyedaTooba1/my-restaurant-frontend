import React, { useState, useEffect } from 'react'

const data = [
  { id: 1, name: 'Emma', text: 'Absolutely loved the food — highly recommend!' },
  { id: 2, name: 'Liam', text: 'Great atmosphere and friendly staff.' },
  { id: 3, name: 'Olivia', text: 'Fresh ingredients and excellent flavors.' },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % data.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl font-bold mb-6">What people say</h2>

        <div className="relative">
          {data.map((d, i) => (
            <blockquote
              key={d.id}
              className={`transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            >
              <p className="text-lg text-gray-700">“{d.text}”</p>
              <footer className="mt-4 text-sm text-gray-500">— {d.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

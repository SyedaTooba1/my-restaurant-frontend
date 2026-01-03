import React from 'react'
import Navbar from '../components/Navbar'
// Footer removed from Home per request
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import FeaturedDishes from '../components/FeaturedDishes'
import Testimonials from '../components/Testimonials'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <Reveal>
          <Testimonials />
        </Reveal>
      </main>

      {/* Footer removed per user request */}
    </div>
  )
}

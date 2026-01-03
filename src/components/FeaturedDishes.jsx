import React from 'react'
import MenuCard from './MenuCard'

const sample = [
  { id: 1, name: 'Margherita', description: 'Tomato, basil & mozzarella', price: 9.99, image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'Spicy Pepperoni', description: 'Pepperoni & chili', price: 11.5, image: 'https://images.unsplash.com/photo-1601924928370-3c5a3a2c2f97?auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Caesar Salad', description: 'Romaine & parmesan', price: 7.25, image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=60' },
]

export default function FeaturedDishes() {
  return (
    <section id="featured" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl font-bold mb-6">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sample.map((s) => (
            <MenuCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

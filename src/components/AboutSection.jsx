import React, { useState } from 'react'

export default function AboutSection() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div>
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full"
      >
        Cart ({cart.reduce((count, item) => count + item.quantity, 0)})
      </button>

      {isCartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="flex justify-between">
                    <span>
                      {item.name} ({item.quantity}x)
                    </span>
                    <span>PKR {item.price * item.quantity}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-bold">Total: PKR {calculateTotal()}</h3>
          </div>
        </div>
      )}

      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4">About Us</h2>
              <p className="text-gray-700 mb-4">
                We are a family-run restaurant focused on seasonal ingredients and honest flavors. Our chefs craft each plate with care and inspiration from local producers.
              </p>
              <p className="text-gray-700">
                Join us for a cozy evening or quick lunch — every meal is an opportunity to create memories.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60"
                alt="about"
                className="w-full rounded-lg shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="menu-items">
        <button
          onClick={() => addToCart({ id: 1, name: 'Seekh Kabab', description: 'Delicious grilled kababs', price: 300 })}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Seekh Kabab
        </button>
      </div>
    </div>
  )
}

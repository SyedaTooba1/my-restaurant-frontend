import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} My Restaurant</div>

        <div className="flex items-center gap-4">
          <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
          <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

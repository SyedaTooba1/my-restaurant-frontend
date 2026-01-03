import React from 'react'
import PropTypes from 'prop-types'
import Reveal from './Reveal'

export default function ChefCard({ name, role, bio, image }) {
  return (
    <Reveal>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gray-100 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-amber-600 mb-2">{role}</p>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </div>
    </Reveal>
  )
}

ChefCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.string,
}

ChefCard.defaultProps = {
  role: 'Chef',
  bio: '',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60',
}

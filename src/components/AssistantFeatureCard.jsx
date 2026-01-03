import React from 'react'
import PropTypes from 'prop-types'

export default function AssistantFeatureCard({ title, description, icon }) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-none bg-amber-100 text-amber-600 rounded-full p-2">{icon}</div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </article>
  )
}

AssistantFeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
}

AssistantFeatureCard.defaultProps = {
  description: '',
  icon: null,
}

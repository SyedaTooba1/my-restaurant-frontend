import React from 'react'
import PropTypes from 'prop-types'

const MenuCard = ({ name, description, price, image, showAddButton, onAdd }) => {
  // const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 p-4 sm:p-6 md:p-8">


      <div className="p-4 flex flex-col h-auto min-h-[12rem]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="mt-2 text-sm text-gray-600 break-words">{description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-amber-600 font-bold text-lg">PKR {price}</span>

          {showAddButton ? (
            <button
              onClick={onAdd}
              className="ml-3 inline-flex items-center px-3 py-1.5 bg-gray-500 text-white text-sm rounded-md hover:bg-purple-200 transition"
            >
              Add
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

MenuCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string,
  showAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
}

MenuCard.defaultProps = {
  description: '',
  image: 'https://via.placeholder.com/400x300?text=No+Image',
  showAddButton: false,
  onAdd: undefined,
}

export default MenuCard

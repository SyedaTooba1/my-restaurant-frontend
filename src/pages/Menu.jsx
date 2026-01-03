import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';

const MENU = {
  Starters: [
    {
    id: 's1',
    name: 'Hummus Royale',
    description: 'A creamy blend of chickpeas, tahini, lemon, and garlic, drizzled with olive oil and topped with pomegranate seeds.',
    ingredients: 'Chickpeas, tahini, lemon juice, garlic, olive oil, pomegranate seeds',
    calories: 300,
    dietaryInfo: ['Vegan', 'Gluten-Free'],
    price: 950,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Hummus+Royale'
  },
  {
    id: 's2',
    name: 'Spiced Lentil Soup',
    description: 'A hearty lentil soup with Middle Eastern spices, served with warm pita bread.',
    ingredients: 'Red lentils, cumin, coriander, garlic, onions, olive oil',
    calories: 250,
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
    price: 850,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Spiced+Lentil+Soup'
  },
  {
    id: 's3',
    name: 'Stuffed Grape Leaves (Warak Enab)',
    description: 'Tender grape leaves filled with rice, tomatoes, and aromatic herbs, served with garlic yogurt.',
    ingredients: 'Grape leaves, rice, tomatoes, parsley, mint, garlic yogurt',
    calories: 200,
    dietaryInfo: ['Vegetarian', 'Halal'],
    price: 1000,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Stuffed+Grape+Leaves'
  },
  ],
  'Main Course': [
    {
    id: 'm1',
    name: 'Smoked Beef Kebab with Saffron Rice',
    description: 'Juicy, charcoal-grilled beef kebabs infused with a rich smoky aroma, served over saffron-infused rice.',
    ingredients: 'Premium beef mince, saffron rice, onions, garlic, cumin, coriander, yogurt',
    calories: 750,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 2800,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Smoked+Beef+Kebab'
  },
  {
    id: 'm2',
    name: 'Harissa-Spiced Grilled Chicken',
    description: 'A spicy, marinated grilled chicken breast with a side of herbed couscous and tahini dressing.',
    ingredients: 'Chicken breast, harissa paste, lemon, olive oil, garlic, couscous, tahini',
    calories: 620,
    dietaryInfo: ['Halal', 'High Protein'],
    price: 2200,
    allergens: ['Sesame'],
    image: 'https://via.placeholder.com/400x300?text=Harissa+Grilled+Chicken'
  },
  {
    id: 'm3',
    name: 'Eggplant & Chickpea Tagine',
    description: 'A slow-cooked Moroccan-style stew with eggplant, chickpeas, tomatoes, and fragrant spices, served with fluffy couscous.',
    ingredients: 'Eggplant, chickpeas, tomatoes, cinnamon, cumin, saffron, garlic, onions',
    calories: 480,
    dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    price: 1800,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Eggplant+Chickpea+Tagine'
  },
  {
    id: 'm4',
    name: 'Mutton Karahi with Naan',
    description: 'A traditional Pakistani-style mutton karahi cooked with fresh tomatoes, green chilies, and aromatic spices, served with soft naan.',
    ingredients: 'Mutton, tomatoes, green chilies, garlic, ginger, yogurt, coriander',
    calories: 900,
    dietaryInfo: ['Halal', 'High Protein'],
    price: 3500,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Mutton+Karahi'
  },
  {
    id: 'm5',
    name: 'Chicken Shawarma Platter',
    description: 'Thinly sliced, marinated chicken served with garlic sauce, pickled vegetables, and freshly baked pita bread.',
    ingredients: 'Chicken, yogurt, garlic, cumin, paprika, pita bread, pickled vegetables',
    calories: 700,
    dietaryInfo: ['Halal'],
    price: 2000,
    allergens: ['Gluten'],
    image: 'https://via.placeholder.com/400x300?text=Chicken+Shawarma'
  },
  {
    id: 'm6',
    name: 'Seafood Machboos',
    description: 'A Gulf-style spiced rice dish with marinated prawns and fish, cooked with fragrant spices and saffron.',
    ingredients: 'Basmati rice, prawns, fish fillet, tomatoes, cardamom, saffron, cinnamon',
    calories: 850,
    dietaryInfo: ['Halal', 'High Protein'],
    price: 3200,
    allergens: ['Seafood'],
    image: 'https://via.placeholder.com/400x300?text=Seafood+Machboos'
  },
  {
    id: 'm7',
    name: 'Vegetarian Moussaka',
    description: 'A layered eggplant dish with a tomato-based sauce and béchamel, baked to perfection.',
    ingredients: 'Eggplant, tomatoes, onions, garlic, béchamel sauce, olive oil, oregano',
    calories: 600,
    dietaryInfo: ['Vegetarian'],
    price: 2000,
    allergens: ['Dairy', 'Gluten'],
    image: 'https://via.placeholder.com/400x300?text=Vegetarian+Moussaka'
  },
  {
    id: 'm8',
    name: 'Lamb Shank Ouzi',
    description: 'Slow-cooked lamb shank served over spiced rice with nuts and raisins, infused with traditional Middle Eastern flavors.',
    ingredients: 'Lamb shank, basmati rice, almonds, raisins, saffron, cinnamon',
    calories: 950,
    dietaryInfo: ['Halal', 'High Protein'],
    price: 4200,
    allergens: ['Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Lamb+Shank+Ouzi'
  },
  {
    id: 'm9',
    name: 'Persian Saffron Chicken with Zereshk Rice',
    description: 'Grilled saffron-marinated chicken served with barberry-infused rice and caramelized onions.',
    ingredients: 'Chicken, saffron, yogurt, barberries, caramelized onions, basmati rice',
    calories: 680,
    dietaryInfo: ['Halal', 'High Protein'],
    price: 2600,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Persian+Saffron+Chicken'
  },
  {
    id: 'm10',
    name: 'Turkish Iskender Kebab',
    description: 'Thinly sliced lamb served over pita bread, drizzled with a rich tomato sauce and melted butter.',
    ingredients: 'Lamb, pita bread, tomatoes, butter, yogurt, garlic',
    calories: 900,
    dietaryInfo: ['Halal'],
    price: 3000,
    allergens: ['Gluten', 'Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Turkish+Iskender+Kebab'
  },
  ],
  Desserts: [
    {
    id: 'd1',
    name: 'Kunafa with Creamy Qishta',
    description: 'A traditional Middle Eastern dessert made with crispy shredded phyllo dough, stuffed with rich qishta (clotted cream), and drizzled with aromatic rose and orange blossom syrup.',
    ingredients: 'Phyllo dough, qishta cream, rose water, orange blossom water, pistachios, sugar syrup',
    calories: 620,
    dietaryInfo: ['Halal'],
    price: 1800,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Kunafa+Qishta'
  },
  {
    id: 'd2',
    name: 'Baklava Selection Platter',
    description: 'A luxurious assortment of crispy, honey-soaked baklava filled with nuts and layered phyllo pastry.',
    ingredients: 'Phyllo dough, honey, pistachios, almonds, walnuts, butter, sugar syrup',
    calories: 580,
    dietaryInfo: ['Halal'],
    price: 2000,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Baklava+Platter'
  },
  {
    id: 'd3',
    name: 'Saffron & Rose Rice Pudding',
    description: 'A fragrant, creamy rice pudding delicately flavoured with saffron, rose water, and crushed pistachios.',
    ingredients: 'Basmati rice, milk, saffron, rose water, sugar, pistachios, almonds',
    calories: 450,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 1500,
    allergens: ['Dairy', 'Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Saffron+Rose+Rice+Pudding'
  },
  {
    id: 'd4',
    name: 'Chocolate Date Fondant',
    description: 'A rich, molten chocolate lava cake infused with Medjool dates and served with vanilla bean ice cream.',
    ingredients: 'Dark chocolate, butter, eggs, flour, Medjool dates, sugar, cocoa powder',
    calories: 700,
    dietaryInfo: ['Halal'],
    price: 2200,
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    image: 'https://via.placeholder.com/400x300?text=Chocolate+Date+Fondant'
  },
  {
    id: 'd5',
    name: 'Pistachio & Honey Basbousa',
    description: 'A moist semolina cake soaked in orange blossom syrup and topped with crushed pistachios.',
    ingredients: 'Semolina, yogurt, honey, orange blossom water, butter, pistachios',
    calories: 580,
    dietaryInfo: ['Halal'],
    price: 1700,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Pistachio+Honey+Basbousa'
  },
  {
    id: 'd6',
    name: 'Rose Petal Mahalabia',
    description: 'A silky Lebanese milk pudding infused with rose essence, topped with caramelized nuts and edible rose petals.',
    ingredients: 'Milk, cornstarch, sugar, rose water, almonds, pistachios, rose petals',
    calories: 390,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 1600,
    allergens: ['Dairy', 'Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Rose+Petal+Mahalabia'
  },
  ],
  Beverages: [
    {
    id: 'b1',
    name: 'Arabic Cardamom Coffee',
    description: 'A traditional Middle Eastern coffee brewed with cardamom for an aromatic and bold flavour.',
    ingredients: 'Arabic coffee beans, water, ground cardamom',
    calories: 5,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 500,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Arabic+Coffee'
  },
  {
    id: 'b2',
    name: 'Chilled Almond Milk',
    description: 'A refreshing and creamy nut-based drink, lightly sweetened.',
    ingredients: 'Almonds, water, honey (optional), vanilla extract',
    calories: 90,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 600,
    allergens: ['Nuts'],
    image: 'https://via.placeholder.com/400x300?text=Chilled+Almond+Milk'
  },
  {
    id: 'b3',
    name: 'Espresso Shot',
    description: 'A rich and intense single-shot espresso, perfect for a quick caffeine boost.',
    ingredients: 'Freshly ground espresso beans, water',
    calories: 2,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 450,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Espresso+Shot'
  },
  {
    id: 'b4',
    name: 'Toasted Sesame Biscuits',
    description: 'Crispy, nutty biscuits infused with sesame and lightly sweetened, served as a side with tea or coffee.',
    ingredients: 'Flour, sesame seeds, butter, sugar, eggs',
    calories: 150,
    dietaryInfo: ['Halal'],
    price: 300,
    allergens: ['Gluten', 'Sesame', 'Eggs', 'Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Toasted+Sesame+Biscuits'
  },
  {
    id: 'b5',
    name: 'Cardamom-Infused Arabic Tea',
    description: 'A soothing black tea delicately infused with cardamom.',
    ingredients: 'Black tea leaves, cardamom, water, sugar (optional)',
    calories: 5,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 400,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Cardamom+Arabic+Tea'
  },
  {
    id: 'b6',
    name: 'Turkish Coffee',
    description: 'Strong and aromatic coffee with a thick layer of foam, traditionally brewed in a cezve.',
    ingredients: 'Finely ground Turkish coffee, water, sugar (optional)',
    calories: 10,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 550,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Turkish+Coffee'
  },
  {
    id: 'b7',
    name: 'Ayran (Turkish Yogurt Drink)',
    description: 'A salty and tangy yogurt-based beverage, perfect for cooling down.',
    ingredients: 'Yogurt, water, salt',
    calories: 110,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 500,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Ayran'
  },
  {
    id: 'b8',
    name: 'Chilled Doogh (Persian Yogurt Drink)',
    description: 'A savoury and slightly carbonated yogurt-based drink with mint.',
    ingredients: 'Yogurt, water, mint, salt, sparkling water (optional)',
    calories: 90,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 550,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Chilled+Doogh'
  },
  {
    id: 'b9',
    name: 'Rose Water Lemonade',
    description: 'A fragrant and refreshing lemonade infused with rose water.',
    ingredients: 'Fresh lemon juice, water, rose water, sugar, ice',
    calories: 80,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 500,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Rose+Water+Lemonade'
  },
  {
    id: 'b10',
    name: 'Lassi (Sweet or Salted)',
    description: 'A creamy and refreshing yogurt-based drink, available in sweet or salted variations.',
    ingredients: 'Yogurt, water, sugar (for sweet) or salt (for salted)',
    calories: 150,
    dietaryInfo: ['Halal', 'Gluten-Free'],
    price: 500,
    allergens: ['Dairy'],
    image: 'https://via.placeholder.com/400x300?text=Lassi'
  },
  {
    id: 'b11',
    name: 'Moroccan Mint Tea',
    description: 'A fragrant and refreshing green tea infused with fresh mint leaves.',
    ingredients: 'Green tea leaves, fresh mint, sugar (optional), water',
    calories: 10,
    dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
    price: 450,
    allergens: [],
    image: 'https://via.placeholder.com/400x300?text=Moroccan+Mint+Tea'
  }
  ],
    AddOns: [
    {
      id: 'a1',
      name: 'Tandoori Naan',
      description: 'A traditional, soft, and fluffy naan baked in a tandoor, perfect for pairing with curries and grilled meats.',
      ingredients: 'Flour, water, yeast, salt, yogurt',
      calories: 270,
      dietaryInfo: ['Halal', 'Not Gluten-Free'],
      price: 350,
      allergens: ['Gluten', 'Dairy'],
      image: 'https://via.placeholder.com/400x300?text=Tandoori+Naan'
    },
    {
      id: 'a2',
      name: 'Whole Wheat Roti',
      description: 'A light and healthy whole wheat flatbread, cooked on a traditional flat griddle.',
      ingredients: 'Whole wheat flour, water, salt',
      calories: 140,
      dietaryInfo: ['Halal', 'Vegan', 'Not Gluten-Free'],
      price: 250,
      allergens: ['Gluten'],
      image: 'https://via.placeholder.com/400x300?text=Whole+Wheat+Roti'
    },
    {
      id: 'a3',
      name: 'Freshly Baked Pita',
      description: 'Soft and airy Middle Eastern bread, perfect for dipping or wrapping grilled meats.',
      ingredients: 'Flour, water, yeast, salt, olive oil',
      calories: 165,
      dietaryInfo: ['Halal', 'Not Gluten-Free'],
      price: 400,
      allergens: ['Gluten'],
      image: 'https://via.placeholder.com/400x300?text=Freshly+Baked+Pita'
    },
    {
      id: 'a4',
      name: 'Garlic Butter Naan',
      description: 'A rich and flavourful naan brushed with garlic-infused butter.',
      ingredients: 'Flour, water, yeast, salt, butter, garlic',
      calories: 320,
      dietaryInfo: ['Halal', 'Not Gluten-Free'],
      price: 450,
      allergens: ['Gluten', 'Dairy'],
      image: 'https://via.placeholder.com/400x300?text=Garlic+Butter+Naan'
    },
    {
      id: 'a5',
      name: 'Zaatar Manakish',
      description: 'A Levantine-style flatbread topped with a fragrant blend of zaatar (wild thyme, sesame, and sumac).',
      ingredients: 'Flour, water, yeast, salt, zaatar spice mix, olive oil',
      calories: 290,
      dietaryInfo: ['Halal', 'Vegan', 'Not Gluten-Free'],
      price: 500,
      allergens: ['Gluten', 'Sesame Seeds'],
      image: 'https://via.placeholder.com/400x300?text=Zaatar+Manakish'
    },
    {
      id: 'a6',
      name: 'Cheese-Stuffed Kulcha',
      description: 'A soft and pillowy stuffed naan filled with spiced melted cheese.',
      ingredients: 'Flour, water, yeast, salt, yogurt, cheddar cheese, green chilies',
      calories: 370,
      dietaryInfo: ['Halal', 'Not Gluten-Free'],
      price: 600,
      allergens: ['Gluten', 'Dairy'],
      image: 'https://via.placeholder.com/400x300?text=Cheese+Stuffed+Kulcha'
    },
    {
      id: 'a7',
      name: 'Lemon Butter Sauce',
      description: 'A rich and tangy butter-based sauce with a hint of lemon.',
      ingredients: 'Butter, lemon juice, garlic, black pepper, salt',
      calories: 150,
      dietaryInfo: ['Halal', 'Not Vegan', 'Gluten-Free'],
      price: 350,
      allergens: ['Dairy'],
      image: 'https://via.placeholder.com/400x300?text=Lemon+Butter+Sauce'
    },
    {
      id: 'a8',
      name: 'Grilled Halloumi',
      description: 'Slices of salty, chewy halloumi cheese grilled to perfection, served as a side with drinks.',
      ingredients: 'Halloumi cheese, olive oil',
      calories: 320,
      dietaryInfo: ['Halal', 'Not Vegan', 'Gluten-Free'],
      price: 700,
      allergens: ['Dairy'],
      image: 'https://via.placeholder.com/400x300?text=Grilled+Halloumi'
    },
    {
      id: 'a9',
      name: 'Pomegranate Molasses Dressing',
      description: 'A sweet and tangy dressing with a deep, rich pomegranate flavour.',
      ingredients: 'Pomegranate molasses, olive oil, salt, pepper, lemon juice',
      calories: 100,
      dietaryInfo: ['Halal', 'Vegan', 'Gluten-Free'],
      price: 400,
      allergens: [],
      image: 'https://via.placeholder.com/400x300?text=Pomegranate+Molasses+Dressing'
    }
  ]
  
}

export default function Menu() {
  const categories = Object.keys(MENU);
  const [active, setActive] = useState(categories[0]);
  const [order, setOrder] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleAdd(item) {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((o) => o.id === item.id);
      if (existingItem) {
        return prevOrder.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  }

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full z-50"
        style={{ zIndex: 100 }}
      >
        Cart ({order.reduce((count, item) => count + item.quantity, 0)})
      </button>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 overflow-y-auto z-60 rounded-l-lg border-l-4 border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Order</h2>
            {order.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {order.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-medium">{item.name} ({item.quantity}x)</span>
                    <span className="text-gray-900 font-semibold">PKR {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold text-gray-900">Total: PKR {calculateTotal()}</h3>
            </div>
            <button
              className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setIsCartOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-6 flex-1">
        <h1 className="text-3xl font-display font-bold mb-6">Our Menu</h1>

        <div className="mb-6">
          <nav className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${active === cat ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MENU[active].map((it) => (
            <MenuCard key={it.id} {...it} showAddButton onAdd={() => handleAdd(it)} />
          ))}
        </div>
      </main>
    </div>
  );
}

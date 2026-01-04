import React, { useState, useEffect } from "react";
import location3NorthNazimabad from "../assets/images/location3NorthNazimabad.png";
import location2BoatBasin from "../assets/images/location2BoatBasin.png";
import location1Highway from "../assets/images/location1Highway.png";
import location4TipuSultan from "../assets/images/Location4TipuSultan.png";

export default function Hero() {
  const images = [
    location2BoatBasin,
    location1Highway,
    location4TipuSultan,
    location3NorthNazimabad,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="relative w-full h-screen flex items-center">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/24 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Fresh flavors, unforgettable moments
        </h1>
        <p className="mt-4 text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
          Savor seasonal dishes crafted with local ingredients — reserve a table
          or explore our menu.
        </p>

        <div className="mt-8">
          <p className="text-sm text-white/80">
            Use the navigation above to view the menu or contact our assistant.
          </p>
        </div>
      </div>
    </header>
  );
}

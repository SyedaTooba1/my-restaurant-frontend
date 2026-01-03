import React from "react";
import Navbar from "../components/Navbar";
import ChefCard from "../components/ChefCard";
import Reveal from "../components/Reveal";
import chef1 from "../assets/Images/chef1.png";
import chef2 from "../assets/Images/chef2.png";
import chef3 from "../assets/Images/chef3.png";

const CHEFS = [
  {
    id: "c1",
    name: "Zubair Ahmed",
    role: "Executive Head Chef",
    bio: "A master of authentic Mughlai and Fusion cuisine, bringing 15 years of experience from Karachi's finest kitchens.",
    image: chef1,
  },
  {
    id: "c2",
    name: "Sana Mansoor",
    role: "Lead Pastry Chef",
    bio: "Specializes in artisanal desserts that blend traditional mithai flavors with modern French pastry techniques.",
    image: chef2,
  },
  {
    id: "c3",
    name: "Bilal Khan",
    role: "Sous Chef",
    bio: "The grill master behind our signature BBQ dishes, dedicated to perfecting the balance of spices and traditional coal-fire cooking.",
    image: chef3,
  },
];

const TIMELINE = [
  { year: "2010", text: "Our founders opened the first neighborhood bistro." },
  {
    year: "2014",
    text: "Expanded to a full-service restaurant with an open kitchen.",
  },
  { year: "2019", text: "Received local “Best New Restaurant” award." },
  {
    year: "2023",
    text: "Launched community cooking classes and seasonal tasting menus.",
  },
];

// New Service Timings Data
const SERVICE_TIMINGS = [
  {
    type: "Dine-In",
    weekday: "1:00 PM – 11:00 PM",
    weekend: "1:00 PM – 12:30 AM",
  },
  {
    type: "Takeaway",
    weekday: "1:00 PM – 11:15 PM",
    weekend: "1:00 PM – 12:45 AM",
  },
  {
    type: "Delivery",
    weekday: "1:00 PM – 11:30 PM",
    weekend: "1:00 PM – 1:00 AM",
  },
];

const LOCATIONS = [
  {
    name: "Highway",
    desc: "A scenic escape for long-drive lovers and food enthusiasts.",
  },
  {
    name: "Boat Basin",
    desc: "Buzzing with energy, perfect for late-night foodie runs.",
  },
  { name: "Tariq Road", desc: "A central hub where shopping meets flavor." },
  {
    name: "North Nazimabad",
    desc: "A trendy spot bringing flavors to the foodies of the north.",
  },
  {
    name: "Tipu Sultan Road",
    desc: "Modern vibes in a premium location with easy access.",
  },
];
export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold">About Us</h1>
          <p className="mt-2 text-gray-600">
            Welcome to **Feast Mode**, a vibrant dining destination in Karachi
            where flavor takes the spotlight and every meal feels like a
            celebration. We offer a rich variety of flavors, blending
            traditional and modern tastes to satisfy every craving. Whether
            you're with family, friends, or flying solo, our cozy ambiance,
            welcoming service, and diverse menu promise a memorable experience.
            From hearty meals to sweet treats, everything is crafted with
            quality and care. Step into **Feast Mode** — where great food and
            good vibes come together for a feast you won’t forget.
          </p>
        </header>
        <section className="mb-10 bg-amber-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-amber-900 text-center">
            Service Timings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_TIMINGS.map((service) => (
              <div
                key={service.type}
                className="bg-white p-5 rounded-xl shadow-sm border border-amber-100"
              >
                <h3 className="text-xl font-bold text-amber-700 mb-3 border-b pb-2">
                  {service.type}
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">
                      Mon - Thu
                    </p>
                    <p className="text-gray-800 font-medium">
                      {service.weekday}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">
                      Fri - Sun
                    </p>
                    <p className="text-gray-800 font-medium">
                      {service.weekend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <Reveal key={loc.name}>
                <div className="p-5 border border-gray-100 rounded-xl bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Simple Map Pin Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 className="font-bold text-lg text-gray-800">
                      {loc.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {loc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>



        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CHEFS.map((c) => (
              <ChefCard key={c.id} {...c} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Timeline & Fun Facts</h2>
          <div className="space-y-4">
            {TIMELINE.map((t) => (
              <Reveal key={t.year}>
                <div className="flex items-start gap-4">
                  <div className="w-20 text-amber-600 font-medium">
                    {t.year}
                  </div>
                  <div className="text-gray-700">{t.text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

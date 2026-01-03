# My Restaurant Website

Welcome to the My Restaurant Website project! This is a modern and responsive web application designed to showcase a restaurant's menu, provide an elegant user interface, and allow customers to interact with the menu dynamically.

## Features

- **Dynamic Menu**: Browse through categories like Starters, Main Course, Desserts, Beverages, and Add-Ons.
- **Cart System**: Add items to the cart, view the total price, and adjust quantities dynamically.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Elegant UI**: Modern design with smooth transitions and user-friendly navigation.
- **Voice Assistant**: (Optional) Integrate voice commands for a hands-free experience.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js (ensure it's up-to-date by running `npm install -g npm`)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd my-restuarant
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

- **src/**: Contains all the source code for the application.
  - **components/**: Reusable React components (e.g., Navbar, MenuCard, etc.).
  - **pages/**: Page-level components (e.g., Home, Menu, About, etc.).
  - **assets/**: Images and other static assets.
- **public/**: Static files served directly (e.g., favicon, robots.txt).
- **index.html**: The main HTML file.
- **tailwind.config.cjs**: Tailwind CSS configuration.
- **vite.config.js**: Vite configuration file.

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build locally.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast development build tool.
- **Tailwind CSS**: Utility-first CSS framework.

## Customization

Feel free to modify the project to suit your needs. You can:

- Add more menu items in the `MENU` object in `src/pages/Menu.jsx`.
- Customize the styles in `src/index.css` or Tailwind configuration.
- Add new components or pages as needed.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it as per the license terms.

---

Enjoy building and customizing your restaurant website!

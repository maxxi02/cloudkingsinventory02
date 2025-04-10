/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', // Adjust this path based on where your components are located
    './pages/**/*.{js,jsx,ts,tsx}', // Include this if you have a pages directory
    './components/**/*.{js,jsx,ts,tsx}', // Include this if you have a components directory
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};

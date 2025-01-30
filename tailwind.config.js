const withMT = require("@material-tailwind/html/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust the paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#04152D',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

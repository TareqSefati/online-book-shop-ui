/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        // Adding new fonts from google font
        fontFamily: {
            poppins: "'Poppins', sans-serif",
            edu: "'Edu AU VIC WA NT Dots', cursive",
        }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


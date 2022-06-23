/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        purple: colors.purple,
      },
    },
  },
  plugins: [],
}

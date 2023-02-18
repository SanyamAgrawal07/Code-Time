/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'nun': ['Nunito Sans', 'sans-serif'],
      'mont':['Montserrat', 'sans-serif']
    },
    colors: {
      'dark-main': '#1D1D1D',
      'green-theme': '#92D971',
      'normal': '#C9C9C9',
      'heading': '#EAEAEA',
      'lines': '#F4F4F4',
      'white': '#FFFFFF',
      'red': '#AD0606',
      'blue': '#295782',
      'light-green': '#bef264'
    }
  },
  plugins: [],
}
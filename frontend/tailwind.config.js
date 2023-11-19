/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans1:["Dm Sans", "san-serif"],
        sans2:["rubik", "san-serif"],
        mono:["Darker Grotesque", "san-serif"],
      }
    },
  },
  plugins: [],
}


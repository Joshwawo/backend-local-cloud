/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'semiNegro': 'rgb(33,53,71)',
        'semiBlanco': 'rgba(255, 255, 255, 0.87)',
        'Dcardblack': 'rgba(60, 60, 60, 0.7)',
        'Dcardwhite': 'rgba(235, 235, 235, 0.6)',
        "negro": "#1e1e20",
        "seminegro": "#2D2D32"
      }
    },
  },
  plugins: [],
}

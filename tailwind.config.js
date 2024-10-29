/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lobster: ['Lobster', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-color': '#9333ea',
        'secondary-color': '#c084fc',
        'hover-color': '#7e22ce',
      },
    },
  },
  plugins: [],
}


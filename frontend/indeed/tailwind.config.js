/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': '870px',
      'laptop': '900px',
      'desktop': '1024px',
    },
    extend: {},
  },
  plugins: [],
}


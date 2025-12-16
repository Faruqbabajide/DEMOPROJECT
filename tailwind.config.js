/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- ENSURE THIS LINE IS HERE
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
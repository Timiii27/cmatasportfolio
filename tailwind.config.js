/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8f8f8',
        text: '#1a1a1a',
        subtle: '#888888',
        accent: '#d4af37', // Gold remains as an elegant accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'huge': '12vw',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A2E45', // un tono oscuro que sugiere elegancia
        secondary: '#A491D3', // tono suave lavanda
        accent: '#E3D7FF', // un tono claro y sutil
        light: '#F2F1F6', // color base claro para un fondo limpio
        dark: '#1C1B29', // tono profundo y sofisticado
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}


import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        dark: {
          bg: '#181818',
          card: '#f5f5f5',
        },
        light: {
          bg: '#ffffff',
          card: '#f0f0f0',
        },
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
      },
      spacing: {
        'page-x': '80px',
        'page-x-lg': '120px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config

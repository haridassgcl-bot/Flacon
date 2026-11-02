/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          sidebar: '#0c161d',
          accent: '#6ea4bf'
        },
        flacon: {
          50: '#f0f7fa',
          100: '#dbeef5',
          500: '#6ea4bf',
          600: '#558ba6',
          700: '#3f738d',
          800: '#2b5870',
          900: '#1a3e52'
        },
        emerald: {
          50: '#f0f7fa',
          100: '#dbeef5',
          200: '#bce0ee',
          300: '#9acde3',
          400: '#7ebad6',
          500: '#6ea4bf',
          600: '#558ba6',
          700: '#3f738d',
          800: '#2b5870',
          900: '#1a3e52',
          950: '#0c222e'
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#24292e',
          gray: '#586069',
          'gray-light': '#f6f8fa',
          'border-gray': '#e1e4e8',
          blue: '#0366d6',
          green: '#2ea44f',
          'green-hover': '#2c974b',
          red: '#cf222e',
        }
      },
      boxShadow: {
        'github': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'github-lg': '0 8px 25px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
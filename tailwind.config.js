/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'off-black': '#050505', // Un negro ligeramente menos duro para pantallas OLED
        'subtle': '#333333',
      }
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        caveats: ['Caveat', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // customLogo: '#910A67',
        customLogo: '#9f0f71',
      },
    },
  },
  plugins: [],
}


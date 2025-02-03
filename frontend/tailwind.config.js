/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "serif"]
      },
      backgroundColor: {
        "bg-primary": "var(--primary)"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
      },
      animation: {
        'dialog-show': 'dialog-show 0.2s cubic-bezier(.16, 1, .3, 1)',
        'dialog-hide': 'dialog-hide 0.1s cubic-bezier(.16, 1, .3, 1)',
      },

      fontFamily: {
        "poppins": ["Poppins", "serif"]
      },
      // backgroundColor: {
      //   "bg-primary": "var(--primary)"
      // }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}


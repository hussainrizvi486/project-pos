/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'dialog-show': {
          '0%': { opacity: '0', transform: 'translateY(5px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'dialog-hide': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(5px) scale(0.99)' },
        },
      },
      animation: {
        'dialog-show': 'dialog-show 0.2s cubic-bezier(.16, 1, .3, 1)',
        'dialog-hide': 'dialog-hide 0.1s cubic-bezier(.16, 1, .3, 1)',
      },

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


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--primary-dark)',
        'pearl-white': 'var(--pearl-white)',
        'cta-color': 'var(--cta-color)',
        'primary-color': 'var(--primary-color)',
        'bg-color': 'var(--bg-color)',
        'text-color': 'var(--text-color)',
        'champagne': 'var(--champagne)',
        'warm-gray': 'var(--warm-gray)'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

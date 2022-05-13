module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1536px" },
        // => @media (max-width: 1536px) { ... }

        'xl': { max: "1280px" },
        // => @media (max-width: 1280px) { ... }

        'lg': { max: "1024px" },
        // => @media (max-width: 1024px) { ... }

        'md': { max: "768px" },
        // => @media (max-width: 768px) { ... }

        'sm': { max: "640px" },
      },
      colors:{
        'off-purple-gray' : '#eee9f5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

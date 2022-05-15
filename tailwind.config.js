module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
        'base-purple': '#eee9f5',
        'off-purple-gray' : '#eee9f5',
        'dark-slate-gray': 'rgb(55 65 81)',
        'transparent-black': 'rgba(0,0,0,.662)',
        'light-gray1':'#d0d0d0'
      }
    },
  },
  plugins: [],
}

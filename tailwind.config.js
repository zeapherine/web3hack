module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif']
      },
      colors: {
        blue: {
          light: '#0079d3',
        },
        black: {
          dark: '#222',
          light: '#41415A',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

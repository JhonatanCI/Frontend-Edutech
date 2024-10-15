module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          DEFAULT: '#166FF5', 
          dark: '#1259C4' ,
        },
        secondaryTeal: {
          DEFAULT: '#06DDB1', 
        },
        black: {
          DEFAULT: '#080808', 
        },
        offsetBlack: {
          DEFAULT: '#1E1E1E', 
          light: '#343434',
        },
        white: {
          DEFAULT: '#FFFFFF', 
        },
        gray: {
          DEFAULT: '#D8D8D8', 
        },
        lightGray: {
          DEFAULT: '#F5F5F5', 
        },
        textGray: {
          DEFAULT: '#A7A5A5', 
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
        calsans: ['calsans', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          DEFAULT: '#865CF0',
          dark: '#6d4bc1',
        },
        secondaryBlue: {
          DEFAULT: "#5454E9"
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scroll-invisible': {
          /* Oculta el scroll en navegadores WebKit */
          '-webkit-scrollbar': 'none',
          /* Internet Explorer 10+ */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
        },
        '.no-scroll': {
          overflow: 'hidden',
          height: '100vh',
        },
        '.modal-scrollable': {
          'max-height': '90vh', /* Limita la altura máxima del modal */
          'overflow-y': 'auto', /* Habilita scroll interno */
        },
        '.scrollbar-blue': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#865CF0', // Azul
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0', // Gris
          },
        },
      });
    },
  ],
};
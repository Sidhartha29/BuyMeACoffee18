/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFEF0',
          100: '#FFFCE0',
          200: '#FFF9C2',
          300: '#FFF59D',
          400: '#FFF176',
          500: '#FFDD00',
          600: '#E6C700',
          700: '#CCB000',
          800: '#B39900',
          900: '#998200',
        },
        secondary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      }
    },
  },
  plugins: [],
};

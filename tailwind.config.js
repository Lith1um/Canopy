const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(',')}`
      },
      screens: {
        'xs': '480px'
      },
      borderWidth: {
        DEFAULT: '1px'
      },
      default: {
        primary: {
          ...colors.sky,
          DEFAULT: colors.sky[600]
        },
        accent: {
          ...colors.slate,
          DEFAULT: colors.slate[800]
        },
        warn: {
          ...colors.red,
          DEFAULT: colors.red[600]
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require(path.resolve(__dirname, ('src/app/tailwind/plugins/icon-size'))),
  ],
}

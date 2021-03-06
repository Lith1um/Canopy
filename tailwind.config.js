const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(',')}`
      },
      typography(theme) {
        return {
          DEFAULT: { // this is for prose class
            css: {
              pre: {
                backgroundColor: theme("colors.slate.800"),
                padding: '16px 24px !important',
                margin: '24px 0 !important',
                lineHeight: '24px !important'
              }
            }
          },
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          }
        };
      },
      borderWidth: {
        DEFAULT: '1px'
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(0, 1fr))'
      },
      default: {
        primary: {
          ...colors.violet,
          DEFAULT: colors.violet[600]
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
        'spin-slow': 'spin 4s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require(path.resolve(__dirname, ('src/app/tailwind/icon-size'))),
  ],
}

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['src/**/*.vue'],
  theme: {
    fontFamily: {
      display: ['Kondolar Thai', ...defaultTheme.fontFamily.serif],
      body: ['Anuphan', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      '14': ['14px', '16.8px'],
      '16': ['16px', '19.2px'],
      '18': ['18px', '21.6px'],
      '24': ['24px', '28.8px'],
      '28': ['28px', '33.6px'],
      '32': ['32px', '38.4px'],
      '48': ['48px', '57.6px']
    },
    colors: {
      white: '#FFFFFF',
      gray: '#ECECEC',
      darkgray: '#D4D4D4',
      black: '#000000',
      green: '#42FF99',
      red: '#FE6969'
    }
  },
  variants: {},
  plugins: []
};

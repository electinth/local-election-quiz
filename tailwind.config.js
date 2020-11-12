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
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '24': '24px',
      '28': '28px',
      '32': '32px',
      '48': '48px'
    },
    colors: {
      white: '#FFFFFF',
      gray: '#ECECEC',
      black: '#000000',
      green: '#42FF99',
      red: '#FE6969'
    }
  },
  variants: {},
  plugins: []
};

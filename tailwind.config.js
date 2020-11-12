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
    }
  },
  variants: {},
  plugins: []
};

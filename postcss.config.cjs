const path = require('node:path')

module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/styles/media.postcss'],
    },
    'postcss-custom-media': {},
    'postcss-mixins': {
      mixinsFiles: [path.resolve(__dirname, './src/styles/mixins.pcss')],
    },
    'postcss-nested': {},
    autoprefixer: {},
  },
};
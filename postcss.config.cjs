module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/styles/media.postcss'],
    },
    'postcss-custom-media': {},
    'postcss-mixins': {
      import: './src/styles/mixins.postcss',
    },
    'postcss-nested': {},
    autoprefixer: {},
  },
};
const IN_PRODUCTION = process.env.NODE_ENV === 'production'; // eslint-disable-line

module.exports = {
  plugins: [
    require('autoprefixer'), // eslint-disable-line
  ],
};

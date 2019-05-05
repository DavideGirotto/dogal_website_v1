var path = require('path');

module.exports = {
  mode: 'production',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, './src/assets/javascripts')]
      }
    ]
  }
};
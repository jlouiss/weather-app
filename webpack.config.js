const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './js/weather.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
        exclude: [/node_modules/],
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin()
  ]
};

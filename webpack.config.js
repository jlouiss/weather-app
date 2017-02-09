const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
        // use: ExtractTextPlugin.extract({
        //   use: ['css-loader', 'sass-loader']
        // })
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  // plugins: [
  //   new ExtractTextPlugin('./styles.css')
  // ]
}

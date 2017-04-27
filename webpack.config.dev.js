var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // fetch polyfill
    'whatwg-fetch',
    // your code:
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader',
          options: {
            module: true,
            camelCase: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader'
        }]
      }
    ]
  }
};

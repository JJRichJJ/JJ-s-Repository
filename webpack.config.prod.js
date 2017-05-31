var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: [
    'babel-polyfill',
    // fetch polyfill
    'whatwg-fetch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      { test: /\.woff(\?.*)?$/,  loader: 'url-loader' },
      { test: /\.woff2(\?.*)?$/, loader: 'url-loader' },
      { test: /\.otf(\?.*)?$/,   loader: 'file-loader' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url-loader' },
      { test: /\.eot(\?.*)?$/,   loader: 'file-loader' },
      { test: /\.svg(\?.*)?$/,   loader: 'url-loader' },
      { test: /\.(png|jpg)$/,    loader: 'url-loader' },
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
            sourceMap: false
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

var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'OLA_ENV': JSON.stringify('staging')
      }
    })
  ],
  resolve: {
    alias: {
      'OlaSearch': '@olasearch/core'
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
  },
  externals: {
    moment: 'moment'
  },
  module: {
    rules: [{
      test: /\.js?/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [
        path.join(__dirname, './'),
        path.join(__dirname, './../src'),
        path.join(__dirname, './../olachat/src'),
        path.join(__dirname, './../../cxs/src'),
        path.join(__dirname, './../../styled-jsx/src')
      ],
    },
    {
      test: /(\.scss|\.css)$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [require('autoprefixer')]
        }
      }, 'sass-loader']
    }
    ]
  }
};

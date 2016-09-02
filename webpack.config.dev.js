var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'OLA_ENV': JSON.stringify('staging')
      }
    })
  ],
  resolve: {
    alias: {
      'olasearch': path.join(__dirname, './../npm-olasearch'),
      'olasearch-elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter'),
      'olasearch-solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter'),
      'olasearch-logger-middleware': path.join(__dirname, './../olasearch-logger-middleware'),
      'react': path.join(__dirname, './node_modules/react')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  resolveLoader: {
      fallback: path.resolve(__dirname, './node_modules')
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};

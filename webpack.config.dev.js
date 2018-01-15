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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'OLA_ENV': JSON.stringify('staging')
      }
    })
  ],
  resolve: {
    alias: {
      'OlaSearch': path.join(__dirname, './../npm-olasearch'),
      '@olasearch/core': path.join(__dirname, './../npm-olasearch'),
      '@olasearch/chat': path.resolve(__dirname, './../olachat/src'),
      '@olasearch/icons': path.resolve(__dirname, './../ola-icons'),
      '@olasearch/elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter'),
      '@olasearch/solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter'),
      '@olasearch/logger': path.join(__dirname, './../olasearch-logger-middleware'),
      'react': path.join(__dirname, './node_modules/react'),
      'React': path.join(__dirname, './node_modules/react'),
      'react-dom': path.join(__dirname, './node_modules/react-dom'),
      'react-line-progress': path.join(__dirname, './../react-line-progress'),
      'olasearchconfig': path.join(__dirname, './src/config')
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
    // fallback: path.resolve(__dirname, './node_modules')
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
        path.join(__dirname, './../olachat/src')
      ],
    },
    {
      test: /(\.scss|\.css)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
    ]
  }
};

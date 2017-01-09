var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.config.min.js'
  },
  plugins: [
    new ExtractTextPlugin('./assets/styles/ola.core.min.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'OLA_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin("Copyright Ola Search Pte Ltd 2016", { raw: false, entryOnly: true })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
      { test: require.resolve("react"), loader: "expose?React" },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
      }
    ]
  },
  resolve: {
    alias: {
      'olasearch': path.join(__dirname, './../npm-olasearch'),
      'olasearch-solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter'),
      'olasearch-logger-middleware': path.join(__dirname, './../olasearch-logger-middleware'),
      'react-line-progress': path.join(__dirname, './../react-line-progress')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "olasearch": "OlaSearch",
    "redux": "Redux",
    "react-redux": "ReactRedux",
    'olasearchconfig': 'OlaSearchConfig'
  }
};

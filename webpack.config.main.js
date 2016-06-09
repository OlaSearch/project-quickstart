var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'core/olasearch'),
    filename: 'olasearch.min.js',
    library: 'OlaSearch',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
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
  resolve: {
    alias: {
      'olasearch': path.join(__dirname, './../npm-olasearch'),
      // 'olasearch-elasticsearch-adapter': path.join(__dirname, './../npm-olasearch-elasticsearch-adapter')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
      { test: require.resolve("react"), loader: "expose?React" },
      { test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
      // { test: /ramda/, loader: "expose?R" },
      { test: require.resolve("redux"), loader: "expose?Redux" },
      { test: require.resolve("react-redux"), loader: "expose?ReactRedux" }
    ]
  },
  resolveLoader: {
      fallback: path.resolve(__dirname, './node_modules')
  }
}

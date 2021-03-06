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
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ],
  resolve: {
    alias: {
      'OlaSearch': '@olasearch/core',
      'olasearchconfig': path.join(__dirname, './src/olasearch.config'),
      '@olasearch/solr-adapter': path.join(__dirname, './../npm-olasearch-solr-adapter'),
      // '@olasearch/core': path.join(__dirname, './../npm-olasearch'),
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
        path.join(__dirname, 'src')
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

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'olasearch.init.min.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'olasearch.core.min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'OLA_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.BannerPlugin({ banner: "Copyright Ola Search Pte Ltd.", raw: false, entryOnly: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js?/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, './../olachat/src'),
        path.join(__dirname, './../../styled-jsx/src')
      ],
    },
    {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }, 'sass-loader']
      })
    }
    ]
  },
  resolve: {
    alias: {
      'OlaSearch': '@olasearch/core'
    },
    modules: [
      'node_modules', path.resolve(__dirname, './node_modules')
    ]
  },
  externals: {    
    // "react": "React",
    // "react-dom": "ReactDOM",    
    // "redux": "Redux",
    // "react-redux": "ReactRedux",
    // "@olasearch/core": "OlaSearch",
    // 'olasearchconfig': 'OlaSearchConfig'
  }
}

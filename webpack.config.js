const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

// 
const sourceMap = process.env.NODE_ENV === 'development'
  ? 'inline-source-map'
  : 'source-map'

module.exports = {
  entry: {
    vender: ['react', 'react-dom', 'react-router-dom', 'firebase', 'prop-types'],
    app: './src/index.jsx',
  },

  output: {
    filename: '[name]-[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },

  devtool: sourceMap,

  devServer: {
    contentBase: './public',
    publicPath: '/',
    port: 3000,
    inline: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.jsx', '.js']
  },

  module: {
    rules: [
      // Compile JSX and JS to es5 React
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                'targets': {
                  'browsers': ['> 1%', 'last 2 versions'],
                },
              }],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      // Load pug files
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      // Load CSS Styles
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
        }),
      },
    ],
  },

  plugins: [
    // Chunk listed vendor files
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // Chunk the webpack module scafolding
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // Generate index.html file from the pug template
    new HtmlWebpackPlugin({
      title: 'moolahlah',
      reactRoot: 'root',
      author: 'Matthew Greenberg',
      template: './src/template/index.pug',
    }),
    // Don't bundle CSS Into Webpack, use a seperate file
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
  ],

} // end of module.exports

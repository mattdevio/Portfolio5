const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// 
const sourceMap = process.env.NODE_ENV === 'development'
  ? 'inline-source-map'
  : 'source-map'

module.exports = {
  entry: {
    vender: ['react', 'react-dom', 'react-router-dom'],
    app: './src/index.jsx',
  },

  output: {
    filename: '[name]-[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  devtool: sourceMap,

  devServer: {
    contentBase: './public',
    publicPath: '/',
    port: 3000,
    inline: true,
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
    ],
  },

  plugins: [
    // Chunk listed vendor files
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
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
  ],

} // end of module.exports

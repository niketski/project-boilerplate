const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
      main: ['@babel/polyfill', './src/index.js'], // main entry point
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.(scss|css|sass)$/,
            use: [
              MiniCssExtractPlugin.loader, 
              'css-loader', 
              'postcss-loader', 
              'sass-loader'
            ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf)/,
          use: ['url-loader']
        }
    ]
  },
  mode: 'development',
  plugins: [
      new MiniCssExtractPlugin({
          filename: './[name].css' // our main style /dist/styles/[name].css
      }),
      new HtmlWebpackPlugin({
        template: './index.html', // the html file that we are going to use
        inject: true // automatically injects all the files imported from the entry point './src/index.js'
    })
  ]
};
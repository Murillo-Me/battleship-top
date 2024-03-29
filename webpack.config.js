const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(s(a|c)ss)$/,
      //   use: [
      //     'style-loader', // Injects style into DOM
      //     'css-loader', // Turns CSS into JS
      //     'sass-loader', // Turns SCSS into CSS
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // Injects style into DOM
          'css-loader', // Turns CSS into JS
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   use: {
      //     // loader: 'url-loader',
      //     loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./assets/fonts/[name].[ext]',
      //   },
      // },

    ],
  },
};

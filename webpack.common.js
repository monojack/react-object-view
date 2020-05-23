const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Stylish = require('webpack-stylish')
const CopyPlugin = require('copy-webpack-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'docs/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'docs')],
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
        // use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      recoil: path.resolve(__dirname, 'node_modules/recoil'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin(),
    new CopyPlugin([path.resolve(__dirname, 'docs/reset.css')]),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   disable: process.env.NODE_ENV !== 'production',
    //   pngquant: {
    //     quality: '95-100',
    //   },
    // }),
    new Stylish(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
}

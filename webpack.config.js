const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: "./public/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "public"),
    watchContentBase: true
  },
  module: {
    rules: [{
      test: /\.less$/,
      include: [path.resolve(__dirname, "public/css")],
      use: extractLess.extract({
        use: [{
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html"),
      inject: true
    }),
    process.env.NODE_ENV === "development"
    ? false
    : new CopyPlugin([
      {
        from: path.resolve(__dirname, "public/img"),
        to: "img"
      },
      {
        from: path.resolve(__dirname, "public/favicon.png"),
        to: "favicon.png"
      }]),
    extractLess
  ]
}

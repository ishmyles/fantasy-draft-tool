const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "NBA Fantasy Draft tool",
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"],
  },
  mode: "development",
};

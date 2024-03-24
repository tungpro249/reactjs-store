const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx", // Dẫn tới file index.js ta đã tạo
  // output: {
  //   path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
  //   filename: "bundle.js", // Tên file được build ra
  // },
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"],
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules", path.resolve(__dirname, "..", "src")],
    // alias: {
    //     "": "../"
    // }
  },
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new BundleAnalyzerPlugin(),
  ],
};

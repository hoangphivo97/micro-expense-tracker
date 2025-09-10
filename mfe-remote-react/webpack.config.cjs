// webpack.config.cjs
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // ✅ entry dev
  devServer: {
    port: 5000,
    open: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, "public"),
    headers: { "Access-Control-Allow-Origin": "*" }, // ✅ để host khác (Angular) load được
  },
  output: { publicPath: "auto", clean: true },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.(ts|tsx|js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "reactRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./DarkModeToggle": "./src/components/DarkModeToggle", // ✅ expose component
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
  ],
};

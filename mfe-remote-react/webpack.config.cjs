// webpack.config.cjs
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // entry dev
  devServer: {
    port: 5000,
    open: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, "public"),
    headers: { "Access-Control-Allow-Origin": "*" }, // để host khác (Angular) load được
  },
  output: { publicPath: "auto", clean: true, module: false },
  resolve: { extensions: [".tsx", ".ts", ".js", ".css"] },
  module: {
    rules: [
      // Rule cho JS/TSX/JSX
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      // 1. RULE CHO CSS MODULES (*.module.css)
      {
        test: /\.module\.css$/,
        exclude: /node_modules/, 
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]"
              },
              importLoaders: 1,
            },
          }
        ],
      },
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

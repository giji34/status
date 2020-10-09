const webpack = require("webpack");
const TsConfigWebpackPlugin = require("ts-config-webpack-plugin");
const path = require("path");

const plugins = [
  new TsConfigWebpackPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: "[name].js.map",
  })
]

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "src/client/index.tsx")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/js/")
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    }
  }
};

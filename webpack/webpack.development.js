const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // Copy empty ServiceWorker so install doesn't blow up
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/sw.js",
          to: "sw.js",
        },
      ],
    }),
  ],
  devServer: {
    contentBase: __dirname + "/build",
    compress: true,
    port: 3300,
    open: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
    },
  },
  devtool: "source-map",
});

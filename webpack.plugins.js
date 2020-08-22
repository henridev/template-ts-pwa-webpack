const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProgressPlugin } = require("webpack");

const indexHtml = new HtmlWebpackPlugin({
  hash: true,
  filename: "index.html",
  minify: { collapseWhitespace: true, removeComments: true },
  template: __dirname + "/src/index.html",
});

const copyTobuild = new CopyWebpackPlugin({
  patterns: [
    {
      from: "src/assets",
      to: "assets",
    },
    {
      from: "src/manifest.webmanifest",
      to: "manifest.webmanifest",
    },
  ],
  options: {
    concurrency: 100,
  },
});

const pluginArray = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: true,
  }),
  new ProgressPlugin(),
  indexHtml,
  copyTobuild,
];

const extraHtml = [];

extraHtml.forEach((entryName) => {
  pluginArray.push(
    new HtmlWebpackPlugin({
      filename: entryName + ".html",
      template: __dirname + `/public/pages/{entryName}.html`,
    })
  );
});

module.exports = {
  pluginArray,
};

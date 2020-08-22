const path = require("path");
require("@babel/register");
require("dotenv").config();
const { merge } = require("webpack-merge");
const { pluginArray } = require("./webpack.plugins");

const modeConfig = (env) =>
  require(path.resolve(__dirname, "webpack", `webpack.${env.mode}.js`))(env);

const loadPresets = ({ presets = [], mode }) => {
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map((presetName) => {
    return require(`./webpack/presets/webpack.${presetName}`)({ presets, mode });
  });

  return merge({}, ...mergedConfigs);
};

module.exports = (env) =>
  merge(
    {
      mode: env.mode || "production",
      plugins: pluginArray,
      entry: ["@babel/polyfill", "./src/index.js"],
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
        ],
      },
      resolve: {
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
      },
    },
    modeConfig(env),
    loadPresets(env)
  );

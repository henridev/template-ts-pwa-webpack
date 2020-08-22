const path = require("path");
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
      entry: ["./src/index.ts"],
      // output: {
      //   filename: "[name].js",
      // },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
    },
    modeConfig(env),
    loadPresets(env)
  );

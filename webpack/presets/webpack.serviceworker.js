const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = (env) => ({
  plugins: [
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js",
    }),
  ],
});

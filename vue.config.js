const path = require("path");

module.exports = {
  publicPath: "/mario/dist",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve("./src"));
  },
};

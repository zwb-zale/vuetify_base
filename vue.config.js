module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  lintOnSave: true,

  // 接口api配置
  devServer: {
    proxy: {
      "/kong/": {
        target: "http://192.168.101.31:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/kong": ""
        }
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: []
    }
  }
};

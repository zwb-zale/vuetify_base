module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
  productionSourceMap:false,

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
  },
  chainWebpack: config => {
    // 查看打包文件体积大小
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
};

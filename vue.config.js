const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 1805,
    bonjour: true,

    // <editor-fold desc="允许内网穿透代理">
    historyApiFallback: true,
    allowedHosts: 'all',
    // </editor-fold>

    proxy: {
      [`^${process.env.VUE_APP_BASE_API}`]: {
        target: process.env.VUE_APP_BASE_SERVER,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: '',
        },

        // 控制台打印代理地址
        logLevel: 'debug',
      },
    },
  },
});

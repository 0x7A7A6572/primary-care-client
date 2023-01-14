const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "社区医疗";
        return args
      })
  },
  devServer: {
    proxy: {
      '/scoket.io': {
        target: 'http://localhost:6010',
        ws: true,
        // changeOrigin: true
      },
      // 'sockjs-node': {
      //   target: 'http://localhost:6010',
      //   ws: false,
      //   changeOrigin: true
      // },
    }

  }
})

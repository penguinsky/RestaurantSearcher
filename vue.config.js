module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://webservice.recruit.co.jp',
        pathRewrite: (p) => {
          return p.replace(/^\/api*/, '')
        },
      },
    },
  },
}

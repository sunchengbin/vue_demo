// 配置api地址：https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
const path = require('path')
module.exports = {
  // 修改output.path
  outputDir: 'dist',
  // 修改output.publishPath
  baseUrl: process.env.NODE_ENV !== 'development' ? '/vue_demo/dist/' : './',
  chainWebpack: config => {
    // 添加全局scss文件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      config.module.rule('scss').oneOf(type).use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, 'src/css/base.scss')
          ]
        })
    })
    // 添加svg-sprite-loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
  }
}

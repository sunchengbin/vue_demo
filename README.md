# vue_demo

## 开发环境

- [vuecli3](https://cli.vuejs.org/zh/)
- yarn

## 需要注意的问题

因为vue-cli3做了改进，把很多webpack服务封装到cli服务（开发环境依赖）中了。

所以需要修改webpack配置和环境变量切换等方面需要学习新写法。

## 搭建框架过程说明

### 1px解决方案
全局引入flexible.js (路径:src/libs/app/flexible.js)
并在mixin.scss中添加@mixin px2rem

### 样式模块的组件化拆分并全局引入base.scss
引入的方式需要关注下vue.config.js
```
const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
** 这里的types的选项，可以通过执行vue inspect > output.js，倒出output.js，然后查看output.js即可
types.forEach(type => {
  config.module.rule('scss').oneOf(type).use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/css/base.scss')
      ]
    })
})
```
### 添加svg组件
首先创建svg组件，然后配置对应的loader（svg-sprite-loader）。修改vue.config.js

```
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
```
### 项目构建后的静态文件publicPath的配置
修改vue.config.js，添加顶级属性baseUrl

```
baseUrl: process.env.NODE_ENV !== 'development' ? '/vue_demo/dist/' : './'
```

### HOST各环境兼容方案 (https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)
> 根据不同生产环境配置不同的接口域名，通过修改或者添加根目录下.env.[环境变量](例如: .env.stage)文件中的对应参数

### 接口集合(src/libs)
> 主要是把常用的：封装过的http接口、接口路径、常用的函数等进行拆分

## 项目目录


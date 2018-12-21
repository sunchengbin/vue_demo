import Vue from 'vue'
import App from './app.vue'
import Router from 'vue-router'
import store from './store'
import SvgIcon from '@/components/common/svg_icon/svg'
import lazyload from '@/components/common/lazy_load'
import Toast from '@/components/common/toast'
import Loading from '@/components/common/loading'
import MessageBox from '@/components/common/message_box'
import Footer from '@/components/app/footer/footer'
import Swiper from '@/components/common/swiper/index'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import FastClick from 'fastclick'
import RouterGuard from '@/router'
import Index from '@/views/index'
import {
  util
} from '@/libs/utils'
import '@/libs/app/flexible'
import InitDirective from '@/libs/directive'
import infiniteScroll from '@/components/common/infinite_scroll'
import Wx from '@/libs/app/weixin'

// 初始化全局指令
Vue.use(InitDirective)
Vue.use(Router)

// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false

// 微信api认证初始化
Wx.init()

// util.loadJS('http://api.map.baidu.com/api?v=2.0&ak=Ypej0AFVYlot04KR8lOvwglA8KBSoC4S')

// 添加fastclick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// sentry初始化，后台地址http://3try.ktvsky.com/sentry/
if (process.env.NODE_ENV === 'production') {
  Raven
    .config('http://103103df01d64286b6372e580fc26cf1@3try.ktvsky.com/16')
    .addPlugin(RavenVue, Vue).install()
}
// 插件
Vue.use(lazyload)
Vue.use(Router)
Vue.use(infiniteScroll)

// vue全局变量
Vue.$toast = Vue.prototype.$toast = Toast
Vue.$loading = Vue.prototype.$loading = Loading
Vue.$messageBox = Vue.prototype.$messageBox = MessageBox

// 组件
Vue.component(SvgIcon.name, SvgIcon)
Vue.component(Footer.name, Footer)
Vue.component(Swiper.name, Swiper)

; (async function () {
  let routes = [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
  let newRoutes = await util.getAsyncRoutes()
  routes = routes.concat(newRoutes)
  let router = new Router({
    mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
          position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
          // cords will be used if no selector is provided,
          // or if the selector didn't match any element.
          position.x = 0
          position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
      }
      // return {
      //   x: 0,
      //   y: 0
      // }
    },
    routes
  })
  RouterGuard(router)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()

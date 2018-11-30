import Vue from 'vue'
import App from './app.vue'
import RouterGuard from '@/router'
import Router from 'vue-router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import Toast from '@/components/toast/index.js'
import {
  weixin,
  utils
} from '@/libs/interfaces'
import InitDirective from '@/libs/directive'
import Home from './views/home.vue'

// 初始化全局指令
Vue.use(InitDirective)
Vue.use(Router)

// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false

Vue.component('svg-icon', SvgIcon)

Vue.prototype.$toast = Toast

weixin.init()

;(async function () {
  let routes = [{
    path: '/',
    name: 'home',
    component: Home
  }]
  let newRoutes = await utils.util.getAsyncRoutes()
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

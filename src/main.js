import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import Toast from '@/components/toast/index.js'
import {
  weixin
} from '@/libs/interfaces'
import InitDirective from '@/libs/directive'

// 初始化全局指令
Vue.use(InitDirective)

// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false

Vue.component('svg-icon', SvgIcon)

Vue.prototype.$toast = Toast

weixin.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

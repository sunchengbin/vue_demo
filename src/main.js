import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import lazyload from '@/components/lazy_load'
import Toast from '@/components/toast'
import loading from '@/components/loading'
import MessageBox from '@/components/message_box/index'
import Footer from '@/components/footer/footer'
import Swiper from '@/components/swiper/swiper'
import SwipeItem from '@/components/swiper/swiper_item'
Vue.config.productionTip = false

// 插件
Vue.use(lazyload)

// 全局变量
Vue.$toast = Vue.prototype.$toast = Toast
Vue.$loading = Vue.prototype.$loading = loading
Vue.$messageBox = Vue.prototype.$messageBox = MessageBox

// 组件
Vue.component('svg-icon', SvgIcon)
Vue.component(Footer.name, Footer)
Vue.component(Swiper.name, Swiper)
Vue.component(SwipeItem.name, SwipeItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './app.vue'
import router from '@/routers'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/common/svg_icon/svg'
import lazyload from '@/components/common/lazy_load'
import Toast from '@/components/common/toast'
import loading from '@/components/common/loading'
import MessageBox from '@/components/common/message_box'
import Footer from '@/components/app/footer/footer'
import Swiper from '@/components/common/swiper/swiper'
import SwipeItem from '@/components/common/swiper/swiper_item'
import infiniteScroll from './components/common/infinite_scroll'
import '@/router'
import Wx from '@/libs/app/weixin'
Vue.config.productionTip = false
// 插件
Vue.use(lazyload)
Vue.use(infiniteScroll)
// 全局变量
Vue.$toast = Vue.prototype.$toast = Toast
Vue.$loading = Vue.prototype.$loading = loading
Vue.$messageBox = Vue.prototype.$messageBox = MessageBox
// 组件
Vue.component('svg-icon', SvgIcon)
Vue.component(Footer.name, Footer)
Vue.component(Swiper.name, Swiper)
Vue.component(SwipeItem.name, SwipeItem)
Wx.init()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

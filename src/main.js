import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import MessageBox from '@/components/message_box/index'
import Toast from '@/components/toast/index'
import Footer from '@/components/footer/footer'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
Vue.$messageBox = Vue.prototype.$messageBox = MessageBox
Vue.$toast = Vue.prototype.$toast = Toast
Vue.component(Footer.name, Footer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

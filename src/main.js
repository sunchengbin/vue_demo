import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import lazyload from '@/components/lazy_load'
import Toast from '@/components/toast'
import loading from '@/components/loading'
Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
Vue.$toast = Vue.prototype.$toast = Toast
Vue.$loading = Vue.prototype.$loading = loading
Vue.use(lazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

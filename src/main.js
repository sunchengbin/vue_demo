import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
// import Toast from '@/components/toast/index'

Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
// Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

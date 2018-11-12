import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import '@/libs/app/flexible'
import SvgIcon from '@/components/svg_icon/svg'
import MessageBox from '@/components/message-box/index';

Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
Vue.config.productionTip = false
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'
Vue.use(Router)

let routes = [{
  path: '/',
  name: 'home',
  component: home
}]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

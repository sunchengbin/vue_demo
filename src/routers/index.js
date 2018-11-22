import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
Vue.use(Router)

let routes = [{
  path: '/',
  name: 'index',
  component: index
}]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

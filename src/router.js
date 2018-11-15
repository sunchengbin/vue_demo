import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'
Vue.use(Router)

let routes = [{
  path: '/',
  name: 'home',
  component: home
}]

// 动态加载路由
function importAll (r) {
  r.keys().forEach(fileName => {
    if (/.\//.test(fileName)) {
      fileName = fileName.replace('./', '')
    }
    const file = import(`./routers/${fileName}`)
    file.then(res => {
      routes = routes.concat(res)
    })
  })
}
importAll(require.context('@/routers', true, /.js$/))

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import router from '@/routers'
import Vue from 'vue'
// 动态加载路由
async function getAsyncRoutes () {
  let routes = []
  const allRouters = require.context('@/routers', true, /.js$/).keys()
  for (let i in allRouters) {
    let fileName = allRouters[i]
    if (!/index.js/.test(fileName)) {
      if (/.\//.test(fileName)) {
        fileName = fileName.replace('./', '')
      }
      let file = await import(`@/routers/${fileName}`)
      routes = routes.concat(file.default)
    }
  }
  return routes
}

let isAdded = false
router.beforeEach(async (to, from, next) => {
  Vue.$toast({
    message: 'loading'
  })
  // if () {  验证是否授权
  if (!isAdded) {
    let routes = await getAsyncRoutes()
    router.addRoutes(routes) // 动态添加路由
    isAdded = true
    next({ ...to,
      replace: true
    })
  }
  next()
  // }
})
router.afterEach((to, from, next) => {
  if (from.name !== null) {
    this.$loading.open()
  }
})

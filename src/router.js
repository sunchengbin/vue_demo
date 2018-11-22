import router from '@/routers'
import Vue from 'vue'
import weixin from './libs/app/weixin'
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
  console.log(to)
  // if () {  验证是否授权
  // 判断是否授权,如果未授权则跳到授权
  weixin.getOpenID(to.path, to.query)
  if (!isAdded) {
    let routes = await getAsyncRoutes()
    router.addRoutes(routes) // 动态添加路由
    isAdded = true
    next({
      ...to,
      replace: true
    })
  }
  next()
  // }
})
router.afterEach(() => {})

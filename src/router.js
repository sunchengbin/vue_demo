// import weixin from '@/libs/app/weixin'
import Vue from 'vue'
export default function (router) {
  router.beforeEach(async (to, from, next) => {
    console.log(from)
    // if () {  验证是否授权
    // 判断是否授权,如果未授权则跳到授权
    // weixin.getOpenID(to.path, to.query)
    console.log(1)
    next()
    // }
  })
  router.afterEach((to, from, next) => {
    if (from.name !== null) {
      // Vue.$loading.open()
    }
  })
}

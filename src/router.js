export default function (router) {
  router.beforeEach(async (to, from, next) => {
    // if () {  验证是否授权
    console.log(1)
    next()
    // }
  })
  router.afterEach(() => {})
}

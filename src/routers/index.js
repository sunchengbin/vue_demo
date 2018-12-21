export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
    },
    props: (route) => ({
      query: route.query.q
    })
  }
]

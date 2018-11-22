export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/help')
  },
  {
    path: '/about/:id',
    name: 'about',
    component: () => import('@/views/about')
  }
]

export default [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/help')
  }
]

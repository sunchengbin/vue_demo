module.exports = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/help.vue')
  }
]

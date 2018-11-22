export default [
  {
    path: '/index/:id',
    name: 'index',
    component: () => import('@/views/index.vue')
  }
]

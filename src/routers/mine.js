export default [
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/mine.vue')
  },
  {
    path: '/myVip',
    name: 'myVip',
    component: () => import('@/views/myVip/myVip.vue')
  },
  {
    path: '/charge',
    name: 'charge',
    component: () => import('@/views/charge/charge.vue')
  }
]

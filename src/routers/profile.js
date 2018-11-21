export default [{
  path: '/about',
  name: 'about',
  component: () => import('@/views/about.vue')
},
{
  path: '/index',
  name: 'index',
  component: () => import('@/views/index.vue')
},
{
  path: '/help',
  name: 'help',
  component: () => import('@/views/help.vue')
}
]

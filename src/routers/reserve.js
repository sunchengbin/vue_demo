export default [{
  path: '/reserve',
  name: 'reserve',
  component: () => import('@/views/reserve/reserve.vue')
},
{
  path: '/reserve/adress',
  name: 'adress',
  component: () => import('@/views/reserve/adress.vue')
},
{
  path: '/reserve/searchKTV',
  name: 'searchKTV',
  component: () => import('@/views/reserve/searchKTV.vue')
}]

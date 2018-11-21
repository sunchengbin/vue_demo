const routers = [{
  path: '/reserve',
  name: 'reserve',
  component: () => import('@/views/reserve/reserve.vue')
},
{
  path: '/adress',
  name: 'adress',
  component: () => import('@/views/reserve/adress.vue')
},
{
  path: '/searchKTV',
  name: 'searchKTV',
  component: () => import('@/views/reserve/searchKTV.vue')
}]
export default routers

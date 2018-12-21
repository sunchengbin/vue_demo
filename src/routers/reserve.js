export default [{
  path: '/reserve',
  name: 'reserve',
  component: () => import('@/views/reserve/reserve.vue'),
  meta: {
    title: 'reserve'
  }
},
{
  path: '/reserve/adress',
  name: 'adress',
  component: () => import('@/views/reserve/adress.vue'),
  meta: {
    title: 'adress'
  }
},
{
  path: '/reserve/search_ktv',
  name: 'searchKTV',
  component: () => import('@/views/reserve/search_ktv.vue'),
  meta: {
    title: 'searchKTV'
  }
}]

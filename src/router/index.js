import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Place from '../views/Place.vue'
import Access from '../views/Access.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'RestaurantSearcher' },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { title: '検索結果' },
  },
  {
    path: '/place',
    name: 'Place',
    component: Place,
    meta: { title: '店舗詳細' },
  },
  {
    path: '/access',
    name: 'Access',
    component: Access,
    meta: { title: 'アクセス' },
  },
  //{
  //  path: '*',
  //  name: 'Home',
  //  component: () => import('../views/Home.vue'),
  //},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalog',
    name: 'Catalog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue')
  },
  { 
    path: '/product',
    name: 'Product',
    props: true,
  
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/library',
    name: 'Library',

    component: () => import(/* webpackChunkName: "library" */ '../views/Library.vue')
  },
  { 
    path: '/auth',
    name: 'Authorize',

    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    props: true,

    component: () => import(/* webpackChunkName: "library" */ '../views/SearchResult.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }else if (to == from){
      return {
        top: 0, 
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0, 
        // behavior: 'smooth'
      }
    }
    // document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  },
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DashboardAdmin from '../views/Admin/Dashboard.vue'
import Cart from '../views/Cart.vue'
import store from '@/store'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/dashboard',
    name: 'DashboardAdmin',
    component: DashboardAdmin,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name : 'Home'
        })
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router

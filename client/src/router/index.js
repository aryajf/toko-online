import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Show from '../views/Show.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Cart from '../views/Cart.vue'
import Unpaid from '../views/Unpaid.vue'
import Pending from '../views/Pending.vue'
import Accepted from '../views/Accepted.vue'
import store from '@/store'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true,
      title: 'Home'
    },
    component: Home
  },
  {
    path: '/:id',
    name: 'Show',
    component: Show
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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/unpaid',
    name: 'Unpaid',
    component: Unpaid
  },
  {
    path: '/pending',
    name: 'Pending',
    component: Pending
  },
  {
    path: '/accepted',
    name: 'Accepted',
    component: Accepted
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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

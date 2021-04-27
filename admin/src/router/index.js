import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Show from '../views/Show.vue'
import Dashboard from '../views/dashboard/Index.vue'
import Profile from '../views/dashboard/Profile.vue'
import store from '@/store'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Show',
    component: Show
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name : 'Home'
        })
      }
      next()
    }
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

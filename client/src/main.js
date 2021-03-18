import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Toaster from '@meforma/vue-toaster'

import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'

import '@fortawesome/fontawesome-free/js/all.js'

require('@/store/subscriber')
axios.defaults.baseURL = "http://localhost:3000/api/"


store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{
    createApp(App).use(store).use(router).use(Toaster).mount('#app')
})

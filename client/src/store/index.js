import { createStore } from 'vuex'
// import axios from 'axios'
import auth from './auth'
import barang from './barang'
import admin from './admin'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    admin,
    barang
  }
})

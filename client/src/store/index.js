import { createStore } from 'vuex'
import axios from 'axios'
// import axios from 'axios'
import auth from './auth'
import barang from './barang'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    totalBeli : []
  },
  mutations: {
    SET_TOTAL_BELI(state, data){
      state.totalBeli.push(data)
    },
    REMOVE_ITEM_BELI(state, id){
      state.totalBeli.splice(state.totalBeli.findIndex(function(i){
        return i.id === id;
      }), 1);
    },
    CLEAR_ITEM_BELI(state){
      state.totalBeli.length = 0
    },
  },
  getters: {
    totalBeli(state){
      return state.totalBeli
    },
  },
  actions: {
    async setTotalBeli({commit}, barang){
      commit('SET_TOTAL_BELI', barang)
    },
    async submitTotalBeli(_, barang){
      try{
        let response = await axios.put('purchase', barang)
        return response
      }catch(e){
        return e.response
      }
    },
    async removeTotalBeli({commit}, id){
      commit('REMOVE_ITEM_BELI', id)
    },
    async clearTotalBeli({commit}){
      commit('CLEAR_ITEM_BELI')
    },
  },
  modules: {
    auth,
    barang
  },
  plugins: [createPersistedState()]
})

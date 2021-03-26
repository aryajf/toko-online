import { createStore } from 'vuex'
import axios from 'axios'
import auth from './auth'
import barang from './barang'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    totalAlert : [],
    totalBeli : [],
    loading : true,
  },
  mutations: {
    SET_TOTAL_ALERT(state, data){
      state.totalAlert.push(data)
    },
    CLEAR_ALERT(state){
      state.totalAlert.length = 0
    },
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
    SET_LOADING(state, data){
      state.loading = data
    },
  },
  getters: {
    totalBeli(state){
      return state.totalBeli
    },
    totalAlert(state){
      return state.totalAlert
    },
    loading(state){
      return state.loading
    },
  },
  actions: {
    async setTotalBeli({commit}, barang){
      commit('SET_TOTAL_BELI', barang)
    },
    async totalAlert({commit}, alert){
      commit('SET_TOTAL_ALERT', alert)
    },
    async submitTotalBeli({commit}, barang){
      try{
        let response = await axios.put('purchase', barang)
        barang.map((item)=>{
          commit('SET_TOTAL_ALERT', {title : `Berhasil membeli ${item.title}`})
        })
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
    async clearTotalAlert({commit}){
      commit('CLEAR_ALERT')
    },
  },
  modules: {
    auth,
    barang
  },
  plugins: [createPersistedState()]
})

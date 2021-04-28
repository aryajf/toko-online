import { createStore } from 'vuex'
import axios from 'axios'
import auth from './auth'
import barang from './barang'

export default createStore({
  state: {
    pending : [],
    accepted : [],
    totalAlert : [],
    loading : true
  },
  mutations: {
    SET_TOTAL_ALERT(state, data){
      state.totalAlert.push(data)
    },
    CLEAR_ALERT(state){
      state.totalAlert.length = 0
    },
    SET_PENDING(state, data){
      state.pending = data
    },
    REMOVE_PENDING(state, kode){
      state.pending.splice(state.pending.findIndex(function(i){
        return i.kode === kode
      }), 1)
    },
    SET_ACCEPTED(state, data){
      state.accepted = data
    },
    SET_LOADING(state, data){
      state.loading = data
    },
  },
  getters: {
    totalAlert(state){
      return state.totalAlert
    },
    pending(state){
      return state.pending
    },
    accepted(state){
      return state.accepted
    },
    loading(state){
      return state.loading
    },
  },
  actions: {
    async getPending({commit}){
      try{
        let response = await axios.get(`admin/pending`)
        commit('SET_PENDING', response.data.pending)
        return response
      }catch(e){
        return e.response
      }
    },
    async submitPending({dispatch, commit}, data){
      try{
        let response = await axios.post(`admin/accepted`,data)
        commit('REMOVE_PENDING', data.kode)
        dispatch('getAccepted')
        return response
      }catch(e){
        return e.response
      }
    },
    async getAccepted({commit}){
      try{
        let response = await axios.get(`admin/accepted`)
        commit('SET_ACCEPTED', response.data.accepted)
        return response
      }catch(e){
        return e.response
      }
    },
    async totalAlert({commit}, alert){
      commit('SET_TOTAL_ALERT', alert)
    },
    async clearTotalAlert({commit}){
      commit('CLEAR_ALERT')
    },
  },
  modules: {
    auth,
    barang
  },
})

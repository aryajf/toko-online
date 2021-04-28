import { createStore } from 'vuex'
import axios from 'axios'
import auth from './auth'
import barang from './barang'

export default createStore({
  state: {
    totalAlert : [],
    totalHargaCart : 0,
    cart : [],
    unpaid : [],
    pending : [],
    accepted : [],
    loading : true,
  },
  mutations: {
    SET_TOTAL_ALERT(state, data){
      state.totalAlert.push(data)
    },
    CLEAR_ALERT(state){
      state.totalAlert.length = 0
    },
    SET_CART(state, data){
      state.cart = data
    },
    CLEAR_CART(state){
      state.cart.length = 0
    },
    REMOVE_CART(state, id){
      state.cart.splice(state.cart.findIndex(function(i){
        return i.id === id;
      }), 1);
    },
    REMOVE_UNPAID(state, kode){
      state.unpaid.splice(state.unpaid.findIndex(function(i){
        return i.kode === kode;
      }), 1);
    },
    SET_UNPAID(state, data){
      state.unpaid = data
    },
    CLEAR_UNPAID(state){
      state.unpaid.length = 0
    },
    SET_PENDING(state, data){
      state.pending = data
    },
    CLEAR_PENDING(state){
      state.pending.length = 0
    },
    SET_ACCEPTED(state, data){
      state.accepted = data
    },
    CLEAR_ACCEPTED(state){
      state.accepted.length = 0
    },
    SET_LOADING(state, data){
      state.loading = data
    },
  },
  getters: {
    cart(state){
      return state.cart
    },
    unpaid(state){
      return state.unpaid
    },
    pending(state){
      return state.pending
    },
    accepted(state){
      return state.accepted
    },
    totalHargaCart(state){
      return state.totalHargaCart
    },
    totalAlert(state){
      return state.totalAlert
    },
    loading(state){
      return state.loading
    },
  },
  actions: {
    async totalAlert({commit}, alert){
      commit('SET_TOTAL_ALERT', alert)
    },
    async getCart({state,commit}){
      try{
        let response = await axios.get(`cart`)
        commit('SET_CART', response.data.cart)
        state.totalHargaCart = 0
        state.cart.forEach(e => {
          state.totalHargaCart += parseInt(e.barang_harga);
        })
        return response
      }catch(e){
        return e.response
      }
    },
    async setCart({dispatch}, barang){
      try{
        let response = await axios.post(`cart`, barang)
        dispatch('getCart')
        return response
      }catch(e){
        return e.response
      }
    },
    async submitCart({dispatch}, data){
      try{
        let response = await axios.post('unpaid', data)
        dispatch('getUnpaid')
        return response
      }catch(e){
        return e.response
      }
    },
    async removeCart({commit,dispatch}, id){
      try{
        let response = await axios.delete(`cart/${id}`)
        commit('REMOVE_CART', id)
        dispatch('getCart')
        return response
      }catch(e){
        return e.response
      }
    },
    async getUnpaid({commit}){
      try{
        let response = await axios.get(`unpaid`)
        commit('SET_UNPAID', response.data.unpaid)
        return response
      }catch(e){
        return e.response
      }
    },
    async submitUnpaid({commit,dispatch}, form){
      try{
        let response = await axios.post('pending', form)
        dispatch('getPending')
        commit('REMOVE_UNPAID', form.kode)
        return response
      }catch(e){
        return e.response
      }
    },
    async getPending({commit}){
      try{
        let response = await axios.get(`pending`)
        commit('SET_PENDING', response.data.pending)
        return response
      }catch(e){
        return e.response
      }
    },
    async submitPending({dispatch}, data){
      try{
        let response = await axios.post('accepted', data)
        dispatch('getAccepted')
        return response
      }catch(e){
        return e.response
      }
    },
    async getAccepted({commit}){
      try{
        let response = await axios.get(`accepted`)
        commit('SET_ACCEPTED', response.data.accepted)
        return response
      }catch(e){
        return e.response
      }
    },
    async clearCart({commit}){
      commit('CLEAR_CART')
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

import createPersistedState from "vuex-persistedstate"
import axios from 'axios'

export default{
  namespaced: true,
  state: {
    user : null,
    token : null,
    errors : [],
  },
  mutations: {
    SET_USER(state, data){
      state.user = data
    },
    SET_TOKEN(state, data){
      state.token = data
    },
  },
  getters : {
    authenticated(state){
      return state.token && state.user
    },
    user(state){
      return state.user
    },
    errors(state){
      return state.errors
    }
  },
  actions: {
    async register({state},credentials){
      try{
        let response = await axios.post('register', credentials)
        return response
      }catch(e){
        state.errors = e.response.data.data
        return e.response
      }
    },
    async signin({dispatch, state},credentials){
      try{
        let response = await axios.post('login', credentials)
        
        dispatch('attempt', response.data.token)
        return response
      }catch(e){
        state.errors = e.response.data.data
        return e.response
      }
    },
    async attempt({commit, state},token){
      if(token){
        commit('SET_TOKEN', token)
      }

      if(!state.token){
        return
      }
      
      try{
        let response = await axios.get('profile')
        commit('SET_USER', response.data)
      }catch(e){
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },
    async updateProfile({commit,state},credentials){
      try{
        let response = await axios.put('profile', credentials)
        commit('SET_USER', response.data.data)
        return response
      }catch(e){
        state.errors = e.response.data.data
        return e.response
      }
    },
    async logout({commit}){
      commit('CLEAR_ITEM_BELI',0,{root:true})
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  },
  plugins: [createPersistedState()]
}
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
        state.errors = e.response.data.errors
        return e.response
      }
    },
    async signin({dispatch, state},credentials){
      try{
        let response = await axios.post('login', credentials)
        
        dispatch('attempt', response.data.token)
        return response
      }catch(e){
        state.errors = e.response.data.errors
        return e.response
      }
    },
    async attempt({commit, dispatch, state},token){
      if(token){
        commit('SET_TOKEN', token)
      }

      if(!state.token){
        return
      }
      
      try{
        
        dispatch('getCart',null,{root:true})
        dispatch('getUnpaid',null,{root:true})
        dispatch('getPending',null,{root:true})
        dispatch('getAccepted',null,{root:true})
        let response = await axios.get('profile')
        commit('SET_USER', response.data)
      }catch(e){
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },
    async getProfile({commit,state}){
      try{
        let response = await axios.get('profile')
        commit('SET_USER', response.data)
        return response.data
      }catch(e){
        state.errors = e.response.data
        return e.response
      }
    },
    async updateProfile({state},credentials){
      try{
        let response = await axios.put('profile', credentials)
        return response
      }catch(e){
        state.errors = e.response.data.data
        return e.response
      }
    },
    async logout({commit}){
      commit('CLEAR_CART',null,{root:true})
      commit('CLEAR_UNPAID',null,{root:true})
      commit('CLEAR_PENDING',null,{root:true})
      commit('CLEAR_ACCEPTED',null,{root:true})
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
}
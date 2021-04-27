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
    async signin({dispatch,state},credentials){
      try{
        let response = await axios.post('loginAdmin', credentials)
        dispatch('attempt', response.data.token)
        return response
      }catch(e){
        state.errors = e.response.data.errors
        return e.response
      }
    },
    async attempt({dispatch, commit, state},token){
      if(token){
        commit('SET_TOKEN', token)
      }

      if(!state.token){
        return
      }
      
      try{
        let response = await axios.get('profile')
        dispatch('getPending',null,{root:true})
        dispatch('getAccepted',null,{root:true})
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
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
}
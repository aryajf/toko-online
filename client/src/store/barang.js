import axios from 'axios'

export default({
    namespaced : true,
    state : {
        semuaBarang : [],
        barang : [],
        results : [],
    },
    mutations : {
        SET_SEMUA_BARANG(state, data){
            state.semuaBarang = data
        },
        SET_BARANG(state, data){
            state.barang = data
        },
        SET_BARANG_USER(state, data){
            state.barang = data
        },
        SET_RESULTS(state, data){
            state.results = data
        },
        CLEAR_RESULTS(state){
          state.results.length = 0
        },
    },
    getters : {
        semuaBarang(state){
          return state.semuaBarang
        },
        barang(state){
          return state.barang
        },
        results(state){
          return state.results
        }
      },
    actions: {
        async getSemuaBarang({commit}){
          commit('SET_LOADING', true, {root:true})
            try{
              let response = await axios.get('barang')
              commit('SET_SEMUA_BARANG', response.data.barang)
              commit('SET_LOADING', false, {root:true})
              return response
            }catch(e){
              commit('SET_LOADING', false, {root:true})
              return e.response
            }
        },
        async getBarang({commit}, credentials){
          commit('SET_LOADING', true, {root:true})
          try{
            let response = await axios.get(`barang/${credentials}`)
            commit('SET_BARANG', response.data.barang)
            commit('SET_LOADING', false, {root:true})
            return response
          }catch(e){
            commit('SET_LOADING', false, {root:true})
            return e.response
          }
        },
        async searchBarang({commit},keyword){
          try{
            let response = await axios.get(`barang/search/${keyword}`)
            commit('SET_RESULTS', response.data.barang)
            return response
          }catch(e){
            commit('CLEAR_RESULTS')
            return e.response
          }
        },
        async clearResults({commit}){
          commit('CLEAR_RESULTS')
        },
    }
  })
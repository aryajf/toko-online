import axios from 'axios'

export default({
    namespaced : true,
    state : {
        populars : [],
        semuaBarang : [],
        barang : [],
        barang_alert : '',
        results : [],
        loading : true
    },
    mutations : {
        SET_POPULARS(state, data){
            state.populars = data
        },
        SET_SEMUA_BARANG(state, data){
            state.semuaBarang = data
        },
        SET_BARANG(state, data){
            state.barang = data
        },
        SET_BARANG_USER(state, data){
            state.barang = data
        },
        SET_BARANG_ALERT(state, data){
            state.barang_alert = data
        },
        SET_LOADING(state, data){
            state.loading = data
        },
        SET_RESULTS(state, data){
            state.results = data
        },
        CLEAR_RESULTS(state){
          state.results.length = 0
        },
    },
    getters : {
        populars(state){
          return state.populars
        },
        semuaBarang(state){
          return state.semuaBarang
        },
        barang(state){
          return state.barang
        },
        baranguser(state){
          return state.barang
        },
        barang_alert(state){
          return state.barang_alert
        },
        results(state){
          return state.results
        },
        loading(state){
          return state.loading
        }
      },
    actions: {
        // async getPopulars({commit}){
        //     try{
        //       let response = await axios.get('/popular-blogs')
        //       commit('SET_POPULARS', response.data.populars)
        //       return response
        //     }catch(e){
        //       return e.response
        //     }
        // },
        async getSemuaBarang({commit}){
            try{
              let response = await axios.get('barang')
              commit('SET_SEMUA_BARANG', response.data.barang)
              return response
            }catch(e){
              return e.response
            }
        },
        async getBarang({commit}, credentials){
          try{
            let response = await axios.get(`barang/${credentials}`)
            commit('SET_BARANG', response.data.barang)
            return response
          }catch(e){
            return e.response
          }
        },
        async getBarangUser({commit}){
          try{
            let response = await axios.get(`barang/user`)
            commit('SET_BARANG_USER', response.data.barang)
            return response
          }catch(e){
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
        async createBarang({commit, state, dispatch},form){
          try{
            let response = await axios.post('barang', form)
            commit('SET_TOTAL_ALERT', {title : 'Barang baru ditambahkan'},{root:true})
            dispatch('getBarangUser')
            return response
          }catch(e){
            state.errors = e.response.data.data
            return e.response
          }
        },
        async updateBarang({state, dispatch},credentials){
          try{
            let response = await axios.put(`barang/${credentials.id}`, credentials.form)
            dispatch('getBarangUser')
            return response
          }catch(e){
            state.errors = e.response.data.data
            return e.response
          }
        },
        async deleteBarang({dispatch}, credentials){
          try{
            let response = await axios.delete(`barang/${credentials}`)
            dispatch('getBarangUser')
            return response
          }catch(e){
            return e.response
          }
        },
    }
})
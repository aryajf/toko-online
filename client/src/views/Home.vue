<template>
<div>
    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Kamu harus login terlebih dahulu sebelum memesan <i class="far fa-smile-wink"></i></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-footer">
                <router-link to="/login" class="btn btn-info" data-dismiss="modal"><i class="fas fa-sign-in-alt"></i> Login</router-link>
            </div>
          </div>
      </div>
    </div>
    <cart-modal v-if="barang_id" :barang_id="barang_id"></cart-modal>

    <div class="container-fluid">
    <div class="row py-5">
      <div class="col align-items-center d-flex justify-content-center">
        <h1 id="home-title" class="d-flex justify-content-center py-4">Buruan Pesan Baju disini!!</h1>
      </div>
      <div class="col">
        <img id="home-img" src="@/assets/images/dashboard.png" alt="">
      </div>
    </div>
    <div class="row py-5">
      <div class="col  align-items-center d-flex justify-content-center">
        <img id="home-img" src="@/assets/images/faq.png" alt="">
      </div>
      <div class="col">
        <div id="home-title" class="py-4">
          <div class="py-2">
            <h3>Apakah kami menyediakan COD ?</h3>
            <b><p>Yaa kami menyediakan COD barang / bayar ditempat</p></b>
          </div>
          <div class="py-2">
            <h3>Apakah Ongkir nya gratis ?</h3>
            <b><p>Yaps benar sekali, it's superr free bro. Barang sudah termasuk ongkir</p></b>
          </div>
          <div class="py-2">
            <h3>Kalau barangnya rusak boleh ditukar ga sih ?</h3>
            <b><p>Boleh kok kami menyediakan refund untuk barang yang rusak</p></b>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(item, index) in barang" :class="index == 0 ? 'active' : '' " :key="item.id" class="carousel-item">
          <img class="d-block w-100" :src="apiURL+'images/barang/'+item.cover" :alt="item.title">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{item.title}}</h5>
            <p>
              <template v-if="authenticated">
                <template v-if="user.id != item.user_id">
                  <a data-toggle="modal" data-target="#cartModal" @click.prevent="getCartModal(item.id)" class="btn btn-success"><i class="fas fa-cart-arrow-down"></i> Pesan!</a>
                </template>
              </template>
              <template v-else>
                <a data-toggle="modal" data-target="#loginModal" href="#" class="btn btn-success"><i class="fas fa-cart-arrow-down"></i> Pesan!</a>
              </template>
            </p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    </div>
    </div>
    <template v-if="loading">
        <loading></loading>
    </template>
    <template v-else>
    <div class="row py-5">
      <div class="col-md-3" v-for="item in barang" :key="item.id">
        <div class="card">
          <img class="card-img-top" :src="apiURL+'images/barang/'+item.cover" :alt="item.title">
          <div class="card-body">
            <router-link :to="'/'+item.id" class="card-title"><h5>{{item.title}}</h5></router-link>
            <p class="card-text">{{item.description}}</p>
            <div class="container-fluid">
              <small>
                <div class="row mb-2">
                  <div class="col"><i class="fas fa-boxes"></i> Stok: {{item.stok}}</div>
                  <div class="col-6"><i class="fas fa-money-bill"></i> Harga: Rp.{{item.harga}},00</div>
                </div>
                <div class="row">
                  <div class="col">
                  <i class="fas fa-pencil-alt"></i> {{DateFormat(item.createdAt)}}
                  </div>
                </div>
              </small>
            </div>
            <hr>
            <div class="row">
              <div class="col">
              <template v-if="authenticated">
                <template v-if="user.id != item.user_id">
                  <a data-toggle="modal" data-target="#cartModal" @click.prevent="getCartModal(item.id)" class="w-100 btn btn-success"><i class="fas fa-cart-arrow-down"></i> Pesan!</a>
                </template>
              </template>
              <template v-else>
                <a data-toggle="modal" data-target="#loginModal" href="#" class="w-100 btn btn-success"><i class="fas fa-cart-arrow-down"></i> Pesan!</a>
              </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
  <div class="row py-5">
      <div class="col align-items-center d-flex justify-content-center">
        <img id="home-img" src="@/assets/images/phone.png" alt="">
      </div>
      <div class="col">
        <h3 id="home-title" class="py-4">
          <h3>Contact us:</h3>
          <p><i class="fas fa-phone"></i> 085773310236</p>
          <p><i class="fas fa-envelope"></i> arshop@gmail.com</p>
          <p><i class="fas fa-map-marker-alt"></i> Sukabumi</p>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import cartModal from '@/components/modal/cartModal.vue'
import appConfig from "../config/app"
import Loading from '@/components/Loading'
import {mapGetters} from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    data(){
      return{
        barang_id : null
      }
    },
    components:{
     cartModal,Loading
   },
  created(){
    this.getSemuaBarang();
  },
  computed: {
    ...mapGetters({
        authenticated : 'auth/authenticated',
        barang : 'barang/semuaBarang',
        user : 'auth/user',
        loading : 'loading'
        // errors : 'auth/errors'
    })
  },
    methods:{
        getCartModal(id){
            this.barang_id = id;
        },
        getSemuaBarang(){
            this.$store.dispatch('barang/getSemuaBarang').then(() => {
            }).catch(err => {
                console.log(err);
            })
        },
        DateFormat(item) {
          return moment(item).locale('id').format('LLL')
        }
    }
}
</script>
<style scoped>
.carousel-inner {
    width: 100%;
    max-height: 600px !important;
}
.carousel-caption{
  margin-bottom: 60vh;
}
</style>
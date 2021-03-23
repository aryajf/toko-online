<template>
<div>
    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Kamu harus login terlebih dahulu sebelum memesan</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <router-link to="/login" class="btn btn-info" data-dismiss="modal">Login</router-link>
            </div>
          </div>
      </div>
    </div>
    <checkout-modal v-if="barang_id" :barang_id="barang_id"></checkout-modal>
    <div class="container-fluid">
    <div class="row mb-2">
      <div class="col">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="@/assets/images/carousel/shopping1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/images/carousel/shopping2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/images/carousel/shopping3.jpg" alt="Third slide">
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
    <h1 class="d-flex justify-content-center py-4">Buruan Pesan disini!!</h1>
    <hr>
    <div class="row">
      <div class="col-md-3" v-for="item in barang" :key="item.id">
        <div class="card">
          <img class="card-img-top" :src="apiURL+'images/barang/'+item.cover" :alt="item.title">
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{item.description}}</p>
            <div class="d-flex justify-content-between">
              <small>
              <i class="far fa-user"></i> {{item.user_name}} 
              <i class="fas fa-box"></i> {{item.total}} 
              <i class="fas fa-pencil-alt"></i> {{item.createdAt}}
              </small>
            </div>
            <hr>
            <router-link :to="'/'+item.id" class="btn btn-secondary">Read More</router-link>&nbsp;
            <template v-if="authenticated">
              <template v-if="user.id != item.user_id">
                <!-- <a data-toggle="modal" data-target="#checkoutModal" @click.prevent="getCheckoutModal(item.id)" class="btn btn-success">Pesan!</a> -->
              </template>
            </template>
            <template v-else>
              <a data-toggle="modal" data-target="#loginModal" href="#" class="btn btn-success">Pesan!</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import checkoutModal from '@/components/modal/checkoutModal.vue'
import appConfig from "../config/app"
import {mapGetters} from 'vuex'
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
     checkoutModal
   },
  created(){
    this.getSemuaBarang();
  },
  computed: {
    ...mapGetters({
        authenticated : 'auth/authenticated',
        barang : 'barang/semuaBarang',
        user : 'auth/user',
        // errors : 'auth/errors'
    })
  },
    methods:{
        getCheckoutModal(id){
            this.barang_id = id;
        },
        getSemuaBarang(){
            this.$store.dispatch('barang/getSemuaBarang').then(() => {
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
.carousel-inner{
  width:100%;
  max-height: 500px !important;
}
</style>

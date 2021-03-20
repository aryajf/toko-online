<template>
<div>
    <div class="container-fluid">
    <h1 class="d-flex justify-content-center py-4">Buruan Pesan disini!!</h1>
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
          <img class="d-block w-100" src="" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="" alt="Third slide">
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
    <div class="row">
      <div class="col-md-3" v-for="item in barang" :key="item.id">
        <div class="card">
          <img class="card-img-top" src="" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{item.description}}</p>
            <router-link :to="'/'+item.id" class="btn btn-secondary">Read More</router-link> <a href="#" class="btn btn-success">Pesan!</a>
          </div>
        </div>
      </div>
    </div>
      <hr>
      
    <h1 class="mt-4">Kategori</h1>
    <div class="row">
      <div class="col-md-3" v-for="item in barang" :key="item.id">
        <div class="card">
          <img class="card-img-top" src="" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{item.description}}</p>
            <router-link :to="'/'+item.id" class="btn btn-secondary">Read More</router-link> <a href="#" class="btn btn-success">Pesan!</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  created(){
    this.getSemuaBarang();
  },
  computed: {
    ...mapGetters({
        barang : 'barang/semuaBarang',
        // errors : 'auth/errors'
    })
  },
    methods:{
        getSemuaBarang(){
            this.$store.dispatch('barang/getSemuaBarang').then((response) => {
              console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

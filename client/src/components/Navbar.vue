<template>
    <div>
        <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i><font-awesome-icon icon="bars"/></a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <div class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input v-model="keyword" class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge badge-danger navbar-badge">{{cart.length}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div id="cart-header">
          <div v-for="item in cart" :key="item.id">
            <router-link :to="'/'+item.barang_id" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img :src="apiURL+'images/barang/'+item.barang_cover" :alt="item.barang_title" class="img-size-50 mr-3 img-circle">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    {{item.barang_title}}
                  </h3>
                  <p class="text-sm text-muted"><i class="fas fa-boxes"></i> {{item.barang_stok}} <i class="fas fa-pencil-alt"></i> {{item.barang_pemilik}}</p>
                  <p class="text-sm text-muted"><i class="fas fa-money-bill"></i> Rp.{{item.barang_harga}},00</p>
                </div>
              </div>
              <!-- Message End -->
            </router-link>
            <div class="dropdown-divider"></div>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <router-link to="/cart" class="dropdown-item dropdown-footer">Lihat Semua Belanja mu</router-link>
        </div>
      </li>
      <!-- Reports Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-file-alt"></i>
          <span class="badge badge-danger navbar-badge">{{unpaid.length + pending.length + accepted.length}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div id="cart-header">
          <router-link to="/unpaid" class="dropdown-item">Menunggu Pembayaran <span class="badge badge-danger">{{unpaid.length}}</span></router-link>
          <router-link to="/pending" class="dropdown-item">Menunggu Konfirmasi Admin <span class="badge badge-danger">{{pending.length}}</span></router-link>
          <router-link to="/accepted" class="dropdown-item">Pembayaran yang Berhasil <span class="badge badge-danger">{{accepted.length}}</span></router-link>
          </div>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">{{totalAlert.length}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div>
          <span class="dropdown-header">{{totalAlert.length}} Notifikasi</span>
          <div class="dropdown-divider"></div>
          <div id="cart-header">
          <a v-for="item in totalAlert" :key="item.id" href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> {{item.title}}
          </a>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <a href="#" @click="removeAlert" class="dropdown-item dropdown-footer bg-danger">Hapus Histori</a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
  <div v-if="results.length > 0">
  <div id="result" class="main-header navbar navbar-expand navbar-white navbar-light">
  </div>
  <div id="result" v-for="result in results" :key="result.id" class="main-header navbar navbar-expand navbar-white navbar-light">
    <router-link class="list-group-item w-100 search-link" :to="'/'+result.id" :style="`--i: ${result.id}`">
        <div class="row">
          <div class="col-1 d-flex align-items-center"><img :src="apiURL+'images/barang/'+result.cover" class="img-thumbnail" :alt="result.title"></div>
          <div class="col d-flex align-items-center">{{result.title}}</div>
          <div class="col d-flex align-items-center"><i class="fas fa-box"></i> {{result.stok}}</div>
          <div class="col d-flex align-items-center"><i class="fas fa-money-bill"></i> Rp.{{result.harga}},00</div>
          <div class="col d-flex align-items-center"><i class="fas fa-pencil-alt"></i> {{result.user_name}}</div>
        </div>
    </router-link>
  </div>
  </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import appConfig from "../config/app"
export default {
  setup() {
    return {
      apiURL: appConfig.apiURL,
    };
  },
  data(){
      return {
          keyword : null,
          alert : null
      }
  },
  watch: {
      keyword() {
          this.search()
      }
  },
  computed: {
    ...mapGetters({
        totalAlert : 'totalAlert',
        cart : 'cart',
        unpaid : 'unpaid',
        pending : 'pending',
        accepted : 'accepted',
        results : 'barang/results',
    })
  },
  methods: {
      search(){
        if(this.keyword != ''){
          this.$store.dispatch('barang/searchBarang', this.keyword).then((response) => {
            this.alert = response.data.message
            }).catch(err => {
              console.log(err);
            })
        }else{
          this.$store.dispatch('barang/clearResults')
        }
      },
      removeAlert(){
          this.$store.dispatch('clearTotalAlert')
          this.$toast.success('Notifikasi berhasil dihapus')
      }
  }
}
</script>
<style lang="scss" scoped>
#cart-header{
  height:250px;
  overflow-y:scroll
}
#result{
  z-index: 0;
}

.search-link{
    color:#555;
    text-decoration: none;
    &:hover{
        color:#212529;
    }
}
</style>
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
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-shopping-cart"></i>
          <span class="badge badge-danger navbar-badge">{{totalBeli.length}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <div id="cart-header">
          <div v-for="item in totalBeli" :key="item.id">
            <div :to="'/'+item.id" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img :src="apiURL+'images/barang/'+item.cover" :alt="item.title" class="img-size-50 mr-3 img-circle">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    {{item.title}}
                    <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm text-muted"><i class="fas fa-box"></i> {{item.total}} <i class="fas fa-pencil-alt"></i> {{item.user_name}}</p>
                </div>
              </div>
              <!-- Message End -->
            </div>
            <div class="dropdown-divider"></div>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <router-link to="/cart" class="dropdown-item dropdown-footer">Lihat Semua Belanja mu</router-link>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">{{totalAlert.length}}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header">{{totalAlert.length}} Notifikasi</span>
          <div class="dropdown-divider"></div>
          <div id="cart-header">
          <a v-for="item in totalAlert" :key="item.id" href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> {{item.title}}
            <div>
              <small>{{item.item}}</small>
            </div>
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
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
  computed: {
    ...mapGetters({
        totalAlert : 'totalAlert',
        totalBeli : 'totalBeli',
    }),
  }
}
</script>
<style scoped>
#cart-header{
  height:250px;
  overflow-y:scroll
}
</style>
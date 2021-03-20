<template>
    <div>
          <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
        </div>
        <div class="info">
          <template v-if="user">
          <router-link to="/dashboard" class="d-block">{{this.user.name}}</router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="d-block">Not Registered</router-link>
          </template>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview menu-open">
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/" class="nav-link" exact>
                  <i class="far fa-circle nav-icon"></i>
                  <p>Home</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/profile" class="nav-link" exact>
                  <i class="far fa-circle nav-icon"></i>
                  <p>Profile</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link" exact>
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </router-link>
              </li>
              <template v-if="user">
              </template>
              <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Login</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Register</p>
                </router-link>
              </li>
              </template>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user : 'auth/user',
            // errors : 'auth/errors'
        }),
	},
}
</script>
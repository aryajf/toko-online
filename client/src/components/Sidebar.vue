<template>
    <div>
      <!-- Modal -->
        <div class="modal fade" id="signoutModal" tabindex="-1" role="dialog" aria-labelledby="signoutModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signoutModalLabel">Apa kamu yakin ingin keluar dari akun ini ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="logout" type="button" class="btn btn-danger">Keluar</button>
                </div>
              </div>
          </div>
        </div>
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
          <template v-if="authenticated">
          <router-link to="/dashboard" class="d-block">{{this.user.name}}</router-link>
          </template>
          <template v-else>
            <router-link to="#" class="d-block">Not Registered</router-link>
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
              <template v-if="authenticated">
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
              <li class="nav-item">
                <a data-toggle="modal" data-target="#signoutModal" href="#" class="nav-link" exact>
                  <i class="far fa-circle nav-icon"></i>
                  <p>Signout</p>
                </a>
              </li>
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
import $ from 'jquery'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
        user : 'auth/user',
        authenticated : 'auth/authenticated',
        // errors : 'auth/errors'
    }),
  },
  methods : {
    logout(){
      this.$store.dispatch('auth/logout').then(() => {
        $('#signoutModal').modal('hide')
        this.$router.push({ name: 'Home'})
      }).
      catch(err => {
        console.log(err);
      })
    },
  }
}
</script>
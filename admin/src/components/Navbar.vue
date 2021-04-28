<template>
    <div>
    <!-- Modal -->
    <div class="modal fade" id="signoutModal" tabindex="-1" aria-labelledby="signoutModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="signoutModalLabel">Apa kamu yakin ingin keluar dari akun ini ?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="logout" data-bs-dismiss="modal" type="button" class="btn btn-danger">Keluar</button>
          </div>
          </div>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/dashboard">Admin Page</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/dashboard">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/profile">Profile</router-link>
                </li>
                <li class="nav-item">
                    <a data-bs-toggle="modal" data-bs-target="#signoutModal" href="#" class="nav-link" exact><i class="fas fa-sign-out-alt nav-icon"></i> Signout
                    </a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
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
        user : 'auth/user',
        authenticated : 'auth/authenticated'
    }),
  },
  methods : {
    logout(){
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ name: 'Home'})
      }).
      catch(err => {
        console.log(err);
      })
    },
  }
}
</script>
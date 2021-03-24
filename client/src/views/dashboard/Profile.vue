<template>
    <div>
        <section class="content-header">
        <h1 v-if="this.user" class="pb-3">
          Selamat datang {{this.user.name}}
        </h1>
        <h5 class="mb-4">Ubah profil mu disini</h5>
        <div class="row">
          <div class="col-4 offset-1">
            <div class="d-flex justify-content-center" v-if="imagePreview">
                <img :src="imagePreview" class="img-fluid">
            </div>
            <div v-else>
                <div v-if="form.image">
                    <img class="img-fluid img-thumbnail rounded-circle" :src="apiURL+'images/users/'+form.image" :alt="form.name">
                </div>
                <div v-else>
                    <img src="@/assets/images/user/profile.jpg" class="img-fluid img-thumbnail rounded-circle" alt="Cinque Terre">
                </div>
            </div>
          </div>
          <div class="col offset-1">
          <form @submit.prevent="updateProfile">
            <div class="input-group mb-3">
                <input type="text" v-model="form.name" class="form-control" placeholder="Nama User">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-user"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="text" v-model="form.email" class="form-control" placeholder="Email User">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
              </div>
              <div class="custom-file">
                  <input v-on:change="onImageChange" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
              </div>
            </div>
            <!-- <div class="input-group mb-3">
                <input type="password" v-model="user.password" class="form-control" placeholder="Password User">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-asterisk"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="password" v-model="user.confirmPassword" class="form-control" placeholder="Konfirmasi Password User">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-asterisk"></span>
                    </div>
                </div>
            </div> -->
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-success btn-block">Update Profile</button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import appConfig from "../../config/app"
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    data(){
        return{
            form : {
                name: '',
                email : '',
                image : null
            },
            imagePreview: null
        }
    },
    created(){
        if(this.user){
            this.form.name = this.user.name
            this.form.email = this.user.email
            this.form.image = this.user.profile
        }
    },
    computed: {
      ...mapGetters({
          user : 'auth/user'
      })
    },
    methods :{
      onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.form.image = files[0]
            if (!files.length)
                return;
            this.createImage(files[0]);
      },
      createImage(file) {
          if(file.type == 'image/x-icon' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/jpeg'){
              let reader = new FileReader();
              reader.onload = (e) => {
                  this.imagePreview = e.target.result;
              };
              reader.readAsDataURL(file);
          }else{
              console.log('ups bro gk bisa ditampilin');
          }
      },
      updateProfile(){
        const data = new FormData()
        data.append('profile', this.form.image)
        data.append('name', this.form.name)
        data.append('email', this.form.email)
        this.$store.dispatch('auth/updateProfile', data).then((response) => {
            if(response.status === 200){
                this.$store.dispatch('auth/getProfile')
                this.$toast.success(response.data.message)
                this.$router.push({name: 'Dashboard'})
            }else{
                this.$toast.error(response.data.message)
            }
        })
      }
    }
}
</script>
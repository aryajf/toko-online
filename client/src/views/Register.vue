<template>
<div class="d-flex justify-content-center align-items-center">
  <div class="row py-5">
    <div class="col">
    <div class="login-box pt-5">
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Kuy Daftarkan Diri Kamu</p>

      <form @submit.prevent="submit">
        <div class="input-group mb-3">
          <input type="email" class="form-control" v-model="form.email" placeholder="Email" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="form.name" placeholder="Nama" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="number" class="form-control" v-model="form.phone" placeholder="Nomor telepon" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-phone"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <textarea class="form-control" v-model="form.alamat" placeholder="Alamat Rumah" required></textarea>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-map-marked-alt"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="form.password" placeholder="Password" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="form.confirmPassword" placeholder="Password Confirmation" required>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="offset-7 col-5">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
</div>
<div class="col d-flex justify-content-center align-items-center">
  <img src="@/assets/images/register.png" alt="">
</div>
</div>
</div>
</template>
<script>
export default {
  data(){
		return {
			form : {
				email : '',
				name : '',
				phone : '',
				alamat : '',
				password : '',
				confirmPassword : '',
			},
		}
	},
  methods: {
		submit(){
      if(this.form.password === this.form.confirmPassword){
        this.$store.dispatch('auth/register', this.form).then((response) => {
          if(response.status == 201){
            this.$toast.success(response.data.message)
            this.$router.push({ name: 'Login'})
          }else{
            this.$toast.error(response.data.message)
          }
        })
      }else{
            this.$toast.error("Password dengan konfirmasi password tidak sama")
      }
		}
	}
}
</script>
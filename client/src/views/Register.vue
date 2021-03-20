<template>
<div class="d-flex justify-content-center">
    <div class="login-box pt-5">
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Kuy Daftarkan Diri Kamu</p>

      <form @submit.prevent="submit">
        <div class="input-group mb-3">
          <input type="email" class="form-control" v-model="form.email" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="form.name" placeholder="Nama">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="form.password" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" v-model="form.confirmPassword" placeholder="Password Confirmation">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="offset-8 col-4">
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
</template>
<script>
export default {
  data(){
		return {
			form : {
				email : '',
				name : '',
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
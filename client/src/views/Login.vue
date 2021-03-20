<template>
<div class="d-flex justify-content-center">
    <div class="login-box pt-5">
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Buruan Masuk Untuk Memesan</p>

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
          <input type="password" class="form-control" v-model="form.password" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="offset-8 col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
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
				password : ''
			}
		}
	},
  methods: {
		submit(){
			this.$store.dispatch('auth/signin', this.form).then((response) => {
        console.log(response);
        if(response.status == 200){
          this.$toast.success(response.data.message)
          this.$router.push({ name: 'Home'})
        }else{
          this.$toast.error(response.data.message)
        }
      })
		}
	}
}
</script>
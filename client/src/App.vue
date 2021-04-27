<template>
<div id="app" class="wrapper">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="1" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,197.3C672,171,768,85,864,69.3C960,53,1056,107,1152,149.3C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  <Navbar/>
  <Sidebar/>
  <router-view class="content-wrapper"/>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components:{
     Navbar,Sidebar
   },
}
</script>
<style>
@import url('assets/scss/_variables.scss');
</style>
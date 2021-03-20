<template>
<div id="app" class="wrapper">
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



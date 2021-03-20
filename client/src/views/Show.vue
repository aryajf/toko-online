<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="py-4">{{barang.title}}</h1>
                <p>{{barang.description}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  created(){
    this.getBarang();
  },
  computed: {
    ...mapGetters({
        barang : 'barang/barang',
        // errors : 'auth/errors'
    })
  },
    methods:{
        getBarang(){
            this.$store.dispatch('barang/getBarang', this.$route.params.id).then((response) => {
              console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

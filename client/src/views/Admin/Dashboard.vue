<template>
    <div>
        <section class="content-header">
      <h1 class="pb-3">
        Selamat datang {{this.user.name}}
      </h1>
      <h1 class="pb-3">
        Dashboard
        <small>Version 2.0</small>
      </h1>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-blue"><i class="fas fa-cogs"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">CPU Traffic</span>
              <span class="info-box-number">90<small>%</small></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="fas fa-users"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">New Members</span>
              <span class="info-box-number">2,000</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
      </div>
    </section>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">
                <Create></Create>
            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Barang</h3>

                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                      <table class="table">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Nama</th>
                            <th scope="col">Dibuat pada</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in barang" :key="item.id">
                            <td><router-link :to="'/'+item.id">{{item.title}}</router-link></td>
                            <td>{{item.createdAt}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Create from '@/components/barang/Create.vue'

export default {
    components:{
      Create
    },
    created(){
      this.getBarangUser();
    },
    computed: {
      ...mapGetters({
          user : 'auth/user',
          barang : 'barang/baranguser'
          // errors : 'auth/errors'
      })
    },
    methods:{
      getBarangUser(){
        this.$store.dispatch('barang/getBarangUser').then(() => {}).
        catch(err => {
              console.log(err);
        })
      }
    }
}
</script>
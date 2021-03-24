<template>
    <div>
        <section class="content-header">
      <h1 v-if="this.user" class="py-3">
        Selamat datang {{this.user.name}}
      </h1>
    </section>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <Create></Create>
            </div>
            <div class="col-md-8">
            <div class="col-4">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fas fa-boxes"></i></span>

                <div class="info-box-content">
                  <span class="info-box-text">Jumlah Barang</span>
                  <span class="info-box-number">{{barang.length}}</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Barang</h3>

                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                      <template v-if="barang.length == 0">
                        <div class="alert alert-danger">Anda belum menambah barang apapun</div>
                        </template>
                      <template v-else>
                        <table class="table">
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Nama</th>
                              <th scope="col">Total Barang</th>
                              <th scope="col">Dibuat pada</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in barang" :key="item.id">
                              <td><router-link :to="'/'+item.id">{{item.title}}</router-link></td>
                              <td>{{item.total}}</td>
                              <td>{{item.createdAt}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </div>
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
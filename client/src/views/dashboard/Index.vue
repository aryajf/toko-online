<template>
    <div class="py-3">
      <template v-if="loading">
        <loading></loading>
    </template>
    <template v-else>
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
            <div class="col-md-4">
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
                              <th scope="col">Stok</th>
                              <th scope="col">Harga</th>
                              <th scope="col">Dibuat pada</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in barang" :key="item.id">
                              <td><router-link :to="'/'+item.id">{{item.title}}</router-link></td>
                              <td><i class="fas fa-box"></i> {{item.stok}}</td>
                              <td><i class="fas fa-money-bill"></i> Rp.{{item.harga}},00</td>
                              <td><i class="fas fa-pencil-alt"></i> {{DateFormat(item.createdAt)}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="alert alert-success">Berikut list barang yang dibelanjakan orang lain, jangan lupa cek bukti pembayarannya!</div>
            <table class="table table-bordered table-">
              <tr>
                  <th>List Barang</th>
                  <th>Total Harga</th>
                  <th>Foto Bukti Pembayaran</th>
                  <th>Tanggal barang diterima</th>
              </tr>
              <tr v-for="(items) in accepted" :key="items.kode">
              <td>
                  <table>
                      <tr>
                          <th>Foto Barang</th>
                          <th>Nama Barang</th>
                          <th>Stok</th>
                          <th>Harga</th>
                      </tr>
                      <tr v-for="(item) in items.cart" :key="item.kode">
                          <td>
                              <div class="col-1 d-flex align-items-center"><img :src="apiURL+'images/barang/'+item.barang.cover" style="width:100px" :alt="item.barang.title"></div>
                          </td>
                          <td><router-link :to="'/'+item.barang.id">{{item.barang.title}}</router-link></td>
                          <td>{{item.stok}}</td>
                          <td>Rp.{{item.harga}},00</td>
                      </tr>
                  </table>
              </td>
              <td>
                  Rp.{{items.total_harga}},00
              </td>
              <td>
                  <template v-if="items.foto_bukti">
                  <img class="card-img-top" :src="apiURL+'images/buktiPembayaran/'+items.foto_bukti" style="width:100px" alt="Foto bukti upload belum diupload">
                  </template>
                  <template v-else>
                      <div class="alert alert-danger">Anda belum mengupload foto bukti pembayaran</div>
                  </template>
              </td>
              <td>
                  {{DateFormat(items.updatedAt)}}
              </td>
          </tr>
      </table>
          </div>
        </div>
    </div>
    </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Create from '@/components/barang/Create.vue'
import Loading from '@/components/Loading'
import moment from 'moment'

export default {
    components:{
      Create, Loading
    },
    created(){
      this.getBarangUser();
    },
    computed: {
      ...mapGetters({
          user : 'auth/user',
          barang : 'barang/baranguser',
          loading : 'loading'
          // errors : 'auth/errors'
      })
    },
    methods:{
      getBarangUser(){
        this.$store.dispatch('barang/getBarangUser').then(() => {}).
        catch(err => {
              console.log(err);
        })
      },
      DateFormat(item) {
        return moment(item).locale('id').format('LLL')
      }
    }
}
</script>
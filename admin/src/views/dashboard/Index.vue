<template>
    <div>
      <pending-modal v-if="pending_kode && pending_img" :kode="pending_kode" :img="pending_img"></pending-modal>
      <navbar></navbar>
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
              <div class="btn btn-danger mb-2"><i class="fas fa-boxes"></i> Jumlah Barang: {{barang.length}}</div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Barang</h3>
                    </div>
                    <div class="card-body" style="display: block;">
                      <template v-if="barang.length == 0">
                        <div class="alert alert-danger">Anda belum menambah barang apapun</div>
                      </template>
                      <template v-else>
                        <table class="table table-striped table-bordered table-hover">
                          <thead class="table-dark">
                            <tr>
                              <th scope="col"><i class="fas fa-box"></i> Nama</th>
                              <th scope="col"><i class="fas fa-boxes"></i> Stok</th>
                              <th scope="col"><i class="fas fa-money-bill"></i> Harga</th>
                              <th scope="col"><i class="fas fa-pencil-alt"></i> Dibuat pada</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in barang" :key="item.id">
                              <td><router-link :to="'/'+item.id">{{item.title}}</router-link></td>
                              <td>{{item.stok}}</td>
                              <td>Rp.{{item.harga}},00</td>
                              <td>{{DateFormat(item.createdAt)}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row my-3">
          <div class="col">
            <div class="alert alert-success">Berikut list barang yang dibelanjakan orang lain, jangan lupa cek bukti pembayarannya!</div>

            <div class="row">
              <div id="list-example" class="list-group col-2">
                <h4 class="d-flex justify-content-center">Status</h4>
                <a class="list-group-item list-group-item-action d-flex justify-content-center" href="#pending">Pending</a>
                <a class="list-group-item list-group-item-action d-flex justify-content-center" href="#accepted">Accepted</a>
              </div>
              <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example col" tabindex="0">
                <div class="row my-3">
                <h4 id="pending">List Pending</h4>
                <template v-if="pending.length == 0">
                  <div class="alert alert-danger">Belum ada barang yang dipesan seseorang :(</div>
                </template>
                <template v-else>
                <table class="table table-striped table-bordered table-hover">
                  <thead>
                      <th>List Barang</th>
                      <th>Total Harga</th>
                      <th>Pembeli</th>
                      <th>Foto Bukti Pembayaran</th>
                      <th>Tanggal barang diterima</th>
                  </thead>
                  <tbody v-for="(items) in pending" :key="items.kode">
                  <td>
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <th>Foto Barang</th>
                            <th>Nama Barang</th>
                            <th>Stok</th>
                            <th>Harga</th>
                        </thead>
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
                      <div>Email : {{items.user.email}}</div>
                      <div>No Telp : {{items.user.phone}}</div>
                      <div>Alamat : {{items.user.alamat}}</div>
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
                  <td>
                      <div><input type="button" data-bs-toggle="modal" data-bs-target="#pendingModal" @click.prevent="getPendingModal(items.kode, items.foto_bukti)" class="btn btn-success w-100" value="Konfirmasi Pembayaran"></div>
                  </td>
                </tbody>
              </table>
              </template>
              </div>
              <div class="row my-3">
                <h4 id="accepted">List Barang Berhasil Diterima</h4>
                <template v-if="accepted.length == 0">
                  <div class="alert alert-danger">Belum ada barang yang berhasil ditransaksi :(</div>
                </template>
                <template v-else>
                <table class="table table-striped table-bordered table-hover">
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
              </template>
              </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </template>
    </div>
</template>

<script>
import appConfig from "../../config/app"
import {mapGetters} from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Create from '@/components/barang/Create.vue'
import pendingModal from '@/components/modal/pendingModal.vue'
import Loading from '@/components/Loading'
import moment from 'moment'

export default {
    setup() {
      return {
        apiURL: appConfig.apiURL,
      }
    },
    data(){
      return{
        pending_kode : null,
        pending_img : null,
      }
    },
    components:{
      Navbar, Create, Loading, pendingModal
    },
    created(){
      this.getBarangUser();
    },
    computed: {
      ...mapGetters({
          user : 'auth/user',
          barang : 'barang/barang',
          accepted : 'accepted',
          pending : 'pending',
          loading : 'loading'
          // errors : 'auth/errors'
      })
    },
    methods:{
      getPendingModal(kode,img){
        this.pending_kode = kode;
        this.pending_img = img;
      },
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
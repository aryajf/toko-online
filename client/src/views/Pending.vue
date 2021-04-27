<template>
    <div>
        <!-- Modal -->
        <pending-modal v-if="pending_kode && pending_img" :kode="pending_kode" :img="pending_img"></pending-modal>
        <div class="container-fluid">
            <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Pending</h3>
                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                        <template v-if="pending.length == 0">
                            <div class="alert alert-danger">Anda belum memesan barang apapun, <router-link to="/">pesan dulu gihh</router-link></div>
                        </template>
                        <template v-else>
                            <div>
                                <div class="alert alert-info">Tunggu sebentar Yaa, Admin akan secepatnya kok cek pembayaran kamu</div>
                                <table class="table table-bordered table-">
                                    <tr>
                                        <th>List Barang</th>
                                        <th>Total Harga</th>
                                        <th>Foto Bukti Pembayaran</th>
                                        <th>Tanggal barang di pending</th>
                                        <th>Konfirmasi Pembelian</th>
                                    </tr>
                                    <tr v-for="(items) in pending" :key="items.kode">
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
                                    <td>
                                        <div><input type="button" data-toggle="modal" @click.prevent="getPendingModal(items.kode, items.foto_bukti)" data-target="#pendingModal" class="btn btn-success w-100" value="Upload ulang bukti pembayaran"></div>
                                    </td>
                                </tr>
                            </table>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import pendingModal from '@/components/modal/pendingModal.vue'
import {mapGetters} from 'vuex'
import appConfig from "../config/app"
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        }
    },
    components:{
     pendingModal
   },
    data(){
        return{
            pending_kode : null,
            pending_img : null,
        }
    },
    computed: {
        ...mapGetters({
            pending : 'pending',
            loading : 'loading'
        })
    },
    methods : {
        getPendingModal(kode,img){
            this.pending_kode = kode;
            this.pending_img = img;
        },
        DateFormat(item) {
          return moment(item).locale('id').format('LLL')
        }
    }
}
</script>
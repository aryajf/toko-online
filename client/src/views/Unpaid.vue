<template>
    <div>
        <!-- Modal -->
        <checkout-modal v-if="unpaid_kode" :kode="unpaid_kode"></checkout-modal>
        <div class="container-fluid">
            <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Menunggu Pembayaran</h3>
                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                        <template v-if="unpaid.length == 0">
                            <div class="alert alert-danger">Anda belum memesan barang apapun, <router-link to="/">pesan dulu gihh</router-link></div>
                        </template>
                        <template v-else>
                            <div>
                                <div class="alert alert-info">Pastikan anda telah mengisi nomor telepon dan alamat anda dengan benar!</div>
                                <table class="table table-bordered table-">
                                    <tr>
                                        <th>List Barang</th>
                                        <th>Total Harga</th>
                                        <th>Foto Bukti Pembayaran</th>
                                        <th>Tanggal barang di checkout</th>
                                        <th>Konfirmasi Pembelian</th>
                                    </tr>
                                    <tr v-for="(items) in unpaid" :key="items.kode">
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
                                        <div class="alert alert-danger">Anda belum mengupload foto bukti pembayaran</div>
                                    </td>
                                    <td>
                                        {{DateFormat(items.createdAt)}}
                                    </td>
                                    <td>
                                        <div><input type="button" data-toggle="modal" @click.prevent="getCheckoutModal(items.kode)" data-target="#checkoutModal" class="btn btn-success w-100" value="Upload bukti pembayaran"></div>
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
import checkoutModal from '@/components/modal/checkoutModal.vue'
import {mapGetters} from 'vuex'
import appConfig from "../config/app"
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        }
    },
    components:{
     checkoutModal
   },
    data(){
        return{
            form : {
                id : null,
                cover : null
            },
            unpaid_kode : null,
        }
    },
    computed: {
        ...mapGetters({
            unpaid : 'unpaid',
            loading : 'loading'
        })
    },
    methods : {
        getCheckoutModal(kode){
            this.unpaid_kode = kode;
        },
        DateFormat(item) {
          return moment(item).locale('id').format('LLL')
        }
    }
}
</script>
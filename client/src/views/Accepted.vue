<template>
    <div>
        <div class="container-fluid">
            <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Barang yang sudah berhasil di terima</h3>
                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                        <template v-if="accepted.length == 0">
                            <div class="alert alert-danger">Anda belum memesan barang apapun, <router-link to="/">pesan dulu gihh</router-link></div>
                        </template>
                        <template v-else>
                            <div>
                                <div class="alert alert-success">Berikut list barang yang sudah anda belanjakan disini, semoga puas yaa belanja disini</div>
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
import {mapGetters} from 'vuex'
import appConfig from "../config/app"
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        }
    },
    components:{
     
   },
    data(){
        return{
            form : {
                id : null,
                cover : null
            },
            accepted_kode : null,
        }
    },
    computed: {
        ...mapGetters({
            accepted : 'accepted',
            loading : 'loading'
        })
    },
    methods : {
        getCheckoutModal(kode){
            this.accepted_kode = kode;
        },
        DateFormat(item) {
          return moment(item).locale('id').format('LLL')
        }
    }
}
</script>
<template>
    <div>
        <!-- Modal -->
    <div class="modal fade" id="buyModal" tabindex="-1" role="dialog" aria-labelledby="buyModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="buyModalLabel">Konfirmasi Pembelian?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Belum..Mau cek lagi</button>
            <button @click="submitBarang" type="button" class="btn btn-success" data-dismiss="modal">Tentu Saja!</button>
        </div>
        </div>
    </div>
    </div>
        <div class="container-fluid">
            <div class="row pt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">List Pembelanjaan</h3>
                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                        <template v-if="cart.length == 0">
                            <div class="alert alert-danger">Anda belum memesan barang apapun, <router-link to="/">pesan dulu gihh</router-link></div>
                        </template>
                        <template v-else>
                            <div>
                                <table class="table table-bordered">
                                    <tr>
                                        <th>Foto Barang</th>
                                        <th><li class="fas fa-box"></li> Nama Barang</th>
                                        <th><li class="fas fa-users"></li> Penjual</th>
                                        <th><li class="fas fa-boxes"></li> Stok</th>
                                        <th><li class="fas fa-money-bill"></li> Harga</th>
                                    </tr>
                                    <tr v-for="(item) in cart" :key="item.id">
                                    <td>
                                        <div class="col-1 d-flex align-items-center"><img :src="apiURL+'images/barang/'+item.barang_cover" style="width:100px" :alt="item.barang_title"></div>
                                    </td>
                                    <td>
                                        <router-link :to="'/'+item.barang_id">{{item.barang_title}}</router-link>
                                    </td>
                                    <td>
                                        {{item.barang_pemilik}}
                                    </td>
                                    <td>
                                        {{item.barang_stok}}
                                    </td>
                                    <td>
                                        Rp.{{item.barang_harga}},00
                                    </td>
                                    <td>
                                        <button @click="removeCart(item.id)" class="btn">
                                        <li style="color:red;" class="fas fa-trash-alt"></li> <span style="color:red;font-weight:bold;"> Hapus</span>
                                        </button>
                                    </td>
                                    </tr>
                                </table>
                                <div class="row">
                                <div class="mt-3 col-7">
                                    <h5>Total Harga : Rp.{{totalHargaCart}},00</h5>
                                </div>
                                <div class="mt-3 col-5">
                                    <button data-toggle="modal" data-target="#buyModal" type="submit" class="btn btn-success btn-block">Pesan!</button>
                                </div>
                                </div>
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
import {mapGetters} from 'vuex'
import appConfig from "../config/app"
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        }
    },
    computed: {
        ...mapGetters({
            cart : 'cart',
            totalHargaCart : 'totalHargaCart',
            loading : 'loading'
        })
    },
    methods : {
        removeCart(id){
            this.$store.dispatch('removeCart', id).then((response) => {
                this.$toast.error(response.data.message)
            })
        },
        submitBarang(){
            this.$store.dispatch('submitCart', {
                total_harga : this.totalHargaCart
            }).then((response) => {
                if(response.status == 200){
                    this.$store.dispatch('clearCart')
                    this.$toast.success(response.data.message)
                }else{
                    this.$toast.error(response.data.message)
                }
            })
        }
    }
}
</script>
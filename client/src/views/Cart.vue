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
                        <template v-if="totalBeli.length == 0">
                            <div class="alert alert-danger">Anda belum memesan barang apapun, <router-link to="/">pesan dulu gihh</router-link></div>
                        </template>
                        <template v-else>
                            <div>
                                <table class="table table-bordered">
                                    <tr>
                                        <th>Barang</th>
                                        <th>Penjual</th>
                                        <th>Total</th>
                                        <th>Hapus</th>
                                    </tr>
                                    <tr v-for="(item) in totalBeli" :key="item.id">
                                    <td>
                                        <router-link :to="'/'+item.id">{{item.title}}</router-link>
                                    </td>
                                    <td>
                                        <li class="fas fa-user"></li> {{item.user_name}}
                                    </td>
                                    <td>
                                        <li class="fas fa-box"></li> {{item.total}}
                                    </td>
                                    <td>
                                        <button @click="removeCart(item.id)" class="btn">
                                        <li style="color:red;" class="fas fa-trash-alt"></li> <span style="color:red;font-weight:bold;"> Hapus</span>
                                        </button>
                                    </td>
                                    </tr>
                                </table>
                                <div class="offset-7 mt-3 col-5">
                                    <button data-toggle="modal" data-target="#buyModal" type="submit" class="btn btn-success btn-block">Pesan!</button>
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
export default {
    computed: {
        ...mapGetters({
            totalBeli : 'totalBeli',
        })
    },
    methods : {
        removeCart(){
            this.$store.dispatch('removeTotalBeli')
            this.$toast.error("Barang berhasil dihapus dari keranjang")
        },
        submitBarang(){
            this.$store.dispatch('submitTotalBeli', this.totalBeli)
            this.$store.dispatch('clearTotalBeli')
            this.$toast.success("Barang berhasil dibeli")
        }
    }
}
</script>
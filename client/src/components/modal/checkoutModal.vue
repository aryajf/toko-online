<template>
    <!-- Modal -->
    <div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="checkoutModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="checkoutModalLabel">Pesan Sekarang!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <input v-model="form.total" type="number" min="1" class="form-control" placeholder="Pesan berapa?">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-box"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div @click="toTheCart" data-dismiss="modal" class="w-100 btn btn-success">Pesan !</div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: ['barang_id'],
    data(){
        return {
            form : {
                id : null,
                total : 1,
                title : '',
                description : '',
                cover : '',
                user_name : '',
            }
        }
    },
    computed: {
        ...mapGetters({
            totalBeli : 'totalBeli',
        })
    },
    mounted(){
        this.getBarang();
    },
    watch : {
        barang_id : function(){
            this.getBarang()
        }
    },
    methods : {
        toTheCart(){
            this.form.total = parseInt(this.form.total)
            this.$store.dispatch('setTotalBeli', this.form)
            this.$toast.success("Barang berhasil ditambahkan ke keranjang")
            this.$router.push({ name: 'Cart'})
        },
        getBarang(){
            this.$store.dispatch('barang/getBarang', this.barang_id).then((response) => {
                this.form.id = response.data.barang.id
                this.form.title = response.data.barang.title
                this.form.description = response.data.barang.description
                this.form.cover = response.data.barang.cover
                this.form.user_name = response.data.barang.user_name
            }).catch(err => {
                console.log(err);
            })
        },
    }
}
</script>
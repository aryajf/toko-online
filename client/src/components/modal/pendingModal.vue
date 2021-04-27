<template>
    <!-- Modal -->
    <div class="modal fade" id="pendingModal" tabindex="-1" role="dialog" aria-labelledby="pendingModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="pendingModalLabel">Upload Bukti Pembayaran!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="confirmUnpaid">
                <div class="input-group mb-3">
                    <template class="form-group" v-if="imagePreview">
                        <img :src="imagePreview" class="img-fluid">
                    </template>
                    <template v-else>
                        <img :src="apiURL+'images/buktiPembayaran/'+img" class="img-fluid" alt="Foto Bukti Pembayaran">
                    </template>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div>
                    <div class="custom-file">
                        <input v-on:change="onImageChange" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" required>
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <div><input type="submit" class="btn btn-success w-100" value="Konfirmasi Pembayaran"></div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import appConfig from "../../config/app"
import $ from 'jquery'
export default {
    props: ['kode','img'],
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    data(){
        return {
            form : {
                foto_bukti : null,
            },
            imagePreview: null
        }
    },
    methods : {
        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.form.foto_bukti = files[0]
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            if(file.type == 'image/x-icon' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/jpeg'){
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }else{
                console.log('ups bro gk bisa ditampilin');
            }
        },
        confirmUnpaid(){
            const data = new FormData()
            data.append('kode', this.kode)
            data.append('foto_bukti', this.form.foto_bukti)
            this.$store.dispatch('submitUnpaid', data).then((response) => {
                if(response.status === 201){
                    this.$toast.success(response.data.message)
                    this.form.foto_bukti = null
                    this.imagePreview = null
                    $('#pendingModal').modal('hide')
                    this.$router.push({ name: 'Pending'})
                }else{
                    this.$toast.error(response.data.message)
                }
            })
        }
    }
}
</script>
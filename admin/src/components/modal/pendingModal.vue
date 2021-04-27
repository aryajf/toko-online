<template>
    <!-- Modal -->
    <div class="modal fade" id="pendingModal" tabindex="-1" aria-labelledby="pendingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="pendingModalLabel">Upload Bukti Pembayaran!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="input-group d-flex justify-content-center mb-3">
                    <template class="form-group" v-if="imagePreview">
                        <img :src="imagePreview" class="img-fluid">
                    </template>
                    <template v-else>
                        <img :src="apiURL+'images/buktiPembayaran/'+img" class="img-fluid" alt="Foto Bukti Pembayaran">
                    </template>
                </div>
            </form>
        </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="confirmPending" class="btn btn-success" data-bs-dismiss="modal">Konfirmasi Pembayaran</button>
          </div>
          </div>
      </div>
    </div>
</template>

<script>
import appConfig from "../../config/app"
export default {
    props: ['kode','img'],
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    methods : {
        confirmPending(){
            console.log(this.kode);
            // this.$store.dispatch('submitAccept', this.kode).then((response) => {
            //     if(response.status === 201){
            //         this.$toast.success(response.data.message)
            //         this.form.foto_bukti = null
            //         this.$router.push({ name: 'Accept'})
            //     }else{
            //         this.$toast.error(response.data.message)
            //     }
            // })
        }
    }
}
</script>
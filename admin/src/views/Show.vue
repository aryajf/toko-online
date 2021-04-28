<template>
<div>
    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Apa kamu yakin menghapus barang ini ?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="deleteBarang" type="button" data-bs-dismiss="modal" class="btn btn-danger">Delete</button>
          </div>
          </div>
      </div>
    </div>
    
    <navbar></navbar>
    <template v-if="loading">
        <loading></loading>
    </template>
    <template v-else>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card my-3">
                    <div class="card-header">
                        <h3 class="card-title">Image Preview</h3>
                    </div>
                    <div class="card-body" style="display: block;">
                        <div class="d-flex justify-content-center" v-if="imagePreview">
                            <img :src="imagePreview" class="img-fluid">
                        </div>
                        <div class="d-flex justify-content-center" v-else>
                            <img :src="apiURL+'images/barang/'+barang.cover" class="img-fluid" :alt="barang.title">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form @submit.prevent="updateBarang">
        <div class="row">
            <div class="col">
                <div class="input-group my-3">
                    <div class="custom-file">
                        <input v-on:change="onImageChange" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" v-model="form.title" class="form-control" placeholder="Nama Barang" required>
                    <div class="input-group-text">
                        <span class="fas fa-shopping-cart"></span>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input min="1" type="number" v-model="form.stok" class="form-control" placeholder="Jumlah Barang" required>
                    <div class="input-group-text">
                        <span class="fas fa-box"></span>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input min="1" type="number" v-model="form.harga" class="form-control" placeholder="Harga Barang" required>
                    <div class="input-group-text">
                        <span class="fas fa-money-bill"></span>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="input-group my-3">
                    <textarea rows="4" v-model="form.description" class="form-control" placeholder="Deskripsi Barang" required>
                    </textarea>
                    <div class="input-group-text">
                        <span class="fas fa-pencil-alt"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col">
                <input class="w-100 p-3 btn btn-primary" type="submit" value="Update">
            </div>
        </div>
        </form>
        <div class="row pb-3">
            <div class="col-8">
                <div class="w-100 p-3 alert alert-danger" role="alert">
                    Hapus barang --->>
                </div>
            </div>
            <div class="col">
                <button data-bs-toggle="modal" data-bs-target="#deleteModal" class="w-100 p-3 btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
    </template>
</div>
</template>

<script>
import appConfig from "../config/app"
import {mapGetters} from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Loading from '@/components/Loading'
export default {
  name: 'Home',
  setup() {
    return {
        apiURL: appConfig.apiURL,
    };
  },
  components:{
    Navbar,Loading
  },
  created(){
    this.getBarang();
  },
  data(){
        return{
            form : {
                title: '',
                description : '',
                stok : 1,
                harga : 1,
                image : null
            },
            barang_id : null,
            imagePreview: null
        }
    },
  computed: {
    ...mapGetters({
        barang : 'barang/barang',
        user : 'auth/user',
        authenticated : 'auth/authenticated',
        loading : 'loading'
    })
  },
  watch: {
        $route() {
            this.getBarang()
        }
    },
    methods:{
        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.form.image = files[0]
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
        updateBarang(){
            const data = new FormData()
            data.append('cover', this.form.image)
            data.append('title', this.form.title)
            data.append('stok', this.form.stok)
            data.append('harga', this.form.harga)
            data.append('description', this.form.description)
            let credentials = {form: data, id : this.$route.params.id}
            this.$store.dispatch('barang/updateBarang', credentials).then((response) => {
                if(response.status === 200){
                    this.$toast.success(response.data.message)
                    this.$router.push({name: 'Dashboard'})
                }else{
                    this.$toast.error(response.data.message)
                }
            })
        },
        getBarang(){
            this.$store.dispatch('barang/getBarang', this.$route.params.id).then((response) => {
                let barang = response.data.barang
                this.form.title = barang.title
                this.form.description = barang.description
                this.form.stok = barang.stok
                this.form.harga = barang.harga
                this.form.image = barang.cover
            }).catch(err => {
                console.log(err)
            })
        },
        deleteBarang(){
            this.$store.dispatch('barang/deleteBarang', this.$route.params.id).then((response) => {
                if(response.status === 200){
                    this.$toast.success(response.data.message)
                    this.$router.push({ name: 'Dashboard'})
                }else{
                    this.$toast.error(response.data.message)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

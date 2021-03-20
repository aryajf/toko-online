<template>
<div>
     <!-- Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Apa kamu yakin menghapus barang ini ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="deleteBarang" type="button" class="btn btn-danger">Delete</button>
                </div>
              </div>
          </div>
        </div>
    <div class="container">
        <div v-if="!authenticated">
            <div class="row">
                <div class="col">
                    <div class="card my-3">
                        <div class="card-header">
                            <h3 class="card-title">Image Preview</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                <i class="fas fa-minus"></i></button>
                            </div>
                        </div>
                        <div class="card-body" style="display: block;">
                            <div class="d-flex justify-content-center">
                                <img :src="apiURL+'images/barang/'+barang.cover" class="img-fluid" :alt="barang.title">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="row">
            <div class="col">
                <h1 class="py-4">{{barang.title}}</h1>
                <p>{{barang.description}}</p>
            </div>
        </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col">
                    <div class="card my-3">
                        <div class="card-header">
                            <h3 class="card-title">Image Preview</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                <i class="fas fa-minus"></i></button>
                            </div>
                        </div>
                        <div class="card-body" style="display: block;">
                            <div class="d-flex justify-content-center" v-if="imagePreview">
                                <img :src="imagePreview" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-group my-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
            </div>
            <div class="custom-file">
                <input v-on:change="onImageChange" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
            </div>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control my-3" :value="barang.title">
                <textarea rows="8" class="form-control my-3" v-model="barang.description"></textarea>
            </div>
        </div>
            <div class="row">
                <div class="col-10">
                    <button class="w-100 p-3 btn btn-primary">Update</button>
                </div>
                <div class="col">
                    <button data-toggle="modal" data-target="#deleteModal" class="w-100 p-3 btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import appConfig from "../config/app"
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
  mounted(){
    this.getBarang();
  },
  data(){
        return{
            form : {
                title: '',
                description : '',
                image : null
            },
            imagePreview: null
        }
    },
  computed: {
    ...mapGetters({
        barang : 'barang/barang',
        user : 'auth/user',
        authenticated : 'auth/authenticated'
    })
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
            data.append('description', this.form.description)
            this.$store.dispatch('barang/updateBarang', data).then((response) => {
                console.log(response);
                if(response.status === 200){
                    this.$toast.success(response.data.message)
                }else{
                    this.$toast.error(response.data.message)
                }
            })
        },
        getBarang(){
            this.$store.dispatch('barang/getBarang', this.$route.params.id).then((response) => {
              console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

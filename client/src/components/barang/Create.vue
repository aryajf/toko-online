<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Tambah Barang</h3>

            <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i class="fas fa-minus"></i></button>
            </div>
        </div>
        <div class="card-body" style="display: block;">
        <form @submit.prevent="createBarang">
            <div class="input-group mb-3">
                <input type="text" v-model="form.title" class="form-control" placeholder="Nama Barang" required>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-shopping-cart"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <textarea v-model="form.description" class="form-control" placeholder="Deskripsi Barang" required>
                </textarea>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-pencil-alt"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input min="1" type="number" v-model="form.total" class="form-control" placeholder="Jumlah Barang" required>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-box"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="form-group" v-if="imagePreview">
                    <img :src="imagePreview" class="img-fluid">
                </div>
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
            <div class="offset-8 col-4">
                <button type="submit" class="btn btn-success btn-block">Create</button>
            </div>
        </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form : {
                title: '',
                description : '',
                total : 1,
                image : null
            },
            imagePreview: null
        }
    },
    methods: {
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
        createBarang(){
            const data = new FormData()
            data.append('cover', this.form.image)
            data.append('title', this.form.title)
            data.append('total', this.form.total)
            data.append('description', this.form.description)
            this.$store.dispatch('barang/createBarang', data).then((response) => {
                console.log(response);
                if(response.status === 201){
                    this.$toast.success(response.data.message)
                    this.form.image = null
                    this.imagePreview = null
                    this.form.title = ''
                    this.form.description = ''
                }else{
                    this.$toast.error(response.data.message)
                }
            })
        }
    },
}
</script>
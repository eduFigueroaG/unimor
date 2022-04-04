<template>
  <div class="container">
    <v-form>
      <v-card rounded elevation="3">
        <input @input="pickPhoto('photo1')" type="file" ref="file" style="display: none">

        <div v-for="(item, index) in photos" :key="index" style="display: none">
          {{item.name}}
        </div>
        <v-card-subtitle class="primary white--text">
          <v-icon color="white">mdi-image</v-icon> IMAGENES DE LA EMPRESA
        </v-card-subtitle>
        <v-card-text v-if="photos.length===0">
          <h3 class="mt-5 text-center">Sin imagenes de la empresa</h3>
        </v-card-text>
          <v-card-text v-else>
            <v-carousel class="mt-3" hide-delimiters>
              <v-carousel-item
                  v-for="(item,index) in photos"
                  :key="index"
                  :src="baseURL+'company/photo/img/'+item.name"
              ></v-carousel-item>
            </v-carousel>
            <v-row justify="center" class="mt-3">
              <v-col sm="12" md="4" lg="4">

<!--                <v-img @click="$refs.file.click()"  src="@/assets/no_image.png" v-if="!photo.status" />
                <div @click="$refs.file.click()"  v-else class="imagePreviewWrapper mt-5"
                     :style="{ 'background-image': `url(${photo.preview})` }"></div>-->
              </v-col>
            </v-row>
          </v-card-text>
        <v-card-actions class="mt-3 mb-5">
          <v-spacer></v-spacer>
          <v-btn class="mb-5" to="/admin/companies" text> VOLVER</v-btn>
          <v-btn class="mb-5" @click="$refs.file.click()" color="secondary">SUBIR FOTO</v-btn>
          <v-btn class="mb-5" color="primary" @click="changeDialog">LISTA DE IMAGENES</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 text-center justify-center primary white--text"> <v-icon color="white">mdi-image</v-icon>
            Imagenes de la empresa</v-card-title>
          <v-card-text class=" text-center mt-4">
            <div v-for="(item, index) in photos" :key="index">
              <div class="mb-4">
                <v-img
                    style="object-fit: cover"
                    :src="baseURL+'company/photo/img/'+item.name"
                ></v-img>
                <v-btn tab text color="red" @click="deletePhoto(item.id)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                  ELIMINAR FOTO
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="changeDialog">Cerrar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>
<script>
import { adminMixin } from "@/modules/admin/mixins";
import axios from "@/plugins/axios";
import Config from "@/config/baseUrl";
export default {
  mixins: [adminMixin],
  data(){
    return{
      baseURL:  Config.baseURL(),

      dialog: false,
      base: Config.baseURL(),
      photo:{
        status: false,
        preview: null,
        data: null
      },
      photos: [],
    }
  },
  methods:{
    pickPhoto () {
      this.photo.status = true
      let input = this.$refs.file
      let file = input.files
      this.photo.data = file[0]
      if(this.photo.data.type.includes("image")){
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.photo.preview = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
          this.updateCompanyPhotos(this.photo.data,this.$route.params.id)
          window.location.reload()
          this.getPhotosByCompany(this.$route.params.id)
        }
      }else{
        this.profilePicture = null
        input = null
        this.photo = false
      }
    },
    getPhotosByCompany(id){
      this.photos = []
      axios.get('company/photos/find/'+id)
      .then(res=>{
        console.log(res)
        if (res.data.status){
          this.photos = res.data.data
        }
      })
      .catch(err=>{
        console.log(err.response)
      })
    },
    changeDialog(){
      this.getPhotosByCompany(this.$route.params.id)
      this.dialog = !this.dialog
    },
    deletePhoto(id){
      this.deletePhotoCompany(id, this.$route.params.id)
      window.location.reload()
    }
  },
  mounted() {
    this.base = Config.baseURL()
    this.getPhotosByCompany(this.$route.params.id)
    console.log(this.base)
  }
}
</script>
<style scoped>
p{
  font-size: 19px!important;
}
.imagePreviewWrapper {
  border-radius: 5px!important;
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>

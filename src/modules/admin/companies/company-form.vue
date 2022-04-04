<template>
  <div class="container">
    <v-form @submit.stop.prevent="onSubmit">
      <v-card rounded elevation="3">
        <v-card-subtitle class="primary white--text">
          <v-icon color="white">mdi-domain</v-icon> {{action}} EMPRESA
        </v-card-subtitle>
<!--        <v-card-text>
          <v-row justify="center" class="mt-3">
            <v-col sm="2" md="2" lg="2">
              <v-img @click="$refs.file.click()"  src="@/assets/no_image.png" v-if="!photo1.status" />
              <div @click="$refs.file.click()"  v-else class="imagePreviewWrapper mt-5" :style="{ 'background-image': `url(${photo1.preview})` }"></div>
              <input @input="pickPhoto('photo1')" type="file" ref="file" style="display: none">
            </v-col>
            <v-col sm="2" md="2" lg="2">
              <v-img @click="$refs.file2.click()"  src="@/assets/no_image.png" v-if="!photo2.status" />
              <div @click="$refs.file2.click()"  v-else class="imagePreviewWrapper mt-5" :style="{ 'background-image': `url(${photo2.preview})` }"></div>
              <input @input="pickPhoto('photo2')" type="file" ref="file2" style="display: none">
            </v-col>
            <v-col sm="2" md="2" lg="2">
              <v-img @click="$refs.file3.click()"  src="@/assets/no_image.png" v-if="!photo3.status" />
              <div @click="$refs.file3.click()"  v-else class="imagePreviewWrapper mt-5" :style="{ 'background-image': `url(${photo3.preview})` }"></div>
              <input @input="pickPhoto('photo3')" type="file" ref="file3" style="display: none">
            </v-col>
            <v-col sm="2" md="2" lg="2">
              <v-img @click="$refs.file4.click()"  src="@/assets/no_image.png" v-if="!photo4.status" />
              <div @click="$refs.file4.click()"  v-else class="imagePreviewWrapper mt-5" :style="{ 'background-image': `url(${photo4.preview})` }"></div>
              <input @input="pickPhoto('photo4')" type="file" ref="file4" style="display: none">
            </v-col>
            <v-col sm="2" md="2" lg="2">
              <v-img @click="$refs.file5.click()"  src="@/assets/no_image.png" v-if="!photo5.status" />
              <div @click="$refs.file5.click()"  v-else class="imagePreviewWrapper mt-5" :style="{ 'background-image': `url(${photo5.preview})` }"></div>
              <input @input="pickPhoto('photo5')" type="file" ref="file5" style="display: none">
            </v-col>
          </v-row>
        </v-card-text>-->
        <v-card-text class="mt-10">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                  required
                  outlined
                  :items="items"
                  item-text="name"
                  item-value="id"
                  label="Categoria"
                  @change="setValue('category', $event)"
                  :value="form.category"
                  :state="validateState('category')"
                  :error-messages="getErrors('category', $v.form.category)"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="12"
                md="6">
              <v-text-field
                  outlined
                  label="Nombre de la empresa"
                  placeholder="Nombre de la empresa"
                  required
                  prepend-inner-icon="mdi-domain"
                  @change="setValue('name', $event)"
                  :value="form.name"
                  :state="validateState('name')"
                  :error-messages="getErrors('name', $v.form.name)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="6">
              <v-text-field
                  minlength="10"
                  maxlength="10"
                  outlined
                  label="Número de telefono"
                  placeholder="Número de telefono"
                  required
                  prepend-inner-icon="mdi-phone"
                  @change="setValue('phone', $event)"
                  :value="form.phone"
                  :state="validateState('phone')"
                  :error-messages="getErrors('phone', $v.form.phone)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="6">
              <v-text-field
                  outlined
                  label="Latitud"
                  placeholder="Latitud"
                  required
                  prepend-inner-icon="mdi-map-marker"
                  @change="setValue('latitude', $event)"
                  :value="form.latitude"
                  :state="validateState('latitude')"
                  :error-messages="getErrors('latitude', $v.form.latitude)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="6">
              <v-text-field
                  outlined
                  label="Altitud"
                  placeholder="Altitud"
                  required
                  prepend-inner-icon="mdi-map-marker"
                  @change="setValue('altitude', $event)"
                  :value="form.altitude"
                  :state="validateState('altitude')"
                  :error-messages="getErrors('altitude', $v.form.altitude)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12">
              <v-textarea
                  outlined
                  label="Descripción"
                  placeholder="Descripción"
                  required
                  prepend-inner-icon="mdi-text"
                  @change="setValue('description', $event)"
                  :value="form.description"
                  :state="validateState('description')"
                  :error-messages="getErrors('description', $v.form.description)"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-3 mb-5">
          <v-spacer></v-spacer>
          <v-btn class="mb-5" to="/admin/companies" text> VOLVER</v-btn>
          <v-btn v-if="action==='ACTUALIZAR'" color="secondary" class="mb-5" :to="'/admin/companies/photos/'+this.form.id"> IMAGENES</v-btn>
          <v-btn class="mb-5"  type="submit" color="primary">
            {{action}} EMPRESA
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import { required,numeric,maxLength,minLength } from "vuelidate/lib/validators";
import { adminMixin } from "@/modules/admin/mixins";
import axios from "@/plugins/axios";

export default {
  mixins: [adminMixin],
  data(){
    return{
      action: 'REGISTRAR',
      pictures: [],
      items: [],
      form:{
        id: null,
        name: null,
        phone: null,
        latitude: null,
        altitude: null,
        description: null,
        category: {
          id:null,
          name: ''
        },
        photos: [],
        comments: []
      },
    }
  },
  validations:{
    form:{
      name:{required},
      phone: {numeric, maxLength: maxLength(10), minLength: minLength(10)},
      latitude: {required},
      altitude: {required},
      description:{required},
      category: {required}
    }
  },
  methods:{
    onSubmit(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.action==='REGISTRAR'){
        this.onCompanySave(this.form)
      }else{
        console.log(this.form)
        this.companyUpdate(this.form)
      }
    },
    pickPhoto (name) {
      let input;
      switch (name){
        case 'photo1':
          input = this.$refs.file
          this.photo1.status = true
          break
        case 'photo2':
          input = this.$refs.file2
          this.photo2.status = true
          break
        case 'photo3':
          input = this.$refs.file3
          this.photo3.status = true
          break
        case 'photo4':
          input = this.$refs.file4
          this.photo4.status = true
          break
        case 'photo5':
          input = this.$refs.file5
          this.photo5.status = true
          break
      }
      let file = input.files
        if (file && file[0] && (file[0].type.includes('image'))) {
          let reader = new FileReader
          reader.onload = e => {
            switch (name){
              case 'photo1':
                this.photo1.preview = e.target.result
                this.photo1.data = file[0]
                break
              case 'photo2':
                this.photo2.preview = e.target.result
                this.photo2.data = file[0]
                break
              case 'photo3':
                this.photo3.preview = e.target.result
                this.photo3.data = file[0]
                break
              case 'photo4':
                this.photo4.preview = e.target.result
                this.photo4.data = file[0]
                break
              case 'photo5':
                this.photo5.preview = e.target.result
                this.photo5.data = file[0]
                break
            }
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }else{
          input = null
          switch (name){
            case 'photo1':
              this.photo1.status = false
              break
            case 'photo2':
              this.photo2.status = false
              break
            case 'photo3':
              this.photo3.status = false
              break
            case 'photo4':
              this.photo4.status = false
              break
            case 'photo5':
              this.photo5.status = false
              break
          }
        }
    },
    findCompanyById(id){
      axios.get('company/find/'+id)
      .then(res=>{
        console.log(res)
        if(res.data.status){
          this.action= 'ACTUALIZAR'
          this.form.id = res.data.data.id
          this.form.name = res.data.data.name
          this.form.phone = res.data.data.phone
          this.form.altitude = res.data.data.altitude
          this.form.latitude = res.data.data.latitude
          this.form.description = res.data.data.description
          this.form.category = res.data.data.category
          this.form.photos = res.data.data.photos
          this.form.comments = res.data.data.comments
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    companyUpdate(form){
      axios.post('company/update', form)
      .then(res=>{
        console.log(res)
        if (res.data.status){
          this.onSuccess("Se actualizo correctamente")
          this.$router.push({name:'admin.companies'})
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getCategories()
    if (this.$route.params.id){
      this.findCompanyById(this.$route.params.id)
    }
  }
}
</script>
<style scoped>
p{
  font-size: 19px!important;
}
.imagePreviewWrapper {
  border-radius: 5px!important;
  width: 150px;
  height: 150px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>

<template>
  <div class="container">
    <v-form @submit.stop.prevent="onSubmit">
      <v-card rounded elevation="3">
        <v-card-subtitle class="primary white--text">
          <v-icon color="white">mdi-account</v-icon> INFORMACIÓN DE PERFIL
        </v-card-subtitle>
        <v-card-text >
          <v-row>
            <v-col
                cols="12"  >
              <div class="text-center mb-5 mt-5" v-if="form.photo===''">
                <img
                    alt=""
                    width="150"
                    height="150"
                    src="@/assets/user.png"
                >
              </div>
              <div class="text-center mb-5 mt-5" v-else>
                <img
                    style="border-radius: 125px"
                    alt=""
                    width="150"
                    height="150"
                    :src="baseURL+'company/photo/img/'+form.photo"
                >
              </div>
              <div v-else class="imagePreviewWrapper mt-5 rounded" :style="{ 'background-image': `url(${previewImage})` }">
              </div>
              <v-col cols="12" align-self="center">
                <div class="text-center mb-3">
                  <input @input="pickPhoto" type="file" ref="file"
                         style="display: none">
                  <v-btn color="secondary" outlined @click="$refs.file.click()">SUBIR FOTO</v-btn>
                </div>
              </v-col>
            </v-col>
            <v-col
                cols="12"
                md="4">
              <v-text-field
                  :disabled="!edit"
                  outlined
                  label="Nombre"
                  placeholder="Nombre"
                  required
                  prepend-inner-icon="mdi-account-box"
                  @change="setValue('name', $event)"
                  :value="form.name"
                  :state="validateState('name')"
                  :error-messages="getErrors('name', $v.form.name)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4">
              <v-text-field
                  :disabled="!edit"
                  outlined
                  label="Primer apellido"
                  placeholder="Primer apellido"
                  required
                  prepend-inner-icon="mdi-account-box"
                  @change="setValue('lastname', $event)"
                  :value="form.lastname"
                  :state="validateState('lastname')"
                  :error-messages="getErrors('lastname', $v.form.lastname)"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4">
              <v-text-field
                  :disabled="!edit"
                  outlined
                  label="Segundo apellido"
                  placeholder="Segundo apellido"
                  required
                  prepend-inner-icon="mdi-account-box"
                  @change="setValue('surname', $event)"
                  :value="form.surname"
                  :state="validateState('surname')"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4">
              <v-text-field
                  disabled
                  outlined
                  label="Correo electronico"
                  placeholder="Correo electronico"
                  required
                  prepend-inner-icon="mdi-email"
                  @change="setValue('email', $event)"
                  :value="form.email"
                  :state="validateState('email')"
                  :error-messages="getErrors('email', $v.form.email)"
              ></v-text-field>
            </v-col>
<!--            <v-col
                cols="12"
                md="4">
              <v-text-field
                  background-color="white"
                  outlined
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="Contraseña"
                  placeholder="Contraseña"
                  @click:append="show = !show"
                  prepend-inner-icon="mdi-lock"
                  @change="setValue('password', $event)"
                  :value="form.password"
                  :state="validateState('password')"
                  :error-messages="getErrors('password', $v.form.password)"
              ></v-text-field>
            </v-col>-->
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-3 ">
          <v-spacer></v-spacer>
          <v-btn outlined color="secondary" @click="edit=!edit"> EDITAR DATOS</v-btn>
          <v-btn  type="submit" color="primary" :disabled="!edit">
            GUARDAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { authMixin } from "@/modules/auth/mixins";
import axios from "@/plugins/axios";
import Config from "@/config/baseUrl";

export default {
  name: "authLogin",
  mixins: [authMixin],
  data () {
    return{
      baseURL:  Config.baseURL(),
      userId: null,
      edit: false,
      show: false,
      role: null,
      form:{
        id:null,
        name: null,
        lastname: null,
        surname: null,
        email: null,
        photo: '',
        password: null,
      },
      photo: false,
      profilePicture: null,
      previewImage: null
    }
  },
  validations:{
    form:{
      name:{
        required
      },
      lastname:{
        required
      },
      surname:{},
      email: {},
      photo:{},
      password: {}
    }
  },
  methods:{
    onSubmit(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const form = {
        id: this.form.id,
        email: this.form.email,
        password: this.form.password,
        person: {
          name: this.form.name,
          lastname: this.form.lastname,
          surname: this.form.surname
        },
        role: this.role,
        photo: this.form.photo,
        status: true,
      }
      console.log("Update User ->", form)
      this.updateUser(form)
    },
    pickPhoto () {
      this.photo = true
      let input = this.$refs.file
      let file = input.files
      this.profilePicture = file[0]
      if(this.profilePicture.type.includes("image")){
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
          this.updateProfilePhoto(file[0])
          window.location.reload()
        }
      }else{
        this.profilePicture = null
        input = null
        this.photo = false
      }
    },
    findUserByToken(){
      axios.get('user/valid')
          .then(res=>{
            console.log(res)
            if (res.data.data===null){
              this.$router.push({name: 'Home'})
            }
            if (res.data.status){
              this.form.id = res.data.data.id
              this.form.name = res.data.data.person.name
              this.form.lastname = res.data.data.person.lastname
              this.form.surname = res.data.data.person.surname
              this.form.email = res.data.data.email
              this.form.photo =  res.data.data.photo
              this.form.password = res.data.data.password
              this.role = res.data.data.role
            }
          }).catch(err=>{
        console.log(err)
      })
    },
    updateProfilePhoto(photo){
      console.log({photo})
      let formData = new FormData();
      if (photo!=null){
        formData.append("profile", photo);
      }
      axios.post("user/profile/update",formData,{
        headers:{
          'content-type': 'multipart/form-data'
        }
      }).then(res=>{
        if(res.data.status){
          this.onSuccess("La imagen se cargo correctamente")
        }
      }).catch(err=>{
        this.onError("Ocurrio un error al subir la imagen")
      })
    },
    updateUser(form){
      axios.put('user/update',form)
      .then(res=>{
        console.log(res)
        if (res.data.status){
          this.edit = !this.edit
          this.findUserByToken()
          this.onSuccess("Datos actualizados correctamente")
        }
      })
      .catch(err=>{

      })
    }
  },
  mounted() {
    this.findUserByToken()
  }
}
</script>
<style scoped>
p{
  font-size: 19px!important;
}
.imagePreviewWrapper {
  border-radius: 125px!important;
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>

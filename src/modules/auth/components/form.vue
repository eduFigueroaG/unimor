<template>
  <div class="container">
    <v-form @submit.stop.prevent="onSubmit">
        <v-card rounded elevation="3">
        <v-card-subtitle class="primary white--text">
          <v-icon color="white">mdi-account</v-icon> REGISTRO
        </v-card-subtitle>
        <v-card-text >
         <v-row>
           <v-col
               cols="12"  >
             <div class="text-center mb-5 mt-5" v-if="!photo">
               <img
                   alt=""
                   width="150"
                   height="150"
                   src="@/assets/user.png"
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
           <v-col
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
           </v-col>
         </v-row>
        </v-card-text>
        <v-card-actions class="mt-3 ">
          <v-spacer></v-spacer>
          <v-btn to="/auth/login" outlined color="secondary"> Inicio de sesión</v-btn>
          <v-btn  type="submit" color="primary">
            REGISTRAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { authMixin } from "@/modules/auth/mixins";

export default {
  name: "authLogin",
  mixins: [authMixin],
  data () {
    return{
      show: false,
      form:{
        name: null,
        lastname: null,
        surname: null,
        email: null,
        password: null,
        photo: null
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
      email: {
        required,
        email
      },
      password: {
        required
      },
      photo:{}
    }
  },
  methods:{
    onSubmit(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const form = {
        email: this.form.email,
        password: this.form.password,
        person: {
          name: this.form.name,
          lastname: this.form.lastname,
          surname: this.form.surname
        },
        role:{
          id: 2
        },
        photo: ''
      }
      console.log("New User ->", form)
      this.onSaveUser(form)
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
        }
      }else{
        this.profilePicture = null
        input = null
        this.photo = false
      }
    }
  },
  mounted() {
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

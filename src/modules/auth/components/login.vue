<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="mt-3">
        <div class="text-center">
          <img src="@/assets/unimor.jpg" width="141" height="141" alt="logo"
               class="">
        </div>
      </v-col>
    </v-row>
    <v-form @submit.stop.prevent="onSubmit">
      <v-row justify="center">
        <v-col cols="12 text-center mt-5">
          <p class="font-weight-light">
            Bienvenido a U N I M O R
          </p>
        </v-col>
        <v-col sm="8" md="5" lg="4">
          <v-text-field
              background-color="white"
              outlined
              label="Correo electronico"
              placeholder="Correo eletronico"
              prepend-inner-icon="mdi-email"
              @change="setValue('email', $event)"
              :value="form.email"
              :state="validateState('email')"
              :error-messages="getErrors('email', $v.form.email)"
          ></v-text-field>
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
          <v-btn @click="onSubmit" block color="primary" >INICIAR SESIÓN</v-btn>
          <v-btn to="/auth/form" block  text>¿NO TIENES UNA CUENTA? REGISTRATE</v-btn>
<!--
          <v-btn to="/auth/forgot" block  text>OLVIDE MI CONTRASEÑA</v-btn>
-->
        </v-col>
      </v-row>
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
      token: null,
      show: false,
      form:{
        email: null,
        password: null
      }
    }
  },
  validations:{
    form:{
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods:{
    onSubmit(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log("Login ->", this.form)
      this.onLogin(this.form)
    },
  },
  mounted() {
    localStorage.clear()
  }
}
</script>
<style scoped>
p{
  font-size: 19px!important;
}
</style>

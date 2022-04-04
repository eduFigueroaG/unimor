<template>
  <header>
    <v-navigation-drawer
        v-model="drawer"
        app
        color="secondary"
        class="bar-color shadow-drawer"
        :width="220"
        disable-resize-watcher>
      <v-col cols="12" class="text-center mt-3 bor-bot">
        <h3 class=" mb-3"><v-icon color="white">mdi-view-dashboard</v-icon> U N I M O R</h3>
      </v-col>
      <v-list
          nav
          class="white--text">
        <v-list-item-group
            v-model="selectedItem">
          <v-list-item active-class="teal lighten-2 white--text" v-for="(item, index) in options" :key="index" :to="item.path">
            <v-list-item-icon>
              <v-icon color="white">{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">{{item.name}}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="token" >
            <v-list-item-icon>
              <v-icon color="white">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title  @click="logout" class="white--text">Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="primary"
        dark
        elevation="5"
        fixed
        >
      <v-app-bar-nav-icon class="d-inline d-sm-inline d-md-none d-lg-none" color="white" @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-avatar :tile="true">
        <v-img src="@/assets/logopng.png"  max-height="40" max-width="40" alt="app-bar-logo" contain></v-img>
      </v-avatar>
      <v-toolbar-title class="d-none d-sm-none d-md-inline d-lg-inline">U N I M O R</v-toolbar-title>
      <div class="d-none d-sm-none d-md-inline d-lg-inline ml-2" v-if="role!=='Admin'">
        <v-btn rounded text to="/unimor/companies">
          <v-icon>mdi-home</v-icon>
          Principal
        </v-btn>
      </div>
      <div class="d-none d-sm-none d-md-inline d-lg-inline ml-2 mr-1" v-if="role!=='Admin'">
          <v-btn to="/unimor/top" rounded text>
            <v-icon>mdi-star</v-icon>
            Top 5
          </v-btn>
      </div>
<!--      <div style="width: 250px!important;" v-if="role!=='Admin'">
        <v-text-field  prepend-inner-icon="mdi-magnify" background-color=""
            dense filled rounded placeholder="Buscar" hide-details single-line></v-text-field>
      </div>-->

      <v-spacer></v-spacer>
      <div class="d-none d-sm-none d-md-inline d-lg-inline" v-if="!token">
        <v-btn
            to="/auth/login"
            text
            color="white">
          <v-icon>mdi-login</v-icon>
          Iniciar sesión
        </v-btn>
      </div>
      <div class="d-none d-sm-none d-md-inline d-lg-inline" v-if="role!=='Admin' && token">
      <v-btn
          to="/profile/info"
          text
          color="white">
        <v-icon>mdi-account-circle</v-icon>
        Perfil
      </v-btn>
      </div>
      <div class="d-none d-sm-none d-md-inline d-lg-inline" v-if="role!=='Admin' && token">
        <v-btn
            to="/profile/fav"
            text
            color="white">
          <v-icon>mdi-star</v-icon>
          Mis favoritos
        </v-btn>
      </div>
      <div class="d-none d-sm-none d-md-inline d-lg-inline" v-if="token">
        <v-btn
            @click="logout"
            text
            color="white">
          <v-icon>mdi-exit-to-app</v-icon>
          Cerrar sesión
        </v-btn>
      </div>
      <span></span>
    </v-app-bar>

  </header>
</template>
<script>
import axios from "@/plugins/axios";
import {admin, publicUser, user} from '@/layouts/components/menu'
export default {
  name: "Site-navbar",
  data: () => ({
    token: null,
    role: null,
    selectedItem: 1,
    drawer: false,
    group: null,
    admin: admin,
    options: [],
    user: user,
    mainMenu: [],
    publicUser: publicUser
  }),
  methods:{
    tokenValid(){
      this.token = localStorage.getItem("access-token")
      this.role = localStorage.getItem("role")
      if (this.role ==='Admin'){
        this.options = admin
      }
      else if (this.role ==='User'){
        this.options = user
      }
      else{
        this.options = publicUser
      }
    },
    logout(){
      localStorage.clear()
      window.location.reload()
      this.$router.push({path: '/'})
    }
  },
  mounted() {
    this.tokenValid()
  }
}
</script>
<style scoped>
h3{
  color: white;
}
.bar-color{
  background-color: #00AB84!important;
  color: white!important;
}
.shadow-drawer{
  -webkit-box-shadow: 5px 0px 10px -5px rgba(166,166,166,1);
  -moz-box-shadow: 5px 0px 10px -5px rgba(166,166,166,1);
  box-shadow: 5px 0px 10px -5px rgba(166,166,166,1);
}
</style>

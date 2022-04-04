import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/modules/auth/store";
import admin from "@/modules/admin/store";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    admin
  }
})

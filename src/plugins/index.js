import Vue from "vue";
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Toast, {
    transition: "Vue-Ratification__bounce",
    maxToasts: 20,
    newestOnTop: true
});
Vue.use(Vuelidate);

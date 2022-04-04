import { mapActions } from "vuex";
import axios from "@/plugins/axios";

const adminMixin = {
    methods: {
        ...mapActions("admin", {
            companySave: "companySave",
        }),
        setValue(key, value) {
            if (key ==='category'){
                this.form.category.id = value
            }else{
                this.form[key] = value;
                this.$v.form[key].$touch();
            }
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        getErrors(name, model) {
            const errors = [];
            if (!model.$dirty) return errors;
            switch (name) {
                case "name":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "phone":
                    !model.maxLength && errors.push("Ingrese un número valido");
                    !model.minLength && errors.push("Ingrese un número valido");
                    !model.numeric && errors.push("Datos incorrectos");
                    break;
                case "latitude":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "altitude":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "description":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "category":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                default:
                    break;
            }
            return errors;
        },
        onSuccess(message){
            this.$toast.success(message, {
                position: "top-right",
                timeout: 1500,
                closeOnClick: true,
                draggable: true,
                draggablePercent: 0.8,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: "fas fa-check-circle",
                rtl: false
            });
        },
        onError(message){
            this.$toast.error(message, {
                position: "top-right",
                timeout: 1000,
                closeOnClick: true,
                draggable: true,
                draggablePercent: 0.8,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: "fas fa-exclamation-triangle",
                rtl: false
            });
        },
        getCategories(){
            axios.get('category/all')
                .then(res=>{
                    this.items =res.data.data
                })
                .catch(err=>{

                })
        },
        onCompanySave(payload){
            console.log(payload)
            this.companySave(payload)
                .then(res => {
                    console.log(res)
                    if (res.data.status){
                        this.onSuccess("Regitro exitoso!")
                        this.$router.push({name: 'admin.companies.photos',params: {id: res.data.data.id}});
                    }else this.onError(res.data.message)
                })
                .catch(err => {
                    console.log(err.response)
                });
        },
        updateCompanyPhotos(file, id){
            console.log({file, id})
            let formData = new FormData();
            if (file!=null){
                formData.append("id", id);
                formData.append("file", file);
            }
            axios.post('company/photo/update',formData,{
                headers:{
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err.response)
                })
        },
        deletePhotoCompany(photo, id){
            console.log({photo, id})
            axios.delete('company/photo/delete/'+photo+'/'+id)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err.response)
                })
        }
    }
}
export { adminMixin };

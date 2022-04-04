import { mapActions } from "vuex";
import axios from "@/plugins/axios";

const authMixin = {
    methods: {
        ...mapActions("auth", {
            login: "login",
            forgot: "forgot",
            saveUser: "saveUser"
        }),
        resetUserForm(){
            this.form.name = null
            this.form.lastname = null
            this.form.surname = null
            this.form.email = null
            this.form.password = null
            this.photo = false
            this.profilePicture = null
            this.previewImage = null
        },
        setValue(key, value) {
            this.form[key] = value;
            this.$v.form[key].$touch();
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        getErrors(name, model) {
            const errors = [];
            if (!model.$dirty) return errors;
            switch (name) {
                case "password":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "email":
                    !model.required && errors.push("Este campo es requerido");
                    !model.email && errors.push("Ingrese un correo electrónico valido");
                    break;
                case "name":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "lastname":
                    !model.required && errors.push("Este campo es requerido");
                    break;
                case "surname":
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
        onLogin(payload) {
            this.login(payload)
                .then(res => {
                    console.log(res)
                    if (res.data.status){
                        this.$router.push({path: '/'})
                        window.location.reload()
/*                        if (res.data.role ==='Admin'){
                            this.$router.push({path: '/admin/companies'})
                        }else{
                            this.$router.push({path: '/'})
                        }
                        window.location.reload()*/
                    } else {
                        this.onError("Credenciales invalidas")
                    }
                })
                .catch(err => {
                    this.onError("Credenciales invalidas")
                });
        },
        onForgot(payload) {
            this.forgot(payload)
                .then(res => {
                    if  (res.data.status){
                        this.onSuccess("Se envío un mensaje al correo electrónico proporcionado")
                    }

                })
                .catch(err => {
                    this.onError("Error al enviar el correo electrónico")
                });
        },
        onSaveUser(payload) {
            this.saveUser(payload)
                .then(res => {
                    if (res.data.status){
                        this.onSuccess("Tu registro fue exitoso!")
                        if (this.profilePicture!=null){
                            this.onProfilePhoto(this.profilePicture, res.data.data.id)
                        }
                    }else this.onError(res.data.message)
                    this.resetUserForm()
                    this.$v.$reset()
                    this.$router.push({name: 'auth.login'})
                })
                .catch(err => {
                    console.log(err)
                });
        },
        onProfilePhoto(photo, id){
            console.log({photo,id})
            let formData = new FormData();
            if (photo!=null){
                formData.append("id", id);
                formData.append("profile", photo);
            }
            axios.post("user/profile",formData,{
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
        }
    }
}
export { authMixin };

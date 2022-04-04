import axios from "@/plugins/axios";

export function redirectTo(to, from, next) {
    next({ name:'auth.login'})
}

export function ifAuthenticated(to, from, next) {
    const accessToken = localStorage.getItem("access-token")
    if  (!accessToken){
        next({})
    }
    else  {
        next({ path: '/' })
    }
}

export function ifAdmin(to, from, next) {
    const accessToken = localStorage.getItem("access-token")
    if (accessToken) {
        validToken().then(data=>{
            if (data==='Unauthorized'){
                localStorage.clear()
                window.location.reload()
                this.$router.push({path: '/'})
            } if(data==="Admin"){
                next({})
            }else if(data==='User'){
                next({path: '/'})
            }
        })
    } else {
        next({name: "auth.login"})
    }
}

export function ifUser(to, from, next) {
    const accessToken = localStorage.getItem("access-token")
    if (accessToken) {
        validToken().then(data=>{
            if (data==='Unauthorized'){
                localStorage.clear()
                window.location.reload()
                this.$router.push({path: '/'})
            } if(data==="Admin"){
                next({name: "admin.companies"})
            }else if(data==='User'){
                next({})
            }
        })
    } else {
        next({})
    }
}

function validToken(){
    return axios.get('user/valid')
        .then(res=>{
            return res.data.data.role.name;
        }).catch(err=>{
            return "Unauthorized";
        })
}

import axios from "@/plugins/axios";

function getDefaultState() {
    return {
        profile: {
            status: null,
            data: null,
            error: null
        },
    };
}

const actions = {
    login: ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            commit("onLogin");
            axios
                .post(`user/login`, params)
                .then(response => {
                    if (response.data.status){
                        commit("onLoginSuccess", response);
                        resolve(response);
                    }else{
                        commit("onLoginError", response);
                        reject(response);
                    }
                })
                .catch(error => {
                    commit("onLoginError", error);
                    reject(error);
                });
        });
    },
    forgot: ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            commit("onForgot");
            axios
                .get(`usuario/enviar/`+ params)
                .then(response => {
                    commit("onForgotSuccess", response);
                    resolve(response);
                })
                .catch(error => {
                    commit("onForgotError", error);
                    reject(error);
                });
        });
    },
    saveUser: ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            commit("onSaveUser");
            axios
                .post(`user/save`, params)
                .then(response => {
                    console.log(response.data)
                    if (response.data.status){
                        commit("onSaveUserSuccess", response);
                        resolve(response);
                    }else{
                        commit("onSaveUserError", response);
                        reject(response);
                    }
                })
                .catch(error => {
                    commit("onSaveUserError", error);
                    reject(error);
                });
        });
    },
}

const mutations = {
    onLogin: state => {
        state.profile.status = "fetching";
        state.profile.error = {};
    },
    onLoginSuccess: (state, { data }) => {
        localStorage.setItem("access-token", data.auth);
        localStorage.setItem("role", data.role);
        state.profile.status = "success";
        state.profile.error = null;
        state.profile.data = data;
    },
    onLoginError: (state, err) => {
        state.profile.status = "error";
        state.profile.error = err;
    },
    onForgot: state => {
        state.profile.status = "fetching";
        state.profile.error = {};
    },
    onForgotSuccess: (state, { data }) => {
        state.profile.status = "success";
        state.profile.error = null;
        state.profile.data = data;
    },
    onForgotError: (state, err) => {
        state.profile.status = "error";
        state.profile.error = err;
    },
    onSaveUser: state => {
        state.profile.status = "fetching";
        state.profile.error = {};
    },
    onSaveUserSuccess: (state, { data }) => {
        state.profile.status = "success";
        state.profile.error = null;
        state.profile.data = data;
    },
    onSaveUserError: (state, err) => {
        state.profile.status = "error";
        state.profile.error = err;
    },
}

export default {
    namespaced: true,
    state: getDefaultState(),
    actions,
    mutations
};

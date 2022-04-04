import axios from "@/plugins/axios";

function getDefaultState() {
    return {
        company: {
            status: null,
            data: null,
            error: null
        },
    };
}

const actions = {
    companySave: ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            commit("onCompanySave");
            axios
                .post(`company/save`, params)
                .then(response => {
                    commit("onCompanySaveSuccess", response);
                    resolve(response);
                })
                .catch(error => {
                    commit("onCompanySaveError", error);
                    reject(error);
                });
        });
    },

}

const mutations = {
    onCompanySave: state => {
        state.company.status = "fetching";
        state.company.error = {};
    },
    onCompanySaveSuccess: (state, { data }) => {
        state.company.status = "success";
        state.company.error = null;
        state.company.data = data;
    },
    oonCompanyError: (state, err) => {
        state.company.status = "error";
        state.company.error = err;
    },
}

export default {
    namespaced: true,
    state: getDefaultState(),
    actions,
    mutations
};

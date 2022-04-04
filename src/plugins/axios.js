import axios from "axios";
import Config from "@/config/baseUrl"

const instance = axios.create({
    baseURL: Config.baseURL(),
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default instance;

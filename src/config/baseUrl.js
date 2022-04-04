const CONFIG = {
    ENV: process.env.NODE_ENV,
    isDev() {
        return CONFIG.ENV === "development";
    },
    isProd() {
        return CONFIG.ENV === "production";
    },
    isStaging() {
        return CONFIG.ENV === "staging";
    },
    baseURL() {
        if (CONFIG.isDev()) {
            return "http://localhost:8090/";

        } else if (CONFIG.isProd()) {
            return "http://138.68.17.161:8080/unimor/";

        } else if (CONFIG.isStaging()) {
            return "http://localhost:8090/";
        }
    }
};
export default CONFIG;

import { mapActions } from "vuex";
import axios from "@/plugins/axios";

const publicMixin = {
    methods: {
        ...mapActions("public", {
            companyList: "companyList",
        }),
    }
}
export { publicMixin };

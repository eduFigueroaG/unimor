import Base from '@/modules/auth/base.vue';
import Login from '@/modules/auth/components/login';
import Form from "@/modules/auth/components/form";
import {ifAuthenticated} from "@/router/navigationGuards";

const routes = [
    {
        path: "/auth",
        component: Base,
        beforeEnter: ifAuthenticated,
        children: [
            {
                path: "login",
                component: Login,
                name: "auth.login",
                meta: { layout: "default" }
            },
            {
                path: "form",
                component: Form,
                name: "auth.form",
                meta: { layout: "default" }
            },
        ]
    }
]

export default routes;

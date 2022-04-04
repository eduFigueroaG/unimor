import {ifUser} from "@/router/navigationGuards";


const routes = [
    {
        path:'/unimor',
        component: () => import('@/modules/public/base'),
        beforeEnter: ifUser,
        children:[
            {
                path: 'companies',
                name: 'unimor.companies',
                meta: {layout: 'default'},
                component: () => import('@/modules/public/components/companies'),
            },
            {
                path: 'companies/:id',
                name: 'unimor.companies.details',
                meta: {layout: 'default'},
                component: () => import('@/modules/public/components/company-details'),
            },
            {
                path: 'top',
                name: 'unimor.top',
                meta: {layout: 'default'},
                component: () => import('@/modules/public/components/top-companies'),
            }
        ]
    }
]

export default routes;

import Base from '@/modules/admin/base';
import Companies from '@/modules/admin/companies/companies';
import CompanyForm from '@/modules/admin/companies/company-form';
import CompanyPhotos from '@/modules/admin/companies/company-photos';

import Users from '@/modules/admin/user/users';
import {ifAdmin} from "@/router/navigationGuards";

const routes = [
    {
        path: '/admin',
        component: Base,
        beforeEnter: ifAdmin,
        children: [
            {
                path: '/admin/companies',
                name: 'admin.companies',
                component: Companies
            },
            {
                path: '/admin/companies/save',
                name: 'admin.companies.save',
                component: CompanyForm
            },
            {
                path: '/admin/companies/photos/:id',
                name: 'admin.companies.photos',
                component: CompanyPhotos
            },
            {
                path: '/admin/companies/edit/:id',
                name: 'admin.companies.edit',
                component: CompanyForm
            },
            {
                path: '/admin/users',
                name: 'admin.users',
                component: Users
            },
        ]
    }
]

export default routes;

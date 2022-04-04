import Base from '@/modules/user/base';
import Profile from '@/modules/user/components/profile';
import Fav from '@/modules/user/components/fav';

import {ifUser} from "@/router/navigationGuards";

const routes = [
    {
        path: '/profile',
        component: Base,
        beforeEnter: ifUser,
        children: [
            {
                path: '/profile/info',
                name: 'profile.info',
                component: Profile,
                meta: {layout: 'default'}
            },
            {
                path: '/profile/fav',
                name: 'profile.fav',
                component: Fav,
                meta: {layout: 'default'}
            }
        ]
    }
]

export default routes;

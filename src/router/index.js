import Vue from 'vue'
import VueRouter from 'vue-router'
import PublicRoutes from '@/modules/public/routes'
import AuthRoutes from '@/modules/auth/routes'
import AdminRoutes from '@/modules/admin/routes'
import UserRoutes from '@/modules/user/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/unimor/companies',
    name: 'Home',
    meta: {layout: 'default'},
  },
    ...AuthRoutes,
    ...PublicRoutes,
    ...AdminRoutes,
    ...UserRoutes,

  {
    path: '**',
    redirect: '/unimor/companies'
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

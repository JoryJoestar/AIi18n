import { type RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'


const errorRoutes: Array<RouteRecordRaw> = [
    {
        path: "/403",
        component: () => import("@/views/error/403.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/404",
        component: () => import("@/views/error/404.vue"),
        meta: {
            hidden: true
        },
        alias: "/:pathMatch(.*)*"
    },
]

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'layout',
    component:()=>import('@/layout/Index.vue'),
    children:[
      {
        path:'/',
        name:'home',
        component:()=>import('@/views/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...errorRoutes]
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(async (to, from) => {

})

export default router

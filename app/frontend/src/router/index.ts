import { createWebHashHistory, type RouteRecordRaw } from 'vue-router'
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
    path: '/',
    name: 'layout',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/',
        name: 'translate',
        component: () => import('@/views/Translate.vue')
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('@/views/Projects.vue')
      },
      {
        path: '/library',
        name: 'library',
        component: () => import('@/views/Library.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [...routes, ...errorRoutes]
})

router.beforeEach((to, from, next) => {
  // 打包重定向问题
  if (to.path.endsWith('index.html')) {
    next('/') // 自动重定向到根路径
  } else {
    next() // 继续导航
  }
})

router.afterEach(async (to, from) => {

})

export default router

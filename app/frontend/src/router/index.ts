import { createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { get_project_by_id } from '~/apis/projects';

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
        path: '/projects/:id', // 新增的路由
        name: 'projectDetails', // 路由名称
        component: () => import('@/views/ProjectDetails.vue') // 组件路径
      },
      {
        path: '/library',
        name: 'library',
        component: () => import('@/views/Library.vue')
      },
      {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/Tools.vue')
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

  // projects: 检查项目 ID 是否存在
  if (to.name === 'projectDetails') {
    const projectId = Number(to.params.id); // 获取路由参数中的 ID

    get_project_by_id(projectId).then((res: ResProject) => {
      if (!res) {
        next('/404'); // 如果项目不存在，重定向到 404 页面
      } else {
        next();
      }
    }).catch(err => {
      console.log(err)
      next('/404');
    })
    return;
  }

  // 打包重定向问题
  if (to.path.endsWith('index.html')) {
    next('/') // 自动重定向到根路径
  }

  next();
})

router.afterEach(async (to, from) => {

})

export default router

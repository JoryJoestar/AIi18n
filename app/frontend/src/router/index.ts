import { createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useProjectsStore } from '~/stores/projectsStore';

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
  const projectsStore = useProjectsStore(); // 获取 store 实例

  // projects: 检查项目 ID 是否存在
  if (to.name === 'projectDetails') {
    const projectId = to.params.id; // 获取路由参数中的 ID
    const projectExists = projectsStore.projects.some((project: ProjectItem) => project.id === projectId); // 检查项目是否存在
    if (!projectExists) {
      return next('/404'); // 如果项目不存在，重定向到 404 页面
    }
  }

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

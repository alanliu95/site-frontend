import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/select',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/location/index'),
      meta: { title: '选取场地', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/site',
    // name: '场地',
    meta: { title: '场地', icon: 'site' },
    component: Layout,
    redirect: '/site/basic',
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/site/basic/Layout'),
        meta: { title: '基本信息', icon: 'form' }
      },
      {
        path: 'docs',
        name: 'Docs',
        component: () => import('@/views/site/document/index'),
        meta: { title: '文档管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/invest',
    // name: '场地',
    meta: { title: '场调', icon: 'site' },
    component: Layout,
    redirect: '/invest/point',
    children: [
      {
        path: 'point',
        name: 'Basic',
        component: () => import('@/views/site/basic/Layout'),
        meta: { title: '采样点', icon: 'form' }
      },
      {
        path: 'docs',
        name: 'Docs',
        component: () => import('@/views/site/document/index'),
        meta: { title: '空间分布', icon: 'form' }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/info',
    name: 'devices',
    meta: { title: '设备', icon: 'chip' },
    children: [
      {
        path: 'overview',
        name: 'devicesOverview',
        component: () => import('@/views/device/index'),
        meta: { title: '设备状态', icon: 'tree' }
      },
      {
        path: 'management',
        name: 'devicesManagement',
        component: () => import('@/views/location/index'),
        meta: { title: '设备管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/device/realtime',
    meta: { title: '数据', icon: 'data' },
    children: [
      {
        path: 'realtime',
        name: '实时数据',
        component: () => import('@/views/location/index'),
        meta: { title: '实时数据', icon: 'run' }
      },
      {
        path: 'history',
        // name: 'management',
        component: () => import('@/views/location/index'),
        meta: { title: '历史数据', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/User'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/system/User'),
        meta: { title: '单位管理', icon: 'table' }
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/system/Test'),
        meta: { title: '测试页', icon: 'table' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

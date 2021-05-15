import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    requireAuth: true,           // 添加该字段，表示进入这个路由是需要登录的
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页' }
      }

    ]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/bookcontent',
    children: [
      {
        path: 'bookdetail/:bookId',
        name: 'BookDetail',
        hidden: true,
        component: () => import('@/views/bookdetail/index'),
        meta: { title: '小说详情页', icon: 'el-icon-sunset' }
      },
      {
        path: 'bookcontent/:bookId/:bookIndexId',
        name: 'BookContent',
        hidden: true,
        component: () => import('@/views/bookcontent/index'),
        meta: { title: '小说内容页', icon: 'el-icon-sunset' }
      },
      {
        path: 'bookstore',
        name: 'BookStore',
        component: () => import('@/views/bookstore/index'),
        meta: { title: '书库', icon: 'el-icon-s-management' }
      },
      {
        path: 'bookindex/:bookId',
        name: 'BookIndex',
        hidden: true,
        component: () => import('@/views/bookindex/index'),
        meta: { title: '小说目录' }
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/index'),
        meta: { title: '测试页', icon: 'el-icon-sunset' }
      }]
  },
  {
    path: '/user',
    component: Layout,
    // meta: { requireAuth: true, title: '用户', icon: 'el-icon-sunset' },
    redirect: '/user/:userId/info',
    hidden: true,
    children: [
      {
        path: ':userId',
        component: () => import('@/views/user'),
        children: [
          {
            path: 'info',
            name: 'UserInfo',
            component: () => import('@/views/user/info'),
            meta: { requireAuth: true, title: '个人中心' }
          },
          {
            path: 'bookshelf',
            name: 'Bookshelf',
            component: () => import('@/views/user/bookshelf'),
            meta: { requireAuth: true, title: '我的书架' }
          },
          {
            path: 'comment',
            name: 'Comment',
            component: () => import('@/views/user/comment'),
            meta: { requireAuth: true, title: '我的书评' }
          },
          {
            path: 'feedback',
            name: 'Feedback',
            component: () => import('@/views/user/feedback'),
            meta: { requireAuth: true, title: '我的反馈' }
          },
          {
            path: 'setting',
            name: 'Setting',
            component: () => import('@/views/user/setting'),
            meta: { requireAuth: true, title: '账号设置' }
          }
        ]
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  // LJohn 锚点
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth'
      }
    }
  },
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

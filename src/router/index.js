import Router from 'vue-router';
import Vue from 'vue';
// import Layout from '@/layout'

Vue.use (Router);

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'                the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'              the icon show in the sidebar
    breadcrumb: false             if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'   if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import ('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import ('@/views/error-page/401'),
    hidden: true
  }
  // {
  //   path: '/',
  //   redirect: '/hotelmdm/hotel/list',
  //   hidden: true
  // },
  // {
  //   path: '/hotelmdm',
  //   name: 'Hotelmdm',
  //   component: Layout,
  //   redirect: '/hotelmdm/hotel/list',
  //   meta: { title: '酒店主数据', icon: 'hotel' },
  //   children: [
  //     {
  //       path: 'hotel',
  //       name: 'Hotel',
  //       component: () => import('@/views/hotelmdm/hotel/index'),
  //       redirect: '/hotelmdm/hotel/list',
  //       meta: { title: '酒店列表' },
  //       hidden: false,
  //       children: [
  //         {
  //           path: 'list',
  //           name: 'HotelList',
  //           component: () => import('@/views/hotelmdm/hotel/list'),
  //           meta: { activeMenu: '/hotelmdm/hotel' },
  //           hidden: true
  //         },
  //         {
  //           path: 'detail',
  //           name: 'HotelDetail',
  //           component: () => import('@/views/hotelmdm/hotel/detail'),
  //           meta: { title: '酒店详情', activeMenu: '/hotelmdm/hotel' },
  //           hidden: true
  //         }
  //       ]
  //     },
  //   ]
  // },

  // { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router ({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  }),

  router = createRouter ();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter ();

  router.matcher = newRouter.matcher; // reset router
}

export default router;

import Vue from "vue";
import Router from "vue-router";
import { mapState } from "vuex";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/**
 * hidden: true                              if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true                          if set true, will always show the root menu, whatever its child routes length
 *                                           if not set alwaysShow, only more than one route under the children
 *                                           it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect                      if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'                        the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'                          the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'                        the icon show in the sidebar,
    permissions： ['permission-name']       the permissions required for this route(如果不存在permissions属性，或者该属性为空列表，表示无权限限制)
  }
 **/
export const constantRouterMap = [
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
    meta: {
      title: "",
      icon: ""
    }
  }
];
export const homeRoute = {
  path: "",
  component: Layout,
  haveson: true,
  children: [
    {
      path: "home",
      component: () => import("@/views/home/index.vue"),
      name: "home",
      meta: {
        keepAlive: true,
        title: "home",
        icon: "home"
      }
    }
  ]
};
export const asyncRouterMap = [
  {
    path: "/data-manage",
    component: Layout,
    alwaysShow: false,
    name: "DataManage",
    meta: {
      title: "dataManage",
      icon: "library_books"
    },
    children: [
      {
        path: "company-information",
        name: "CompanyInformation",
        component: () =>
          import("@/views/data-manage/CompanyInformation/index.vue"),
        meta: {
          keepAlive: false,
          title: "companyInformation",
          icon: "account_balance",
          permissions: ["company"]
        }
      }
    ]
  },
  {
    path: "/othermng",
    component: Layout,
    alwaysShow: false,
    name: "othermng",
    meta: {
      title: "othermng",
      icon: "api"
    },
    children: [
      {
        path: "Employee",
        name: "Employee",
        component: () =>
          import("@/views/data-manage/Employee/index.vue"),
        meta: {
          title: "employee",
          icon: "person_pin",
          permissions: ["employee"]
        }
      }
    ]
  },
  {
    path: "/righ-tmanage",
    component: Layout,
    alwaysShow: false,
    name: "RightManage",
    meta: {
      title: "rightManage",
      icon: "admin_panel_settings"
    },
    children: [
      {
        path: "appuser",
        name: "AppUser",
        component: () => import("@/views/right-manage/appuser"),
        meta: {
          title: "userRights",
          icon: "how_to_reg",
          permissions: ["SYSTEMUSER"]
        }
      },
      {
        path: "approle",
        name: "AppRole",
        component: () => import("@/views/right-manage/approle"),
        meta: {
          title: "roleRights",
          icon: "brightness_7",
          permissions: ["SYSTEMUSER"]
        }
      },
      {
        path: "curruser",
        name: "CurrUser",
        component: () => import("@/views/right-manage/curruser"),
        meta: {
          title: "changePassword",
          icon: "https"
        }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: []
});

import Vue from "vue";
import Router from "vue-router";
import {mapState} from "vuex";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);
// 解决面包屑导航中，vue-router在3.0版本以上重复点菜单报错问题
const originalReplace = Router.prototype.replace;
const originalPush = Router.prototype.push
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
/* Layout */
import Layout from "@/views/layout/Layout";

/**
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
        meta: {
            title: "",
            icon: ""
        }
    }
];
export const homeRoute = {
    path: "",
    component: Layout,
    no_father_node: true,
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
        no_father_node: true,
        path: "",
        component: Layout,
        name: "",
        meta: {
            title: "",
            icon: ""
        },
        children: [
            {
                path: "one-page",
                name: "OnePage",
                component: () =>
                    import("@/views/onePage/index.vue"),
                meta: {
                    keepAlive: false,
                    title: "OnePage",
                    icon: "account_balance",
                    permissions: ["company"]
                }
            }
        ]
    },
    {
        path: "/data-manage",
        component: Layout,
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
                    keepAlive: true,
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

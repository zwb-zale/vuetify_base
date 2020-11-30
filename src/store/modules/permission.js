import { asyncRouterMap, constantRouterMap, homeRoute } from "@/router";

/**
 * 通过meta.permissions判断是否与当前用户权限匹配
 * @param permissions  后台获取到的权限对象
 * @param route  单个路由记录
 */
function hasPermission(permissions, route, ismanageuser) {
  if (route.meta && route.meta.permissions) {
    if (route.meta.permissions.length === 0) {
      return true;
    }
    if (ismanageuser) {
      if (
        route.meta.title === "userRights" ||
        route.meta.title === "roleRights"
      ) {
        return true;
      }
    }
    return route.meta.permissions.some(permission => {
      return (
        permission in permissions &&
        permissions[permission].ops.includes("view")
      );
    });
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions  后台获取到的权限对象
 */
function filterAsyncRouter(routes, permissions, ismanageuser) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route }; // 深拷贝
    if (hasPermission(permissions, tmp, ismanageuser)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(
          tmp.children,
          permissions,
          ismanageuser
        );
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions, userdata } = data;
        let newRoute = [];
        let accessedRouters;
        if (userdata.systemuser) {
          // accessedRouters = asyncRouterMap
          newRoute = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(
            asyncRouterMap,
            permissions,
            userdata.manageuser
          );
          for (var i = 0, len = accessedRouters.length; i < len; i++) {
            if (accessedRouters[i].children !== undefined) {
              let xo = accessedRouters[i].children.length;
              if (xo !== 0) {
                newRoute.push(accessedRouters[i]);
              }
            }
          }
        }
        newRoute.unshift(homeRoute);
        commit("SET_ROUTERS", newRoute);
        resolve();
      });
    }
  }
};

export default permission;

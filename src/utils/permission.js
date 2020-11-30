import router from "../router";
import store from "../store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(permissions, meta_permissions) {
  if (store.getters.isSuper) {
    return true;
  } // admin permission passed directly
  if (store.getters.isManage) {
    if (meta_permissions) {
      if (meta_permissions[0] === "SYSTEMUSER") {
        return true;
      }
    }
  }
  if (
    meta_permissions === undefined ||
    (meta_permissions && meta_permissions.length === 0)
  ) {
    return true;
  }
  return Object.keys(permissions).some(permission =>
    meta_permissions.includes(permission)
  );
}

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path.startsWith("/kong/auth/static/jwt_login")) {
    next();
    NProgress.done();
  } else {
    if (store.getters.permissions === null) {
      // 判断当前用户是否已拉取完permissions
      new Promise((resolve, reject) => {
        store
          .dispatch("GetRole")
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            Auth.login();
            reject(err);
            NProgress.done();
          });
      }).then(userdata => {
        store
          .dispatch("GetPermissions")
          .then(permissions => {
            // 拉取permissions
            store
              .dispatch("GenerateRoutes", { permissions, userdata })
              .then(() => {
                // 根据permissions权限生成可访问的路由表
                router.addRoutes(store.getters.permission_routers); // 动态添加可访问路由表
                const f_path = store.getters.permission_routers[0].path;
                const c_path =
                  store.getters.permission_routers[0].children[0].path;
                const first_path = f_path + "/" + c_path;
                next(first_path); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              });
          })
          .catch(err => {
            if (err.response.status === 401 || err.response.status === 403) {
              Auth.login();
              NProgress.done();
            }
          });
      });
    } else {
      if (hasPermission(store.state.user.permissions, to.meta.permissions)) {
        next();
      } else {
        next({ path: "/401", replace: true, query: { noGoBack: true } });
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

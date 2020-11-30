import { getPermissions } from "@/api/login";
import { isSuper } from "@/api/login";

const user = {
  state: {
    permissions: null,
    isSuper: false,
    isManage: false,
    user_inform: {}
  },

  mutations: {
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    ADD_PERMISSIONS: (state, permissions) => {
      state.permissions = { ...state.permissions, ...permissions };
    },
    SET_ROLE: (state, data) => {
      state.isSuper = data.systemuser;
      state.isManage = data.manageuser;
    }
  },

  actions: {
    // 获取用户信息和权限
    GetPermissions({ commit, state }) {
      return new Promise((resolve, reject) => {
        const systemname = 'maxguide';
        getPermissions(systemname)
          .then(response => {
            const data = response.data;
            if (
              data instanceof Object &&
              data.toString() === "[object Object]"
            ) {
              // 验证是否返回permissions
              commit("SET_PERMISSIONS", data);
            } else {
              reject("getPermissions: permissions must be object !");
            }
            resolve(state.permissions);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户角色（是否为super)
    GetRole({ commit, state }) {
      return new Promise((resolve, reject) => {
        isSuper()
          .then(response => {
            state.user_inform = response.data;
            commit("SET_ROLE", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;

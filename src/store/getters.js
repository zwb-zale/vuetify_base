const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  isSuper: state => state.user.isSuper,
  user_inform: state => state.user.user_inform,
  isManage: state => state.user.isManage,
  permissions: state => state.user.permissions,
  permission_routers: state => state.permission.addRouters,
  real_routers: state => state.permission.routers
};
export default getters;

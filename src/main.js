// eslint-disable-next-line no-unused-vars

import Auth from "./utils/auth.js";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./lang";
import "./utils/permission";
import "@/css/custom.css";
import vuetify from "./plugins/vuetify";
import { Notification, Scrollbar, Message} from 'element-ui';
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video //引入Video播放器
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.use(Scrollbar);

Vue.config.productionTip = false;
const vm = new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
// 按钮权限控制
Vue.prototype.getPermission = name => {
  console.log();
  if (vm.$store.getters.permissions.hasOwnProperty(name)) {
    return vm.$store.getters.permissions[name].ops.indexOf("view") !== -1;
  } else {
    return false;
  }
};
Vue.directive("permission", {
  bind: function(el, binding) {
    if (
      !vm.$store.getters.isSuper &&
      vm.$route.meta.hasOwnProperty("permissions") &&
      vm.$route.meta.permissions.length
    ) {
      // 需要的权限
      const meta_permissions = vm.$route.meta.permissions;
      // 获取到的权限
      const permissions = vm.$store.getters.permissions;
      const hasPermission = meta_permissions.some(permission => {
        return (
          permissions.hasOwnProperty(permission) &&
          permissions[permission].ops.includes(binding.arg)
        );
      });
      if (!hasPermission) {
        el.style = "display: none;";
        // el.disabled = 'disabled'
        // el.classList.add('is-disabled')
      }
    }
  }
});
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

vm.$store.commit("SetWindowInnerHeight", window.innerHeight - 156);
window.onresize = () => {
  vm.$store.commit("SetWindowInnerHeight", window.innerHeight - 156);
};

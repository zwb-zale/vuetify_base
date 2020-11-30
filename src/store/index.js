import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import permission from "./modules/permission";
import tagsView from "./modules/tagsView";
import employee from './modules/employee'
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    user,
    permission,
    tagsView,
    employee
  },
  getters
});

export default store;

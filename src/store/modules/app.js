const app = {
  state: {
    sidebar: {
      // opened: !+window.localStorage.getItem('sidebarStatus'),
      opened: true,
      withoutAnimation: false
    },
    device: "desktop",
    windowInnerHeight: 0
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        window.localStorage.setItem("sidebarStatus", 0);
      } else {
        window.localStorage.setItem("sidebarStatus", 0);
      }
      state.sidebar.opened = true;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      window.localStorage.setItem("sidebarStatus", 0);
      state.sidebar.opened = true;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SetWindowInnerHeight: (state, data) => {
      state.windowInnerHeight = data;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", "desktop");
    }
  }
};

export default app;

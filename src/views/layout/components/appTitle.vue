<template>
  <v-app-bar
    app
    clipped-left
    :elevation="0"
    dense
    height="50"
    style="background-image: linear-gradient(-135deg,#34a2b0,#2668b4);color: #ffffff"
  >
    <div class="yjuzhong-1 apptitlelr_box">
      <img src="@/assets/logomini.png" style="width: 50px;height: 45px" />
      <div class="BUTTON pl-2">聚云物联</div>
    </div>
    <v-spacer></v-spacer>
    <div class="font-weight-bold apptitle">运营管理</div>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text dark v-bind="attrs" v-on="on">
          <div class="text-body-2 text-none pl-2">{{ user_inform.uname }}</div>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <div class="xyjuzhong" style="background-color: #ffffff;padding: 4px 0">
        <v-btn @click="logout" text color="error">
          <v-icon>power_settings_new</v-icon>
          <div class="text-body-2 pl-2">退出</div>
        </v-btn>
      </div>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { logout } from "@/api/login";
import { mapGetters } from "vuex";
export default {
  name: "appTitle",
  computed: {
    ...mapGetters(["user_inform"])
  },
  methods: {
    logout() {
      logout()
        .then(response => {
          Auth.logout();
          window.location.reload();
        })
        .catch(err => {
          Auth.logout();
          window.location.reload();
        });
      // console.log('退出登录');
    }
  }
};
</script>

<style scoped></style>

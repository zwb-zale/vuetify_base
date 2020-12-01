import Vue from "vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// import "@mdi/font/css/materialdesignicons.css";
// import "vuetify/dist/vuetify.min.css";
import zhHans from "vuetify/es5/locale/zh-Hans";
import Vuetify from "vuetify/lib";
import formDatetime from "@/components/deepComponents/formDatetime";
import comTree from "@/components/comTree";
import datePicker from "@/components/datePicker";
import formItem from "@/components/deepComponents/formItem";
import formSelect from "@/components/deepComponents/formSelect";
import formDate from "@/components/deepComponents/formDate";
import formLable from "@/components/deepComponents/formLable";
Vue.component("formDatetime", formDatetime);
Vue.component("comTree", comTree);
Vue.component("DatePicker", datePicker);
Vue.component("formItem", formItem);
Vue.component("formSelect", formSelect);
Vue.component("formDate", formDate);
Vue.component("FormLable", formLable);
Vue.use(Vuetify);
const opts = {
  icons: {
    iconfont: "md" // 默认值 - 仅用于展示目的
  },
  lang: {
    locales: { zhHans },
    current: "zhHans"
  }
};
export default new Vuetify(opts);

// 时间日期选择器
// <v-datetime-picker label="入职日期" v-model="employee.accessiondate">
//   <template slot="actions" slot-scope="{ parent }">
//     <div class="d-flex justify-end">
//       <v-btn text color="primary" @click="parent.okHandler">
//           确定
//         </v-btn>
//     </div>
//   </template>
// </v-datetime-picker>

import Vue from "vue";
import VueI18n from "vue-i18n";
import { getLanguage } from "@/utils/i18n";
import enLocale from "./en";
import zhCnLocale from "./zh-CN";
import zhTwLocale from "./zh-TW";

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale
  },
  "zh-CN": {
    ...zhCnLocale
  },
  "zh-TW": {
    ...zhTwLocale
  }
};

const i18n = new VueI18n({
  locale: "zh-CN",
  messages
});

export default i18n;

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

// @ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";

import App from "@/App.vue";
const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus, {
  locale: zhCn,
});

// 引入模板的全局样式
import "@/styles/index.scss";

import axios from "axios";
axios({
  url: "/api/user/login",
  method: "post",
  data: {
    username: "admin",
    password: "111111",
  },
});
app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

// @ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "@/App.vue";

import router from "./router";
const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
// 引入模板的全局样式
import "@/styles/index.scss";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");

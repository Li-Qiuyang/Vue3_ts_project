import { createRouter, createWebHashHistory } from "vue-router";
import { constRoute } from "./routes";
let router = createRouter({
  history: createWebHashHistory(),
  routes: constRoute,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;

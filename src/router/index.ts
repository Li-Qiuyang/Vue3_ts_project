import { createRouter, createWebHistory } from "vue-router";
import { constRoute } from "./routes";
let router = createRouter({
  history: createWebHistory(),
  routes: constRoute,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;

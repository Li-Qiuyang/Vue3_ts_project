import { defineStore } from "pinia";
import { constRoute } from "@/router/routes";

export default defineStore("routes", {
  state: () => {
    return {
      routes: constRoute,
    };
  },
});

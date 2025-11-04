// 创建用户相关的仓库
import { defineStore } from "pinia";
import { login } from "@/api/user/index";
import type { loginInter } from "@/api/user/type";
import type { userState } from "./types/type";

const useUserStore = defineStore("user", {
  state: (): userState => {
    return {
      token: localStorage.getItem("TOKEN"),
    };
  },
  actions: {
    async userLogin(data: loginInter) {
      let res = await login(data);
      console.log(res.data.message);
      if (res.code == 200) {
        this.token = res.data.token as string;
        // 本地存储持久化存储一份
        localStorage.setItem("TOKEN", res.data.token as string);
        return { ok: true };
      } else {
        return { ok: false, msg: res.data.message };
      }
    },
  },
  getters: {},
});

export default useUserStore;

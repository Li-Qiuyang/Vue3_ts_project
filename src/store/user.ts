// 创建用户相关的仓库
import { defineStore } from "pinia";
import { login, reqUserInfo, logout } from "@/api/user/index";
import type { loginFormData } from "@/api/user/type";
import router from "@/router";
import { constRoute, anyRoute, asyncRoute } from "@/router/routes";
import { cloneDeep } from "lodash";
function filterRoutes(asyncRoute: any, routes: any) {
  // 深拷贝异步路由
  let resRoutes = cloneDeep(asyncRoute);
  return resRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoutes(item.children, routes);
      }
      return true;
    }
  });
}

const useUserStore = defineStore("user", {
  state: (): any => {
    return {
      token: localStorage.getItem("TOKEN"),
      username: "",
      avatar: "",
      menuList: constRoute,
      btnPremission: [],
    };
  },
  actions: {
    async userLogin(data: loginFormData) {
      let res = await login(data);
      console.log(res);
      if (res.code == 200) {
        this.token = res.data as string;
        // 本地存储持久化存储一份
        localStorage.setItem("TOKEN", res.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(res.data));
      }
    },

    // 获取用户信息
    async getUserInfo() {
      let res = await reqUserInfo();

      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        this.btnPremission = res.data.buttons;
        let asynclist = filterRoutes(asyncRoute, res.data.routes);
        this.menuList = [...constRoute, ...asynclist, ...anyRoute];
        // 追加路由
        let routerlist = [...asyncRoute, ...anyRoute];
        routerlist.forEach((route) => {
          router.addRoute(route);
        });
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },

    async logout() {
      // 调用接口
      let res = await logout();
      if (res.code == 200) {
        // 清空用户信息
        this.token = "";
        this.username = "";
        this.avatar = "";
        // 清空本地存储
        localStorage.removeItem("TOKEN");
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;

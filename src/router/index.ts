import { createRouter, createWebHistory } from "vue-router";
import { constRoute } from "./routes";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/user";
import setting from "@/setting";
// 去掉进度条的圆圈
nprogress.configure({ showSpinner: false });

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

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}` as string;
  nprogress.start();
  const userStore = useUserStore();
  let token = userStore.token;
  let username = userStore.username;
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == "/login") {
      next("/");
    } else {
      //登录成功访问其余六个路由(登录排除)
      //有用户信息
      if (username) {
        next();
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          await userStore.getUserInfo();
          //万一刷新的时候是异步路由，有可能获取到用户信息但是异步路由没有加载完毕，出现空白效果
          next({ ...to });
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.logout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// 全局后置路由守卫
router.afterEach((to, from) => {
  nprogress.done();
});

export default router;

//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问

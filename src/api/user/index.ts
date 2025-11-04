// 统一管理用户相关的接口
import service from "@/utils/request";
import type { loginInter, loginResInter } from "@/api/user/type";
// 统一管理接口
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export function login(data: loginInter) {
  return service.post<any, loginResInter>(API.LOGIN_URL, data);
}

// 获取用户信息
export const reqUserInfo = () => service.get(API.USERINFO_URL);

// 统一管理用户相关的接口
import service from "@/utils/request";
import type { loginFormData, loginResponseData, userInfoReponseData } from "@/api/user/type";
// 统一管理接口
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

// 登录
// <any, any> 第二个any约束返回值类型
export const login = (data: loginFormData) =>
  service.post<any, loginResponseData>(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = () => service.get<any, userInfoReponseData>(API.USERINFO_URL);

// 退出登录
export const logout = () => service.post<any, any>(API.LOGOUT_URL);

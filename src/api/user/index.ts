// 统一管理用户相关的接口
import service from "@/utils/request";
import type { loginInter } from "@/api/user/type";
// 统一管理接口
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export async function login(data: loginInter) {
  let res = await service.post(API.LOGIN_URL, data);
  console.log(res);
}

// 用户相关数据的ts类型

export interface loginFormData {
  username: string;
  password: string;
}

export interface responseData {
  message: string;
  code: number;
  ok: boolean;
}

//定义登录接口返回数据类型
export interface loginResponseData extends responseData {
  data: string;
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends responseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

// 进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";

import useUserStore from "@/store/user";

// 创建axios实例
const service = axios.create({
  baseURL: "/api", // API基础URL
  timeout: 15000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore();
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  config.headers.token = userStore.token;
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    const res = response.data;
    return res;
  },
  (error) => {
    // 失败的回调：处理http网络错误
    console.error("响应错误:", error);
    let errorResponse = {
      code: 500,
      message: "服务器错误",
    };

    let status = error.response.status;
    switch (status) {
      case 400:
        errorResponse.message = "请求参数错误";
        break;
      case 401:
        errorResponse.message = "未授权，请重新登录";
        // 清除token并跳转到登录页
        localStorage.removeItem("token");
        // router.push("/login");
        break;
      case 403:
        errorResponse.message = "拒绝访问";
        break;
      case 404:
        errorResponse.message = "请求的资源不存在";
        break;
      case 408:
        errorResponse.message = "请求超时";
        break;
      case 409:
        errorResponse.message = "资源冲突";
        break;
      case 422:
        errorResponse.message = "请求格式正确，但语义错误导致无法处理";
        break;
      case 429:
        errorResponse.message = "请求过于频繁";
        break;
      case 500:
        errorResponse.message = "服务器内部错误";
        break;
      case 501:
        errorResponse.message = "服务未实现";
        break;
      case 502:
        errorResponse.message = "网关错误";
        break;
      case 503:
        errorResponse.message = "服务不可用";
        break;
      case 504:
        errorResponse.message = "网关超时";
        break;
      default:
        errorResponse.message = error.response.data.message || "未知错误";
    }

    // 提示错误信息
    ElMessage({
      message: errorResponse.message,
      type: "error",
      duration: 5 * 1000,
    });

    // 返回规范化的错误响应
    return Promise.reject(errorResponse);
  }
);

export default service;

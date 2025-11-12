import request from "@/utils/request";
import type { getTrademarkListRes } from "./type";
enum API {
  TRADEMARK_LIST = "/admin/product/baseTrademark/", // 品牌分页列表
  ADD_TRADEMARK = "/admin/product/baseTrademark/save", // 添加品牌
  EDIT_TRADEMARK = "/admin/product/baseTrademark/update", // 编辑品牌
  DELETE_TRADEMARK = "/admin/product/baseTrademark/remove/", // 删除品牌
  GET_TRADEMARK = "/admin/product/baseTrademark/getTrademarkList", // 品牌列表
}

// 获取已有品牌的接口
// page: 当前页码
// limit: 每页显示条数

// 品牌分页列表接口
export const reqGetTrademarkList = (page: number, limit: number) =>
  request.get<any, getTrademarkListRes>(API.TRADEMARK_LIST + `${page}/${limit}`);

// 添加品牌接口
export const reqAddTrademark = (data: any) => request.post<any, any>(API.ADD_TRADEMARK, data);

// 编辑品牌
export const reqEditTrademark = (data: any) => request.put<any, any>(API.EDIT_TRADEMARK, data);

// 删除品牌
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_TRADEMARK + `${id}`);

// 品牌列表
export const reqGetTrademark = () => request.get<any, any>(API.GET_TRADEMARK);

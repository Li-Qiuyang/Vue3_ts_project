import request from "@/utils/request";
import type { skuListRes, skuInfoList } from "@/api/product/sku/type";

enum API {
  GET_SKU_LIST = "/admin/product/list/",
  ON_SALE = "/admin/product/onSale/",
  CANCEL_SALE = "/admin/product/cancelSale/",
  DELETE_SKU = "/admin/product/deleteSku/",
  GET_SKU_INFO = "/admin/product/getSkuInfo/",
}
// 删除SKU
export const deleteSku = (skuId: number) => request.delete<any, any>(API.DELETE_SKU + `${skuId}`);
// 获取SKU列表
export const getSkuList = (page: number, size: number) =>
  request.get<any, skuListRes>(API.GET_SKU_LIST + `${page}/${size}`);
// 上架
export const onSale = (skuId: number) => request.get<any, any>(API.ON_SALE + `${skuId}`);
// 下架
export const cancelSale = (skuId: number) => request.get<any, any>(API.CANCEL_SALE + `${skuId}`);
// 获取SKU详情
export const getSkuInfo = (skuId: number) =>
  request.get<any, skuInfoList>(API.GET_SKU_INFO + `${skuId}`);

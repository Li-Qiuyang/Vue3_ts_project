import request from "@/utils/request";
import type { SPUListRes, SPUSaleAttrRes } from "./type";
enum API {
  GET_SALELIST = "/admin/product/baseSaleAttrList",
  GET_SPU_LIST = "/admin/product",
}

export const getSaleList = () => request.get<any, SPUSaleAttrRes>(API.GET_SALELIST);

export const getSpuList = (page: number, limit: number, category3Id: number) =>
  request.get<any, SPUListRes>(`${API.GET_SPU_LIST}/${page}/${limit}`, {
    params: {
      category3Id,
    },
  });

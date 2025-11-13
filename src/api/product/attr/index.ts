import service from "@/utils/request";
import type {
  firstCategoryRes,
  secondCategoryRes,
  thirdCategoryRes,
  attrListRes,
  attrList,
} from "@/api/product/attr/type";

enum API {
  GET_FIRSTCATEGOARY = "/admin/product/getCategory1",
  GET_SECONDCATEGOARY = "/admin/product/getCategory2",
  GET_THIRDCATEGOARY = "/admin/product/getCategory3",
  GET_ATTRINFO = "/admin/product/attrInfoList",
  ADD_EDIT_ATTRINFO = "/admin/product/saveAttrInfo",
  DELETE_ATTRINFO = "/admin/product/deleteAttr",
}

// 获取一级分类
export const reqGetFirstCategoary = () =>
  service.get<any, firstCategoryRes>(API.GET_FIRSTCATEGOARY);

// 获取二级分类
export const reqGetSecondCategoary = (id: number) =>
  service.get<any, secondCategoryRes>(API.GET_SECONDCATEGOARY + `/${id}`);

// 获取三级分类
export const reqGetThirdCategoary = (id: number) =>
  service.get<any, thirdCategoryRes>(API.GET_THIRDCATEGOARY + `/${id}`);

// 获取属性列表
export const getAttrInfo = (c1Id: number, c2Id: number, c3Id: number) => {
  return service.get<any, attrListRes>(API.GET_ATTRINFO + `/${c1Id}/${c2Id}/${c3Id}`);
};

// 添加/编辑属性
export const addEditAttrInfo = (data: attrList) => {
  return service.post<any, any>(API.ADD_EDIT_ATTRINFO, data);
};

// 删除属性
export const deleteAttrInfo = (attrId: number) => {
  return service.delete<any, any>(API.DELETE_ATTRINFO + `/${attrId}`);
};

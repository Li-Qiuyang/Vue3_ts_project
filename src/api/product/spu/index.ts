import request from "@/utils/request";
import type {
  SPUListRes,
  SPUSaleAttrRes,
  trademarkRes,
  SaleAttrResponseData,
  SpuHasImg,
  UpdateSpuRes,
  UpdateSpuParams,
  SkuData,
} from "./type";
enum API {
  // 获取整个项目全部的销售属性【颜色、版本、尺码】
  GET_SALELIST = "/admin/product/baseSaleAttrList",
  // 追加一个新的SPU
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  // 获取SPU的数据
  GET_SPU_LIST = "/admin/product",
  // 获取全部品牌的数据
  GET_TRADEMARK_LIST = "/admin/product/baseTrademark/getTrademarkList",
  // 获取某个SPU下的全部的已有的销售属性接口
  GET_SPU_SALEATTR_LIST = "/admin/product/spuSaleAttrList",
  // 获取某个SPU下的全部的售卖商品的图片数据
  GET_SPU_IMAGE_LIST = "/admin/product/spuImageList",
  // 更新已有的SPU
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
  // 追加一个新增的SKU地址
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  // 查看某一个已有的SPU下全部售卖的商品
  SKUINFO_URL = "/admin/product/findBySpuId/",
  // 删除已有的SPU
  REMOVESPU_URL = "/admin/product/deleteSpu/",
}

// 获取整个项目全部的销售属性【颜色、版本、尺码】
export const getSaleList = () => request.get<any, SPUSaleAttrRes>(API.GET_SALELIST);

// 获取某一个三级分类下已有的SPU数据
export const getSpuList = (page: number, limit: number, category3Id: number) =>
  request.get<any, SPUListRes>(`${API.GET_SPU_LIST}/${page}/${limit}`, {
    params: {
      category3Id,
    },
  });

// 获取全部的SPU的品牌的数据
export const getTrademarkList = () => request.get<any, trademarkRes>(API.GET_TRADEMARK_LIST);

// 获取某个SPU下的全部的已有的销售属性接口
export const getSpuSaleAttrList = (id: number) =>
  request.get<any, SaleAttrResponseData>(`${API.GET_SPU_SALEATTR_LIST}/${id}`);

// 获取某个SPU下的全部的已有的售卖商品的图片数据
export const getSpuImageList = (id: number) =>
  request.get<any, SpuHasImg>(`${API.GET_SPU_IMAGE_LIST}/${id}`);

// 更新已有的SPU
export const updateSpu = (data: UpdateSpuParams) =>
  request.post<any, UpdateSpuRes>(API.UPDATESPU_URL, data);

//  新增SPU
export const addSPU = (data: UpdateSpuParams) =>
  request.post<any, UpdateSpuRes>(API.ADDSPU_URL, data);

// 删除SPU
export const removeSPU = (id: number) =>
  request.delete<any, UpdateSpuRes>(API.REMOVESPU_URL + `${id}`);

// 获取SKU数据
export const reqSkuList = (spuId: number | string) =>
  request.get<any, any>(API.SKUINFO_URL + spuId);

// 新增一个SKU
export const addSKU = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data);

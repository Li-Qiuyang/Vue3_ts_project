import type { commonRes } from "@/api/product/spu/type";

export interface skuData {
  id?: number | string;
  spuID: number | string;
  category3Id: number | string;
  tmId: number | string;
  skuName: string;
  weight: number | string;
  price: number | string;
  skuDesc: string;
  skuDefaultImg: string;
  isSale: number | string;
  skuAttrValueList: null;
  skuSaleAttrValueList: null;
  skuImageList: null;
}

export interface skuListRes extends commonRes {
  data: {
    current: number;
    pages: number;
    size: number;
    total: number;
    searchCount: boolean;
    records: skuData[];
  };
}

export interface skuAttrValueList {
  id: number;
  attrId: number;
  valueId: number;
  valueName: string;
  attrName: string;
  skuId: number;
}

export interface skuSaleAttrValueList {
  id: number;
  saleAttrId: number;
  saleAttrValueId: number;
  saleAttrName: string;
  saleAttrValueName: string;
  skuId: number;
}

export interface skuImageList {
  id: number;
  skuId: number;
  imgName: string;
  imgUrl: string;
  spuImgId: number;
  isDefault: string;
}

export interface skuInfo {
  id: number | string;
  spuID: number;
  category3Id: number;
  tmId: number;
  skuName: string;
  weight: number | string;
  price: number | string;
  skuDesc: string;
  skuDefaultImg: string;
  isSale: number | string;
  skuAttrValueList: skuAttrValueList[];
  skuSaleAttrValueList: skuSaleAttrValueList[];
  skuImageList: skuImageList[];
}

export interface skuInfoList extends commonRes {
  data: skuInfo;
}

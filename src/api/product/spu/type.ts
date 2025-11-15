export interface commonRes {
  code: number;
  msg: string;
  ok: boolean;
}

export interface SPUData {
  category3Id: number | string;
  description: string;
  id?: number;
  spuImageList: null;
  spuName: string;
  spuSaleAttrList: null;
  tmId: number;
}

export interface SPUSaleAttr {
  id: number;
  name: string;
}

export type SPUSaleAttrList = SPUSaleAttr[];

export interface SPUSaleAttrRes extends commonRes {
  data: SPUSaleAttrList;
}

export interface SPUListRes extends commonRes {
  data: {
    current: number;
    pages: number;
    records: SPUData[];
    total: number;
    searchCount: boolean;
    size: number;
  };
}

export interface trademark {
  id: number;
  logoUrl: string;
  tmName: string;
}

export type trademarkList = trademark[];

export interface trademarkRes extends commonRes {
  data: trademarkList;
}

// 商品图片的ts类型
export interface SpuImg {
  id?: number;
  spuId?: number;
  imgName: string;
  imgUrl: string;
}
// 已有的SPU的照片墙数据的类型
export interface SpuHasImg extends commonRes {
  data: SpuImg[];
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];

// 销售属性对象
export interface SaleAttr {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  flag?: boolean;
  saleAttrValue?: string;
}

// SPU 已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends commonRes {
  data: SaleAttr[];
}

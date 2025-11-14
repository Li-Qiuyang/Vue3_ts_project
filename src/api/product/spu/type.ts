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

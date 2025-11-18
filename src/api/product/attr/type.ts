interface commonResponse {
  code: number;
  ok: boolean;
  message: string;
}

export interface firstCategoryData {
  id: number;
  name: string;
}

export interface secondCategoryData {
  id: number;
  name: string;
  category2Id: number;
}

export interface thirdCategoryData {
  id: number;
  name: string;
  category3Id: number;
}

export interface firstCategoryRes extends commonResponse {
  data: firstCategoryData[];
}

export interface secondCategoryRes extends commonResponse {
  data: secondCategoryData[];
}

export interface thirdCategoryRes extends commonResponse {
  data: thirdCategoryData[];
}

export interface attrValue {
  id?: number;
  attrId?: number;
  valueName: string;
}

export type attrValueList = attrValue[];

export interface attrList {
  attrName: string;
  attrId?: number;
  attrValueList: attrValueList;
  categoryId: number;
  categoryLevel: number;
  id?: number;
}

export interface attrListRes extends commonResponse {
  data: attrList[];
}

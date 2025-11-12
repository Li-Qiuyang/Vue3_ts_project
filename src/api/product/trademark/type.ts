export interface ResponseData {
  code: number;
  msg: string;
  ok: boolean;
}

export interface TradeMark {
  createTime: string;
  id?: number;
  tmName: string;
  logoUrl: string;
  updateTime: string;
}

export type Records = TradeMark[];

export interface getTrademarkListRes extends ResponseData {
  data: {
    countId: any;
    current: number;
    hitCount: boolean;
    maxLimit: any;
    optimizeCountSql: boolean;
    pages: number;
    orders: any[];
    records: Records;
    total: number;
    searchCount: boolean;
    size: number;
  };
}

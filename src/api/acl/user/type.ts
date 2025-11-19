import type { commonResponse } from "@/api/product/attr/type";

export interface userRecords {
  createTime: {
    "time.Time": string;
  };
  id: 0;
  name: string;
  password: string;
  phone: string;
  roleName: string;
  updateTime: {
    "time.Time": string;
  };
  username: string;
}

export interface userResponse extends commonResponse {
  data: {
    current: number;
    pages: number;
    records: userRecords[];
    size: 0;
    total: 0;
  };
}

export interface userData {
  id?: string | number;
  name: string;
  password?: string;
  username: string;
}

export interface Role {
  createTime: string;
  id: number;
  remark: string;
  roleName: string;
  updateTime: string;
  checked?: boolean;
}

export interface AssignRole {
  roleIdList: number[];
  userId: number;
}

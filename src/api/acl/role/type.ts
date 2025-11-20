interface commonResponse {
  code: number;
  ok: boolean;
  msg: string;
}

export interface roleData {
  createTime: string;
  id: number;
  remark: string;
  roleName: string;
  updateTime: string;
}

export interface roleDRes extends commonResponse {
  data: {
    current: number;
    pages: number;
    records: roleData[];
    total: number;
    size: number;
    searchCount: boolean;
  };
}

export interface newRole {
  id?: number | string;
  remark: string;
  roleName: string;
}

export interface premissionData {
  children: premissionData[];
  code: string;
  createTime: string;
  id: number;
  level: number;
  name: string;
  pid: number;
  select: boolean;
  status: string;
  toCode: string;
  type: number;
  updateTime: string;
}

export interface premissionRes extends commonResponse {
  data: premissionData[];
}

export interface doassignData {
  roleId: number;
  permissionId: number[];
}

import request from "@/utils/request";
import type { roleDRes, newRole, premissionRes, doassignData } from "./type";

enum API {
  GET_ROLE_LIST = "/admin/acl/role/",
  ADD_ROLE = "/admin/acl/role/save",
  DELETE_ROLE = "/admin/acl/role/remove/",
  UPDATE_ROLE = "/admin/acl/role/update",
  GET_PREMISSION = "/admin/acl/permission/toAssign/",
  DO_ASSIGN = "/admin/acl/permission/doAssign",
}

export const getRoleList = (page: number, limit: number, roleName?: string) =>
  request.get<any, roleDRes>(API.GET_ROLE_LIST + `${page}/${limit}?roleName=${roleName}`);

export const addRole = (data: newRole) => request.post<any, any>(API.ADD_ROLE, data);

// 删除职位
export const deleteRole = (id: number | string) => request.delete<any, any>(API.DELETE_ROLE + id);

// 更新职位
export const updateRole = (data: newRole) => request.put<any, any>(API.UPDATE_ROLE, data);

// 获取权限
export const getPermission = (id: number | string) =>
  request.get<any, premissionRes>(API.GET_PREMISSION + id);

// 分配权限
export const doAssign = (data: doassignData) =>
  request.post<any, any>(
    API.DO_ASSIGN + `?roleId=${data.roleId}&permissionId=${data.permissionId}`
  );

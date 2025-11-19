import request from "@/utils/request";
import type { userResponse, userData, AssignRole } from "@/api/acl/user/type";

enum API {
  USER_URL = "/admin/acl/user/",
  ADD_USER = "/admin/acl/user/save",
  DELETA_USER = "/admin/acl/user/remove/",
  BATCH_REMOVE = "/admin/acl/user/batchRemove",
  UPDATE_USER = "/admin/acl/user/update",
  ASSIGN_ROLE = "/admin/acl/user/toAssign/",
  DO_ASSIGN_ROLE = "/admin/acl/user/doAssignRole",
}

// 获取用户列表
export const getUserList = (page: number, limit: number, username?: string) => {
  return request.get<any, userResponse>(API.USER_URL + `${page}/${limit}?username=${username}`);
};

// 新增用户
export const addUser = (data: userData) => request.post<any, any>(API.ADD_USER, data);

// 删除用户
export const deleteUser = (id: number | string) => request.delete<any, any>(API.DELETA_USER + id);

// 批量删除用户
export const batchRemoveUser = (ids: number[]) =>
  request.delete<any, any>(API.BATCH_REMOVE, { data: ids });

// 更新用户
export const updateUser = (data: userData) => request.put<any, any>(API.UPDATE_USER, data);

// 获取角色
export const getRoleList = (adminId: number | string) =>
  request.get<any, any>(API.ASSIGN_ROLE + adminId);

// 分配角色
export const doAssignRole = (data: AssignRole) => request.post<any, any>(API.DO_ASSIGN_ROLE, data);

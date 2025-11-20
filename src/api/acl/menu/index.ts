import request from "@/utils/request";
import type { premissionRes } from "@/api/acl/role/type";
import type { addMenuData } from "@/api/acl/menu/type";

enum API {
  GET_MENU = "/admin/acl/permission",
  ADD_MENU = "/admin/acl/permission/save",
  REMOVE_MENU = "/admin/acl/permission/remove/",
  UPDATE_MENU = "/admin/acl/permission/update",
}

// 获取菜单
export const getMenu = () => request.get<any, premissionRes>(API.GET_MENU);

// 添加菜单
export const addMenu = (data: addMenuData) => request.post<any, any>(API.ADD_MENU, data);

// 删除菜单
export const removeMenu = (id: number) => request.delete<any, any>(API.REMOVE_MENU + id);

// 更新菜单
export const updateMenu = (data: addMenuData) => request.put(API.UPDATE_MENU, data);

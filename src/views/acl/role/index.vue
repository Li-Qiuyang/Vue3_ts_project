<template>
  <div>
    <el-card>
      <div class="top">
        <div class="label">职位搜索:</div>
        <el-input
          v-model="keyword"
          placeholder="请输入关键字"
          size="large"
          style="width: 30%; margin-right: 20px"
        ></el-input>
        <el-button type="primary" :disabled="!keyword" size="large" @click="search">
          搜索</el-button
        >
        <el-button size="large" @click="reset"> 重置</el-button>
      </div>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-button type="primary" size="large" icon="plus" @click="add">添加职位</el-button>

      <el-table :data="roleList" size="large" border style="margin-top: 20px" ref="tableRef">
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          align="center"
          label="职位名称"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="330">
          <template #="{ row, $index }">
            <el-button icon="user" @click="getRolePermission(row.id)">分配权限</el-button>
            <el-button type="primary" icon="edit" title="编辑职位" @click="editRole(row)"
              >编辑</el-button
            >
            <el-popconfirm :title="`确定要删除${row.roleName}吗`" @confirm="RemoveRole(row.id)">
              <template #reference>
                <el-button type="danger" icon="delete" title="删除职位">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 10, 15]"
        style="margin-top: 20px"
        background
        layout="prev, pager, next, jumper, -> ,total, sizes"
        :total="total"
        @change="changePage"
      />

      <el-dialog v-model="dialogVisible" :title="roleForm.id ? '编辑职位' : '添加职位'" width="25%">
        <el-form style="margin: 30px 0" :model="roleForm" :rules="rules" ref="formRef">
          <el-form-item label="职位名称" prop="roleName">
            <el-input v-model="roleForm.roleName" placeholder="请输入职位名称"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </template>
      </el-dialog>

      <el-drawer v-model="drawerVisible" title="分配权限" width="50%">
        <el-tree
          style="max-width: 600px"
          :data="permissionList"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedKeys"
          default-expand-all
          :props="defaultProps"
          ref="treeRef"
        />
        <template #footer>
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAssign">保存</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { roleData, newRole, premissionData, doassignData } from "@/api/acl/role/type";
import {
  getRoleList,
  addRole,
  deleteRole,
  updateRole,
  getPermission,
  doAssign,
} from "@/api/acl/role";
let drawerVisible = ref(false);
let roleList = ref<roleData[]>([]);
let dialogVisible = ref(false);
let formRef = ref();
let treeRef = ref();
const defaultProps = {
  children: "children",
  label: "name",
};

let checkedKeys = ref<number[]>([]);

let keyword = ref("");
let roleForm = ref<newRole>({
  remark: "",
  roleName: "",
});

let valiName = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入职位名称"));
  }
  callback();
};

const rules = {
  roleName: [
    {
      required: true,
      validator: valiName,
      trigger: "blur",
    },
  ],
};

let tableRef = ref();

// 分页
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(0);

// 搜索
const search = async () => {
  currentPage.value = 1;
  await getRole();
};

// 重置
const reset = async () => {
  keyword.value = "";
  await getRole();
};

const changePage = async () => {
  await getRole();
};

// 编辑职位
const editRole = async (row: roleData) => {
  dialogVisible.value = true;
  Object.assign(roleForm.value, {
    id: row.id,
    remark: row.remark,
    roleName: row.roleName,
  });
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

// 添加职位
const add = async () => {
  dialogVisible.value = true;
  Object.assign(roleForm.value, {
    id: 0,
    remark: "",
    roleName: "",
  });
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

// 保存职位
const save = async () => {
  try {
    await formRef.value.validate();
  } catch (err) {
    ElMessage({
      type: "warning",
      message: "请输入职位名称",
    });
    return;
  }
  let res;
  if (roleForm.value.id) {
    res = await updateRole(roleForm.value);
  } else {
    res = await addRole(roleForm.value);
  }
  if (res.code == 200) {
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: roleForm.value.id ? "更新成功" : "添加成功",
    });

    await getRole();
  } else {
    ElMessage({
      type: "warning",
      message: roleForm.value.id ? "更新失败" : "添加失败",
    });
  }
};

// 删除职位
const RemoveRole = async (id: number | string) => {
  let res = await deleteRole(id);
  console.log(res);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    await getRole();
  } else {
    ElMessage({
      type: "warning",
      message: "删除失败",
    });
  }
};

// 点击分配权限

const getCheckKeys = (arr: premissionData[]) => {
  arr.forEach((item) => {
    if (item.children) {
      getCheckKeys(item.children);
    } else {
      if (item.select) {
        checkedKeys.value.push(item.id);
      }
    }
  });
};

let roleId = ref(0);
let permissionList = ref<premissionData[]>([]);
const getRolePermission = async (id: number | string) => {
  roleId.value = id as number;
  checkedKeys.value = [];
  drawerVisible.value = true;
  let res = await getPermission(id);
  console.log(res);
  if (res.code == 200) {
    permissionList.value = res.data;
    getCheckKeys(res.data);
  }
};

// 保存分配权限
const saveAssign = async () => {
  let permissionId = treeRef.value.getCheckedNodes().map((item: premissionData) => item.id);
  console.log(roleId.value, permissionId);
  let res = await doAssign({
    roleId: roleId.value,
    permissionId,
  });
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "分配成功",
    });
    drawerVisible.value = false;
    await getRole();
  } else {
    ElMessage({
      type: "warning",
      message: "分配失败",
    });
  }
};
// 获得角色列表
const getRole = async () => {
  let res = await getRoleList(currentPage.value, pageSize.value, keyword.value);
  if (res.code == 200) {
    roleList.value = res.data.records;
    total.value = res.data.total;
  }
};

onMounted(async () => {
  getRole();
});
</script>
<style scoped lang="scss">
.top {
  padding-left: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  .label {
    margin-right: 10px;
  }
}
.btn {
  position: absolute;
  right: 0px;
  bottom: -50px;
}
</style>

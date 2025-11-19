<template>
  <div>
    <el-card>
      <div class="top">
        <div class="label">用户名:</div>
        <el-input
          v-model="keyword"
          placeholder="请输入用户名"
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
      <el-button type="primary" size="large" icon="plus" @click="add">添加用户</el-button>
      <el-button
        type="danger"
        size="large"
        icon="delete"
        :disabled="!checkList.length"
        @click="deleteBatchUser"
        >批量删除</el-button
      >
      <el-table
        :data="userList"
        size="large"
        border
        style="margin-top: 20px"
        @selection-change="handleSelectionChange"
        ref="tableRef"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="80" align="center" label="序号"></el-table-column>
        <el-table-column width="80" align="center" label="用户ID" prop="id"></el-table-column>
        <el-table-column align="center" label="用户名字" prop="name"></el-table-column>
        <el-table-column align="center" label="用户昵称" prop="username"></el-table-column>
        <el-table-column align="center" label="用户角色">
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.roleName.split(',')"
              v-if="row.roleName"
              :key="index"
              style="margin: 5px"
              >{{ item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="330">
          <template #="{ row, $index }">
            <el-button icon="user" @click="assignRole(row)">分配角色</el-button>
            <el-button type="primary" icon="edit" title="编辑用户" @click="editUser(row)"
              >编辑</el-button
            >
            <el-popconfirm :title="`确定要删除${row.name}吗`" @confirm="deleteoneUser(row.id)">
              <template #reference>
                <el-button type="danger" icon="delete" title="删除用户">删除</el-button>
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
      <el-drawer :title="isAdd ? '添加用户' : '编辑用户'" v-model="drawerVisible" size="20%">
        <el-form size="large" :model="userForm" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="userForm.name" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-show="isAdd">
            <el-input
              v-model="userForm.password"
              placeholder="请输入用户密码"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="submitForm">保存</el-button>
              <el-button @click="drawerVisible = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-drawer>

      <el-drawer title="分配角色" v-model="roleFormVisible" size="20%">
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="roleForm.name" placeholder="请输入用户姓名" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <div>
              <div>
                <el-checkbox label="全选" size="large" v-model="isAll" @change="allSelect" />
              </div>
              <div>
                <el-checkbox-group v-model="roleForm.roleIds">
                  <el-checkbox
                    v-for="item in roleList"
                    :label="item.roleName"
                    :value="item.id"
                    @change="handleChange"
                  />
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="saveRole">保存</el-button>
              <el-button @click="roleFormVisible = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { userRecords, userData, Role } from "@/api/acl/user/type";
import {
  getUserList,
  addUser,
  deleteUser,
  batchRemoveUser,
  updateUser,
  getRoleList,
  doAssignRole,
} from "@/api/acl/user";

// 全选
let isAll = ref(false);

let formRef = ref();
let keyword = ref("");
let userList = ref<userRecords[]>([]);
let checkList = ref<number[]>([]);
let drawerVisible = ref(false);
let roleFormVisible = ref(false);
let isAdd = ref(true);

const handleChange = () => {
  isAll.value = roleForm.value.roleIds.length == roleList.value.length;
};

// 全部角色列表
let roleList = ref<Role[]>([]);
let roleForm = ref({
  id: 0,
  name: "",
  roleIds: <number[]>[],
});

const assignRole = async (row: userRecords) => {
  Object.assign(roleForm.value, row);
  roleFormVisible.value = true;
  // 获取角色
  let res = await getRoleList(row.id);
  console.log(res);
  if (res.code == 200) {
    roleList.value = res.data.allRolesList;
    roleForm.value.roleIds = res.data.assignRoles.map((item: Role) => item.id);
    roleList.value.forEach((item: Role) => {
      item.checked = roleForm.value.roleIds.includes(item.id);
    });
  }
};

const saveRole = async () => {
  console.log(roleForm.value);
  let data = {
    roleIdList: roleForm.value.roleIds,
    userId: roleForm.value.id,
  };
  let res = await doAssignRole(data);
  console.log(res);
  if (res.code == 200) {
    ElMessage({
      message: "分配角色成功",
      type: "success",
    });
    roleFormVisible.value = false;
    getUser();
  }
};

let userForm = ref<userData>({
  id: 0,
  name: "",
  username: "",
  password: "",
});

// 全选
const allSelect = () => {
  if (isAll.value) {
    roleForm.value.roleIds = roleList.value.map((item: Role) => item.id);
  } else {
    roleForm.value.roleIds = [];
  }
};

let valiPass = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error("密码长度不能小于6位"));
  } else {
    callback();
  }
};

let rules = {
  name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  password: [{ required: true, validator: valiPass, trigger: "blur" }],
};

let tableRef = ref();

// 分页
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(0);

// 搜索
const search = async () => {
  currentPage.value = 1;
  await getUser();
};

// 重置
const reset = () => {
  keyword.value = "";
  search();
};

// 勾选
const handleSelectionChange = (val: userRecords[]) => {
  checkList.value = val.map((item: userRecords) => item.id);
};

// 获取用户列表
const getUser = async () => {
  let res = await getUserList(currentPage.value, pageSize.value, keyword.value);
  console.log(res);
  if (res.code == 200) {
    userList.value = res.data.records;
    total.value = res.data.total;
  }
};

// 编辑用户
const editUser = async (row: userRecords) => {
  console.log(row);
  isAdd.value = false;
  Object.assign(userForm.value, row);
  drawerVisible.value = true;
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate("name");
    formRef.value.clearValidate("username");
  });
};

// 删除用户
const deleteoneUser = async (id: number) => {
  let res = await deleteUser(id);
  if (res.code == 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    getUser();
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    });
  }
};

// 批量删除
const deleteBatchUser = async () => {
  let res = await batchRemoveUser(checkList.value);
  if (res.code == 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    getUser();
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    });
  }
};

// 保存
const submitForm = async () => {
  try {
    await formRef.value.validate();
  } catch (error) {
    ElMessage({
      message: "请填写完整信息",
      type: "warning",
    });
    return;
  }
  if (isAdd.value) {
    let res = await addUser(userForm.value);
    if (res.code == 200) {
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      currentPage.value = 1;
      drawerVisible.value = false;
      getUser();
    } else {
      ElMessage({
        message: "添加失败",
        type: "error",
      });
    }
  } else {
    let res = await updateUser(userForm.value);
    if (res.code == 200) {
      ElMessage({
        message: "更新成功",
        type: "success",
      });
      drawerVisible.value = false;
      getUser();
    } else {
      ElMessage({
        message: "更新失败",
        type: "error",
      });
    }
  }
  window.location.reload();
};

// 新增用户
const add = () => {
  userForm.value = JSON.parse(
    JSON.stringify({
      id: 0,
      name: "",
      username: "",
      password: "",
    })
  );
  drawerVisible.value = true;
  isAdd.value = true;
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate("name");
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("password");
  });
};

const changePage = () => {
  getUser();
};

onMounted(async () => {
  getUser();
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

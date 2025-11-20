<template>
  <div>
    <el-card>
      <el-table border stripe row-key="id" :data="menuList">
        <el-table-column label="名称" align="center" prop="name"></el-table-column>
        <el-table-column label="权限值" align="center" prop="code"></el-table-column>
        <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row, $index }">
            <el-button
              :disabled="row.level == 4 ? true : false"
              @click="handleAdd(row)"
              :type="row.level == 3 ? 'primary' : ''"
            >
              {{ row.level == 3 ? "添加功能" : "添加菜单" }}
            </el-button>
            <el-button
              type="primary"
              :disabled="row.level == 1 ? true : false"
              @click="editMenu(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确认删除${row.name}吗？`"
              @confirm="handleRemove(row.id)"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="120"
            >
              <template v-slot:reference>
                <el-button type="danger" :disabled="row.level == 1 ? true : false">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话框组件:添加或者更新已有的菜单的数据结构 -->
      <el-dialog
        v-model="dialogVisible"
        :title="formData.id ? '编辑菜单' : formData.level == 4 ? '添加功能' : '添加菜单'"
        width="30%"
      >
        <!-- 表单组件:收集新增与已有的菜单的数据 -->
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="60px"
          style="margin: 20px 0"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              :placeholder="formData.level == 4 ? '请你输入功能名称' : '请你输入菜单名称'"
              v-model="formData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="code">
            <el-input placeholder="请你输入权限值" v-model="formData.code"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { getMenu, addMenu, removeMenu, updateMenu } from "@/api/acl/menu";
import type { premissionData } from "@/api/acl/role/type";
import { ElMessage } from "element-plus";
import type { addMenuData } from "@/api/acl/menu/type";

// 表单组件:收集新增与已有的菜单的数据
let formRef = ref();
let formData = ref<addMenuData>({
  id: 0,
  code: "",
  level: 0,
  name: "",
  pid: 0,
});

let rules = ref({
  name: [
    {
      required: true,
      message: "请输入菜单名称",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入权限数值",
      trigger: "blur",
    },
  ],
});

// 对话框组件:添加或者更新已有的菜单的数据结构
let dialogVisible = ref(false);

let menuList = ref<premissionData[]>([]);

// 获取菜单
const getMenuList = async () => {
  let res = await getMenu();
  console.log(res.data);
  if (res.code == 200) {
    menuList.value = res.data;
  }
};

// 添加菜单
const handleAdd = async (row: premissionData) => {
  dialogVisible.value = true;
  nextTick(() => {
    formRef.value.clearValidate();
  });
  Object.assign(formData.value, {
    id: 0,
    code: "",
    level: row.level + 1,
    name: "",
    pid: row.id,
  });
};

// 保存菜单
const save = async () => {
  try {
    await formRef.value.validate();
  } catch (error) {
    ElMessage.warning("请填写完整信息");
    return;
  }
  let res;
  if (formData.value.id) {
    res = await updateMenu(formData.value);
  } else {
    res = await addMenu(formData.value);
  }
  if (res.code == 200) {
    ElMessage.success(formData.value.id ? "更新成功" : "添加成功");
    dialogVisible.value = false;
    getMenuList();
  } else {
    ElMessage.error(formData.value.id ? "更新失败" : "添加失败");
  }
};

// 编辑菜单
const editMenu = (row: premissionData) => {
  Object.assign(formData.value, row);
  dialogVisible.value = true;
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

// 删除菜单
const handleRemove = async (id: number) => {
  let res = await removeMenu(id);
  if (res.code == 200) {
    ElMessage.success("删除成功");
    getMenuList();
  } else {
    ElMessage.error("删除失败");
  }
};
onMounted(() => {
  getMenuList();
});
</script>
<style scoped lang="scss"></style>

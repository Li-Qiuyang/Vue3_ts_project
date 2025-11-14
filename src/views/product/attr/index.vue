<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin-top: 20px">
      <div v-show="scene">
        <el-button type="primary" icon="plus" :disabled="!categoryStore.thirdValue" @click="addAttr"
          >添加平台属性</el-button
        >
        <el-table :data="categoryStore.attrList" border style="margin-top: 20px" stripe>
          <el-table-column type="index" label="序号" width="150" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="260"></el-table-column>
          <el-table-column label="属性值列表" width="600">
            <template #="{ row, $index }">
              <div>
                <el-tag
                  style="margin: 5px"
                  v-for="(item, i) in row.attrValueList"
                  :key="item"
                  :type="['success', 'warning'][i % 2]"
                  >{{ item.valueName }}</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, index }">
              <el-button type="primary" size="small" icon="Edit" @click="editAttr(row)"></el-button>
              <el-popconfirm :title="`确认删除${row.attrName}吗？`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!scene">
        <el-form inline :model="attrForm" :rules="attrFormRules" ref="attrFormRef">
          <el-form-item label="属性名称" prop="attrName">
            <el-input
              placeholder="请输入属性名称"
              clearable
              v-model="attrForm.attrName"
              @blur="checkAttrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form-item>
          <el-button type="primary" icon="plus" @click="addAttrValue" :disabled="!attrForm.attrName"
            >添加属性值</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-table border stripe :data="attrForm.attrValueList">
            <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
            <el-table-column label="属性值名称">
              <template #="{ row, $index }">
                <div class="value-container">
                  <el-input
                    v-if="row.isEdit"
                    key="input"
                    :ref="(vc: any) => inputArr[$index] = vc"
                    placeholder="请输入属性值名称"
                    clearable
                    v-model="row.valueName"
                    @blur="doneEdit($index, row.valueName)"
                    @keyup.enter="doneEdit($index, row.valueName)"
                  ></el-input>
                  <div v-else @click="beginEdit($index)">{{ row.valueName }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #="{ row, $index }">
                <el-button
                  type="primary"
                  size="small"
                  icon="Edit"
                  @click="beginEdit($index)"
                ></el-button>
                <!-- 气泡确认框 -->
                <el-popconfirm
                  width="200"
                  icon="delete"
                  :title="`确定要删除${row.valueName}吗？`"
                  placement="bottom"
                  @confirm="deleteAttrValue($index)"
                >
                  <template #reference>
                    <el-button type="danger" size="small" icon="delete"></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveAttrInfo">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref, nextTick, onBeforeUnmount } from "vue";
import { getAttrInfo, deleteAttrInfo } from "@/api/product/attr";
import useCategoryStore from "@/store/category";
import { addEditAttrInfo } from "@/api/product/attr";
import { ElMessage } from "element-plus";
import type { attrValue, attrList } from "@/api/product/attr/type";

const categoryStore = useCategoryStore();
let scene = ref(1);
// 表单实例
const attrFormRef = ref();
let EditFlag = ref(false);
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([]);

let attrForm = ref({
  attrName: "",
  attrValueList: <any>[],
  categoryId: 0,
  categoryLevel: 3,
});

// 添加属性
const addAttr = () => {
  scene.value = 0;
  Object.assign(attrForm.value, {
    attrName: "",
    attrValueList: <any>[],
    categoryId: categoryStore.thirdValue,
    categoryLevel: 3,
  });
};

// 获取属性列表
const getAttrInfoList = async () => {
  let res = await getAttrInfo(
    categoryStore.firstValue,
    categoryStore.secondValue,
    categoryStore.thirdValue
  );
  if (res.code == 200) {
    categoryStore.attrList = res.data;
  }
};

let attrFormRules = {
  attrName: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
};

// 三级分类改变时，获取平台属性列表
watch(
  () => categoryStore.thirdValue,
  async () => {
    if (!categoryStore.thirdValue) {
      categoryStore.attrList = [];
      return;
    }
    await getAttrInfoList();
  }
);

onMounted(async () => {
  await categoryStore.getFirstCategory();
});

// 添加属性值
const addAttrValue = () => {
  attrForm.value.attrValueList.push({
    isEdit: true,
    valueName: "",
  });
  nextTick(() => {
    inputArr.value[attrForm.value.attrValueList.length - 1].focus();
  });
};

// 检查属性名称是否重复
const checkAttrName = () => {
  categoryStore.attrList.forEach((item: attrList) => {
    if (item.attrName === attrForm.value.attrName) {
      attrForm.value.attrName = "";
      ElMessage.warning("已有该属性！");
      return;
    }
  });
};

// 编辑属性
const editAttr = async (row: any) => {
  console.log(row);
  scene.value = 0;

  // 深拷贝row对象，避免直接修改row对象
  Object.assign(attrForm.value, JSON.parse(JSON.stringify(row)));
  EditFlag.value = true;
};

// 删除属性值
const deleteAttrValue = (index: number) => {
  attrForm.value.attrValueList.splice(index, 1);
};

// 取消添加属性
const cancel = () => {
  scene.value = 1;
  attrFormRef.value.clearValidate();
};

// 开始编辑
const beginEdit = (index: number) => {
  attrForm.value.attrValueList[index].isEdit = true;
  nextTick(() => {
    inputArr.value[index].focus();
  });
};

// 完成编辑
const doneEdit = (index: number, value: any) => {
  if (!value.trim()) {
    // 删除空属性值
    attrForm.value.attrValueList.splice(index, 1);
    ElMessage.warning("属性值不能为空！");
    return;
  }
  if (!attrForm.value.hasOwnProperty("id")) {
    categoryStore.attrList?.forEach((item: any) => {
      if (item.attrName == attrForm.value.attrName) {
        item.attrValueList.forEach((attrValueItem: attrValue) => {
          if (attrValueItem.valueName == value) {
            attrForm.value.attrValueList.splice(index, 1);
            ElMessage.warning("属性值不能重复！");
            return;
          }
        });
      }
    });
  }

  attrForm.value.attrValueList?.forEach((item: attrValue, i: number) => {
    console.log(item);
    if (item.valueName == value && i != index) {
      // 删除重复属性值
      attrForm.value.attrValueList.splice(index, 1);
      ElMessage.warning("属性值不能重复！");
      return;
    }
  });
  attrForm.value.attrValueList[index].isEdit = false;
};

// 保存属性信息
const saveAttrInfo = async () => {
  await attrFormRef.value.validate();
  if (attrForm.value.attrValueList.length == 0) {
    ElMessage.error("请添加属性值！");
    return;
  }
  attrForm.value.attrValueList.forEach((item: any) => {
    // 去掉isEdit
    delete item.isEdit;
  });
  let res = await addEditAttrInfo(attrForm.value);
  if (res.code == 200) {
    ElMessage.success(attrForm.value.hasOwnProperty("id") ? "修改成功！" : "添加成功！");

    scene.value = 1;
    // 刷新属性列表
    await getAttrInfoList();
  } else {
    ElMessage.error(attrForm.value.hasOwnProperty("id") ? "修改失败！" : "添加失败！");
  }
};

// 删除属性
const deleteAttr = async (id: number) => {
  let res = await deleteAttrInfo(id);
  console.log(res);
  if (res.code == 200) {
    ElMessage.success("删除成功！");
    // 刷新属性列表
    getAttrInfoList();
  } else {
    ElMessage.error("删除失败！");
  }
};

onBeforeUnmount(() => {
  // 清空分类仓库
  categoryStore.firstOptions = [];
  categoryStore.secondOptions = [];
  categoryStore.thirdOptions = [];
  categoryStore.attrList = [];
  categoryStore.firstValue = "";
  categoryStore.secondValue = "";
  categoryStore.thirdValue = "";
});
</script>
<style scoped lang="scss">
.top {
  display: flex;
  padding-left: 30px;
  div {
    margin-right: 30px;
  }
  span {
    margin-right: 15px;
  }
}

.value-container {
  position: relative;
  min-height: 32px;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

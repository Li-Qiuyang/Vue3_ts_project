<template>
  <!-- 行内表单 inline -->
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.firstValue"
          placeholder="请选择"
          style="width: 240px"
          clearable
          effect="light"
          @change="getSecondCategory"
          :disabled="scene == 1"
        >
          <el-option
            v-for="item in categoryStore.firstOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.secondValue"
          placeholder="请选择"
          style="width: 240px"
          clearable
          effect="light"
          @change="getThirdCategory"
          :disabled="scene == 1"
        >
          <el-option
            v-for="item in categoryStore.secondOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.thirdValue"
          placeholder="请选择"
          style="width: 240px"
          clearable
          effect="light"
          :disabled="scene == 1"
        >
          <el-option
            v-for="item in categoryStore.thirdOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import useCategoryStore from "@/store/category";
const categoryStore = useCategoryStore();

let props = defineProps({
  scene: {
    type: Number,
    default: 1,
  },
});

// 一级分类改变时，二级分类和三级分类清空，平台属性列表清空
const getSecondCategory = async () => {
  categoryStore.secondValue = "";
  categoryStore.thirdValue = "";
  await categoryStore.getSecondCategory();
};

// 二级分类改变时，三级分类清空，平台属性列表清空
const getThirdCategory = async () => {
  categoryStore.thirdValue = "";
  await categoryStore.getThirdCategory();
};
</script>
<style scoped lang="scss"></style>

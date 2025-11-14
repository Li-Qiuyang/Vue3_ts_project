<template>
  <div>
    <el-form label-width="80px" size="large">
      <el-form-item label="SKU名称">
        <el-input v-model="skuForm.name" placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input v-model="skuForm.weight" placeholder="请输入重量"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input v-model="skuForm.description" placeholder="请输入SKU描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性"> </el-form-item>
      <el-form-item label="销售属性"> </el-form-item>
      <el-form-item label="图片名称">
        <el-table>
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template #default="{ row, $index }">
              <el-image :src="row.picture" fit="fill" />
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="name"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="primary">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary">保存</el-button>
          <el-button @click="categoryStore.scene = 0">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import useCategoryStore from "@/store/category";
let categoryStore = useCategoryStore();

const skuForm = ref({
  name: "",
  price: 0,
  weight: 0,
  description: "",
});
</script>
<style scoped lang="scss"></style>

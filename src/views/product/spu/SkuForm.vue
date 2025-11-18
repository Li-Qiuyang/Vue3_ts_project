<template>
  <div>
    <el-form label-width="80px" size="large" :model="skuForm" ref="skuFormRef" :rules="rules">
      <el-form-item label="SKU名称" prop="name">
        <el-input v-model="skuForm.name" placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input v-model="skuForm.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)" prop="weight">
        <el-input v-model="skuForm.weight" placeholder="请输入重量"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述" prop="description">
        <el-input v-model="skuForm.description" placeholder="请输入SKU描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <template v-for="(attr, index) in attrList" :key="attr.id">
          <div style="display: flex; width: 27%; margin-bottom: 20px">
            <span style="width: 100px">{{ attr.attrName }}</span>
            <el-select
              v-model="skuForm.attrValueList[index]"
              :placeholder="`请选择${attr.attrName}`"
              style="margin-right: 30px"
            >
              <el-option
                v-for="item in attr.attrValueList"
                :key="item.id"
                :label="item.valueName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="销售属性">
        <template v-for="(attr, index) in saleArr" :key="attr.id">
          <div style="display: flex; width: 27%; margin-bottom: 20px">
            <span style="width: 100px">{{ attr.saleAttrName }}</span>
            <el-select
              v-model="skuForm.attrValueList[index]"
              :placeholder="`请选择${attr.saleAttrName}`"
              style="margin-right: 30px"
            >
              <el-option
                v-for="item in attr.spuSaleAttrValueList"
                :key="item.id"
                :label="item.saleAttrValueName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="pictureList" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template #default="{ row, $index }">
              <el-image :src="row.imgUrl" fit="fill" />
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="imgName"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="primary">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { getAttrInfo } from "@/api/product/attr";
import { getSpuSaleAttrList, getSpuImageList } from "@/api/product/spu";
import type { SPUData, SkuSaleAttr, SpuImg } from "@/api/product/spu/type";
import type { attrList } from "@/api/product/attr/type";
import useCategoryStore from "@/store/category";
let categoryStore = useCategoryStore();
let props = defineProps(["scene"]);
let emits = defineEmits(["changeScene"]);
// 表单校验规则
const rules = ref({
  name: [{ required: true, message: "请输入SKU名称", trigger: "blur" }],
  price: [{ required: true, message: "请输入价格", trigger: "blur" }],
  weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
});

// 平台属性
let attrList = ref<attrList[]>([]);

// 销售属性
let saleArr = ref<SkuSaleAttr[]>([]);

// 图片列表
let pictureList = ref<SpuImg[]>([]);

const skuForm = ref({
  name: "",
  price: "",
  weight: "",
  description: "",
  attrValueList: [],
  pictureList: [],
});

const initData = async (row: SPUData) => {
  // 获取平台属性
  let res = await getAttrInfo(
    categoryStore.firstValue,
    categoryStore.secondValue,
    categoryStore.thirdValue
  );
  if (res.code == 200) {
    attrList.value = res.data;
  }
  // 获取销售属性
  let res2 = await getSpuSaleAttrList(row.id as number);
  if (res2.code == 200) {
    saleArr.value = res2.data;
  }

  // 获取图片列表
  let res3 = await getSpuImageList(row.id as number);
  if (res3.code == 200) {
    pictureList.value = res3.data;
    console.log(pictureList.value);
  }
};
//
// 取消
const cancel = () => {
  emits("changeScene", 0);
};

defineExpose({
  initData,
});
</script>
<style scoped lang="scss"></style>

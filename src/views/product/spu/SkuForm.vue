<template>
  <div>
    <el-form label-width="100px" size="large" :model="skuParams" ref="skuFormRef" :rules="rules">
      <el-form-item label="SKU名称" prop="skuName">
        <el-input v-model="skuParams.skuName" placeholder="请输入SKU名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input
          v-model="skuParams.price"
          placeholder="请输入价格"
          type="number"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(g)" prop="weight">
        <el-input
          v-model="skuParams.weight"
          placeholder="请输入重量"
          type="number"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述" prop="description">
        <el-input v-model="skuParams.skuDesc" placeholder="请输入SKU描述" clearable></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <template v-for="(attr, index) in attrList" :key="attr.id">
          <div style="display: flex; width: 27%; margin-bottom: 20px">
            <span style="width: 100px">{{ attr.attrName }}</span>
            <el-select
              v-model="attr.saleIdAndValueId"
              :placeholder="`请选择${attr.attrName}`"
              style="margin-right: 30px"
              clearable
            >
              <el-option
                v-for="item in attr.attrValueList"
                :key="item.id"
                :label="item.valueName"
                :value="`${attr.id}:${item.id}`"
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
              v-model="attr.saleIdAndValueId"
              :placeholder="`请选择${attr.saleAttrName}`"
              style="margin-right: 30px"
              clearable
            >
              <el-option
                v-for="item in attr.spuSaleAttrValueList"
                :key="item.id"
                :label="item.saleAttrValueName"
                :value="`${attr.id}:${item.id}`"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="pictureList" style="width: 100%" border ref="tableRef">
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template #default="{ row, $index }">
              <el-image :src="row.imgUrl" fit="fill" />
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="imgName"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="primary" @click="setDefaultImg(row)">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup name="SkuForm">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getAttrInfo } from "@/api/product/attr";
import { getSpuSaleAttrList, getSpuImageList, addSKU } from "@/api/product/spu";
import type { SPUData, SkuSaleAttr, SpuImg, SkuData, SkuAttr } from "@/api/product/spu/type";
import useCategoryStore from "@/store/category";
let categoryStore = useCategoryStore();
let props = defineProps(["scene"]);
let emits = defineEmits(["changeScene"]);
let tableRef = ref();

// 收集SKU数据
let skuParams = ref<SkuData>({
  category3Id: "",
  spuId: "",
  tmId: "",
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: "",
});

// 表单校验规则
const rules = ref({
  skuName: [{ required: true, message: "请输入SKU名称", trigger: "blur" }],
  price: [{ required: true, message: "请输入价格", trigger: "blur" }],
  weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
});
let skuFormRef = ref();

// 平台属性
let attrList = ref<SkuAttr[]>([]);

// 销售属性
let saleArr = ref<SkuSaleAttr[]>([]);

// 图片列表
let pictureList = ref<SpuImg[]>([]);

// 初始化数据
const initData = async (row: SPUData) => {
  console.log(row);
  skuParams.value.category3Id = row.category3Id as number;
  skuParams.value.spuId = row.id as number;
  skuParams.value.tmId = row.tmId as number;
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

// 设置默认图片
const setDefaultImg = (row: SpuImg) => {
  // 先清除所有选中项，再选中当前项
  tableRef.value.clearSelection();
  // 选中当前项
  tableRef.value.toggleRowSelection(row, true);
  skuParams.value.skuDefaultImg = row.imgUrl;
};

// 取消
const cancel = () => {
  emits("changeScene", 0);
  skuFormRef.value.clearValidate();
  // 清空表单数据
  Object.assign(skuParams.value, {
    category3Id: "",
    spuId: "",
    tmId: "",
    skuName: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "",
  });
};

// 保存
const submitForm = async () => {
  try {
    await skuFormRef.value.validate();
  } catch (err) {
    ElMessage.warning("请填写完整信息");
    return;
  }
  // 平台属性
  skuParams.value.skuAttrValueList = attrList.value.reduce((pre: any, curr: any) => {
    if (curr.saleIdAndValueId) {
      let arr = curr.saleIdAndValueId.split(":");
      pre.push({
        attrId: arr[0],
        valueId: arr[1],
      });
    }
    return pre;
  }, []);

  // 销售属性
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev: any, curr: any) => {
    if (curr.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = curr.saleIdAndValueId.split(":");
      prev.push({
        saleAttrId,
        saleAttrValueId,
      });
    }
    return prev;
  }, []);

  console.log(skuParams.value);
  let res = await addSKU(skuParams.value);
  console.log(res);
  if (res.code == 200) {
    ElMessage.success("添加成功");
    emits("changeScene", 0);
  } else {
    ElMessage({
      type: "error",
      message: "添加SKU失败",
    });
  }
};

defineExpose({
  initData,
});
</script>

<script lang="ts">
export default {
  name: "SkuForm",
};
</script>
<style scoped lang="scss"></style>

<template>
  <div>
    <el-form size="large" label-width="96px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuForm.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU名称" style="width: 50%">
        <el-select placeholder="请选择品牌" v-model="spuForm.tmId">
          <el-option
            v-for="item in trademarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU描述"
          rows="4"
          v-model="spuForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload action="/api/admin/product/fileUpload" list-type="picture-card">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          :placeholder="`还未选择${saleAttrs.length}个`"
          style="width: 50%"
          v-model="selectedSaleAttr"
        >
          <el-option
            v-for="item in saleAttrs"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button icon="plus" type="primary" style="margin-left: 30px" @click="addSaleAttr"
          >添加属性</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-table border :data="spuForm.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="120" align="center"></el-table-column>
          <el-table-column
            label="销售属性名称"
            prop="saleAttrName"
            align="center"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{ row, $index }">
              <el-input
                v-model="row.spuSaleAttrValueList[$index].saleAttrValueName"
                placeholder="请输入销售属性值"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-popconfirm
                class="box-item"
                :title="`确认删除${row.spuSaleAttrValueList[$index].saleAttrValueName}吗？`"
                placement="bottom"
                @confirm="handleDelete(row, $index)"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-right: 10px; margin-top: 10px"
          size="large"
          @click="saveSPU"
          >保存</el-button
        >
        <el-button style="margin-top: 10px" size="large" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useCategoryStore from "@/store/category";
import { getSaleList } from "@/api/product/spu/index";
import type { SPUSaleAttrList } from "@/api/product/spu/type";
import { getTrademarkList } from "@/api/product/spu/index";
import type { trademarkList } from "@/api/product/spu/type";

let trademarkList = ref<trademarkList>([]);
let categoryStore = useCategoryStore();

let spuForm = ref({
  category3Id: 0,
  description: "",
  spuImageList: [
    {
      imgName: "",
      imgUrl: "",
    },
  ],
  spuName: "",
  tmId: "",
  spuSaleAttrList: <any>[],
});
let saleAttrs = ref<SPUSaleAttrList>([]);
let selectedSaleAttr = ref();

// 添加销售属性
const addSaleAttr = () => {
  let str = saleAttrs.value.find((item) => item.id == selectedSaleAttr.value)?.name;
  console.log(str);
  spuForm.value.spuSaleAttrList.push({
    baseSaleAttrId: Number(selectedSaleAttr.value),
    saleAttrName: str,
    spuSaleAttrValueList: [
      {
        baseSaleAttrId: Number(selectedSaleAttr.value),
        saleAttrValueName: "",
      },
    ],
  });
  saleAttrs.value = saleAttrs.value.filter((item) => item.id != selectedSaleAttr.value);
  selectedSaleAttr.value = "";
};

const saveSPU = () => {
  console.log(spuForm.value);
  spuForm.value.category3Id = categoryStore.thirdValue;
};

// 删除销售属性
const handleDelete = (row: any, index: number) => {
  spuForm.value.spuSaleAttrList.splice(index, 1);
  console.log(row);
  saleAttrs.value.push({
    name: row.saleAttrName,
    id: row.baseSaleAttrId,
  });
};

const cancel = () => {
  Object.assign(spuForm.value, {
    category3Id: 0,
    description: "",
    spuImageList: [
      {
        imgName: "",
        imgUrl: "",
      },
    ],
    spuName: "",
    tmId: 0,
    spuSaleAttrList: [
      {
        baseSaleAttrId: 0,
        saleAttrName: "",
        spuSaleAttrValueList: [
          {
            baseSaleAttrId: 0,
            saleAttrValueName: "",
          },
        ],
      },
    ],
  });
  categoryStore.scene = 0;
};

onMounted(async () => {
  let res = await getTrademarkList();
  console.log(res);
  if (res.code == 200) {
    trademarkList.value = res.data;
  }
  let res2 = await getSaleList();
  if (res2.code == 200) {
    saleAttrs.value = res2.data;
  }
});
</script>
<style scoped lang="scss"></style>

<template>
  <div>
    <Category />
    <el-card style="margin-top: 20px" v-show="categoryStore.scene == 0">
      <el-button
        type="primary"
        icon="plus"
        style="margin-bottom: 20px"
        @click="categoryStore.scene = 1"
        >添加SPU</el-button
      >
      <el-table :data="SPUList">
        <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName" width="240"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="操作" width="240">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="plus"
              @click="categoryStore.scene = 2"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="categoryStore.scene = 1"
            ></el-button>
            <el-button type="info" size="small" icon="view"></el-button>
            <el-button type="danger" size="small" icon="delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 10, 15]"
        background
        layout="prev, pager, next, jumper, -> ,total, sizes"
        :total="total"
        @change="changePage"
      />
    </el-card>
    <el-card style="margin-top: 20px" v-show="categoryStore.scene == 1">
      <SpuForm />
    </el-card>
    <el-card style="margin-top: 20px" v-show="categoryStore.scene == 2">
      <SkuForm />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import useCategoryStore from "@/store/category";
import { getSpuList } from "@/api/product/spu";
import type { SPUData } from "@/api/product/spu/type";
import SpuForm from "@/views/product/spu/SpuForm.vue";
import SkuForm from "@/views/product/spu/SkuForm.vue";

let SPUList = ref<SPUData[]>([]);

const categoryStore = useCategoryStore();

// 获取SPU列表
const getSPUList = async () => {
  let res = await getSpuList(currentPage.value, pageSize.value, categoryStore.thirdValue);
  console.log(res);
  if (res.code == 200) {
    SPUList.value = res.data.records;
    total.value = res.data.total;
  }
};

// 分页
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);

const changePage = async () => {
  getSPUList();
};

onMounted(async () => {
  await categoryStore.getFirstCategory();
});

watch(
  () => categoryStore.thirdValue,
  async () => {
    getSPUList();
  }
);
</script>
<style scoped lang="scss"></style>

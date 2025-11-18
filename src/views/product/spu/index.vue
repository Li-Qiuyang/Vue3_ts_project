<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin-top: 20px" v-show="scene == 0">
      <el-button
        type="primary"
        icon="plus"
        style="margin-bottom: 20px"
        @click="addSPU"
        :disabled="!categoryStore.thirdValue"
        >添加SPU</el-button
      >
      <el-table :data="SPUList" size="large" border>
        <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
        <el-table-column
          label="SPU名称"
          prop="spuName"
          width="240"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU描述" prop="description" align="center"></el-table-column>
        <el-table-column label="操作" width="340" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="plus" title="添加SKU" @click="addSku(row)"></el-button>
            <el-button type="primary" icon="edit" title="编辑SPU" @click="editSPU(row)"></el-button>
            <el-button
              type="info"
              icon="view"
              title="查看SKU列表"
              @click="viewSkuList(row)"
            ></el-button>
            <el-popconfirm :title="`你确定要删除${row.spuName}吗`" @confirm="deleteSPU(row.id)">
              <template #reference="{ row }">
                <el-button type="danger" icon="delete" title="删除SPU"></el-button>
              </template>
            </el-popconfirm>
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
      <el-dialog title="SKU列表" v-model="dialogVisible">
        <el-table :data="skuList" size="large" border>
          <el-table-column
            label="SKU名称"
            prop="skuName"
            width="240"
            align="center"
          ></el-table-column>
          <el-table-column label="SKU价格" prop="price" align="center"></el-table-column>
          <el-table-column label="SKU重量" prop="weight" align="center"></el-table-column>
          <el-table-column label="SKU图片" align="center">
            <template #="{ row, $index }">
              <img :src="row.skuDefaultImg" fit="fill" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
    <el-card style="margin-top: 20px" v-show="scene == 1">
      <SpuForm
        :scene="scene"
        @changeScene="changeScene"
        ref="spuFormRef"
        :total="total"
        :currentPage="currentPage"
      />
    </el-card>
    <el-card style="margin-top: 20px" v-show="scene == 2">
      <SkuForm :scene="scene" @changeScene="changeScene" ref="skuFormRef" />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/category";
import { getSpuList, removeSPU, reqSkuList } from "@/api/product/spu";
import type { SPUData } from "@/api/product/spu/type";
import SpuForm from "@/views/product/spu/SpuForm.vue";
import SkuForm from "@/views/product/spu/SkuForm.vue";
import { ElMessage } from "element-plus";

let spuFormRef = ref();
let skuFormRef = ref();

let dialogVisible = ref(false);
let skuList = ref<any>([]);

let SPUList = ref<SPUData[]>([]);
let scene = ref(0);
const categoryStore = useCategoryStore();

// 获取SPU列表
const getSPUList = async () => {
  let res = await getSpuList(currentPage.value, pageSize.value, categoryStore.thirdValue);
  if (res.code == 200) {
    SPUList.value = res.data.records;
    total.value = res.data.total;
  }
};
// 添加SPU
const addSPU = () => {
  scene.value = 1;
  spuFormRef.value.initData({});
};
// 编辑SPU
const editSPU = (row: SPUData) => {
  scene.value = 1;
  spuFormRef.value.initData(row);
};

// 添加SKU
const addSku = (row: SPUData) => {
  scene.value = 2;
  skuFormRef.value.initData(row);
};

// 查看SKU列表
const viewSkuList = async (row: SPUData) => {
  let res = await reqSkuList(row.id as number);
  if (res.code == 200) {
    skuList.value = res.data;
    dialogVisible.value = true;
  }
};

// 删除SPU
const deleteSPU = async (id: number) => {
  let res = await removeSPU(id);
  console.log(res);
  if (res.code == 200) {
    ElMessage.success("删除成功");
    getSPUList();
  }
};

// 切换场景
const changeScene = (val: number, pageNumber: 1) => {
  scene.value = val;
  if (val === 0) {
    currentPage.value = pageNumber;
    getSPUList();
  }
};

// 分页
let currentPage = ref(1);
let pageSize = ref(5);
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
    if (categoryStore.thirdValue) {
      getSPUList();
    } else {
      SPUList.value = [];
      total.value = 0;
    }
  }
);
onBeforeUnmount(() => {
  categoryStore.thirdValue = "";
  categoryStore.secondValue = "";
  categoryStore.firstValue = "";
  categoryStore.thirdOptions = [];
  categoryStore.secondOptions = [];
  categoryStore.firstOptions = [];
});
</script>
<style scoped lang="scss"></style>

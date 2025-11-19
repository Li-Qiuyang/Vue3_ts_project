<template>
  <div>
    <el-card>
      <el-table :data="skuList" border>
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column label="名称" align="center" prop="skuName"></el-table-column>
        <el-table-column label="描述" align="center" prop="skuDesc"></el-table-column>
        <el-table-column label="图片" align="center">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" align="center" prop="weight"></el-table-column>
        <el-table-column label="价格(原)" align="center" prop="price"></el-table-column>
        <el-table-column label="操作" align="center" width="250" fixed="right">
          <template #="{ row }">
            <el-button
              :icon="row.isSale ? 'Bottom' : 'Top'"
              :title="row.isSale ? '下架' : '上架'"
              @click="handleOnSale(row)"
            ></el-button>
            <el-button type="primary" icon="edit" title="编辑SKU" @click="editSku(row)"></el-button>
            <el-button
              type="info"
              icon="infoFilled"
              title="查看详情"
              @click="getSkuInfomation(row)"
            ></el-button>
            <el-popconfirm
              :title="`确认要删除${row.skuName}吗？`"
              @confirm="handleDelete(row)"
              placement="bottom"
            >
              <template #reference="{ row }">
                <el-button type="danger" icon="delete" title="删除SKU"></el-button>
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

      <el-drawer v-model="drawer" title="商品详情">
        <el-row class="inforow">
          <el-col :span="6"><span class="label">名称</span></el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row class="inforow">
          <el-col :span="6"><span class="label">描述</span></el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row class="inforow">
          <el-col :span="6"><span class="label">价格</span></el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row class="inforow">
          <el-col :span="6"><span class="label">平台属性</span></el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 0 5px 5px 0"
              >{{ item.attrName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row class="inforow">
          <el-col :span="6"><span class="label">销售属性</span></el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
              type="success"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row class="inforow" v-if="skuInfo.skuImageList.length > 0">
          <el-col :span="6"><span class="label">图片列表</span></el-col>
          <el-col :span="18">
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="400px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img style="width: 80%; height: 80%" :src="item.imgUrl" :alt="item.imgName" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getSkuList, onSale, cancelSale, deleteSku, getSkuInfo } from "@/api/product/sku";
import type { skuData, skuInfo } from "@/api/product/sku/type";

// 分页
let currentPage = ref(1);
let pageSize = ref(7);
let total = ref(0);
let skuList = ref<skuData[]>([]);
let skuInfo = ref<skuInfo>({} as skuInfo);
let drawer = ref(false);

// 上架|下架
const handleOnSale = async (row: skuData) => {
  console.log(row);
  if (!row.isSale) {
    let res = await onSale(row.id as number);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "上架成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: "上架失败",
      });
    }
  } else {
    let res = await cancelSale(row.id as number);
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "下架成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: "下架失败",
      });
    }
  }
  getSkuData();
};

// 删除SKU
const handleDelete = async (row: skuData) => {
  let res = await deleteSku(row.id as number);
  console.log(res);
  if (res.code == 200) {
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("删除失败");
  }
  getSkuData();
};

// 编辑SKU
const editSku = (row: skuData) => {
  ElMessage({ type: "success", message: "程序员在努力的更新中...." });
};

// 获取SKU列表
const getSkuData = async () => {
  let res = await getSkuList(currentPage.value, pageSize.value);
  if (res.code == 200) {
    skuList.value = res.data.records;
    total.value = res.data.total;
  }
  console.log(skuList.value);
};

// 获取SKU详情
const getSkuInfomation = async (row: skuData) => {
  let res = await getSkuInfo(row.id as number);
  console.log(res);
  if (res.code == 200) {
    skuInfo.value = res.data;
    drawer.value = true;
  }
};

onMounted(async () => {
  await getSkuData();
});

const changePage = () => {
  getSkuData();
};
</script>
<style scoped lang="scss">
.inforow {
  margin-bottom: 30px;
  .label {
    font-weight: bold;
    color: #666;
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
</style>

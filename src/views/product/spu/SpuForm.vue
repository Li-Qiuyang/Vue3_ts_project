<template>
  <div>
    <el-form size="large" label-width="100px" :model="spuForm" :rules="rules" ref="spuFormRef">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input
          placeholder="请输入SPU名称"
          v-model="spuForm.spuName"
          @blur="isExist(spuForm.spuName)"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌" style="width: 50%" prop="tmId">
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
          v-model="spuForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          v-model:file-list="imageList"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-preview="previewImage"
        >
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
        <el-button
          icon="plus"
          type="primary"
          style="margin-left: 30px"
          @click="addSaleAttr"
          :disabled="!selectedSaleAttr"
        >
          添加属性</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-table border :data="spuForm.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="120" align="center"></el-table-column>
          <el-table-column
            label="销售属性名称"
            prop="saleAttrName"
            align="center"
            width="250"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{ row, $index }">
              <div style="display: flex; align-items: center">
                <el-tag
                  v-for="(item, i) in row.spuSaleAttrValueList"
                  :key="item.baseSaleAttrId"
                  style="margin: 5px"
                >
                  <div style="display: flex; align-items: center">
                    <span>{{ item.saleAttrValueName }}</span>
                    <el-popconfirm
                      :title="`确认删除${item.saleAttrValueName}吗？`"
                      @confirm="deleteSaleAttrValue($index, i)"
                    >
                      <template #reference>
                        <el-icon style="margin-left: 5px">
                          <Close />
                        </el-icon>
                      </template>
                    </el-popconfirm>
                  </div>
                </el-tag>
                <el-button
                  icon="plus"
                  v-if="!row.isEdit"
                  style="margin-left: 5px"
                  @click="addSaleAttrValue(row, $index)"
                  title="添加销售属性值"
                ></el-button>
                <el-input
                  style="width: 80px"
                  placeholder="请输入销售属性值"
                  v-model="newsaleAttrValueName"
                  @blur="doneEdit(row, $index)"
                  v-else
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template #="{ row, $index }">
              <el-popconfirm
                class="box-item"
                :title="`确认删除${row.saleAttrName}吗？`"
                placement="bottom"
                @confirm="handleDelete(row, $index)"
              >
                <template #reference>
                  <el-button type="danger" icon="delete" title="删除"></el-button>
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
    <el-dialog v-model="dialogVisible" style="height: 600px; width: 600px">
      <img :src="dialogImageUrl" alt="Preview Image" style="height: 500px; width: 500px" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/category";
import {
  getSaleList,
  getTrademarkList,
  getSpuImageList,
  getSpuSaleAttrList,
  updateSpu,
  addSPU,
  getSpuList,
} from "@/api/product/spu/index";
import type {
  SPUSaleAttrList,
  UpdateSpuParams,
  trademarkList,
  SPUData,
} from "@/api/product/spu/type";
import useUserStore from "@/store/user";
import { ElMessage } from "element-plus";

let newsaleAttrValueName = ref("");

// 点击添加销售属性值按钮
const addSaleAttrValue = (row: any, $index: number) => {
  row.isEdit = true;
};

// 预览图片弹窗
let dialogVisible = ref(false);
let dialogImageUrl = ref("");

let props = defineProps({
  scene: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 1,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

let emits = defineEmits(["changeScene"]);

let trademarkList = ref<trademarkList>([]);
let categoryStore = useCategoryStore();
let imageList = ref<{ name: string; url: string }[]>([]);
let spuId = ref(0);
let spuForm = ref<any>({
  category3Id: 0,
  description: "",
  spuImageList: [],
  spuName: "",
  tmId: "",
  spuSaleAttrList: <any>[],
});

let rules = {
  spuName: [
    {
      required: true,
      message: "请输入SPU名称",
      trigger: "blur",
    },
  ],
  tmId: [
    {
      required: true,
      message: "请选择品牌",
      trigger: "blur",
    },
  ],
};

let saleAttrs = ref<SPUSaleAttrList>([]);
let selectedSaleAttr = ref();
let SPUList = ref<SPUData[]>([]);
let headers = { token: useUserStore().token };
let spuFormRef = ref();

// 添加销售属性
const addSaleAttr = () => {
  let str = saleAttrs.value.find((item) => item.id == selectedSaleAttr.value)?.name;
  console.log(str);
  spuForm.value.spuSaleAttrList.push({
    baseSaleAttrId: Number(selectedSaleAttr.value),
    saleAttrName: str as string,
    isEdit: true,
    spuSaleAttrValueList: [],
  });
  console.log(spuForm.value.spuSaleAttrList);
  saleAttrs.value = saleAttrs.value.filter((item) => item.id != selectedSaleAttr.value);
  selectedSaleAttr.value = "";
};

// 删除销售属性值
const deleteSaleAttrValue = (index: number, i: number) => {
  console.log(spuForm.value.spuSaleAttrList, index, i);

  spuForm.value.spuSaleAttrList[index]?.spuSaleAttrValueList.splice(i, 1);
};

// 获取SPU列表
const getspuList = async () => {
  let res = await getSpuList(1, props.total, categoryStore.thirdValue);
  if (res.code == 200) {
    SPUList.value = res.data.records;
  }
};

// 上传图片之前校验
const beforeUpload = (file: any) => {
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2MB");
    return false;
  } else if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/gif") {
    ElMessage.error("请上传png、jpeg、gif格式的图片");
    return false;
  }
  return true;
};

// 预览图片
const previewImage = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

// 检查是否重复
const isExist = (name: string) => {
  if (SPUList.value.find((item: any) => item.spuName == name)) {
    ElMessage.warning("SPU名称已存在");
    spuForm.value.spuName = "";
    return false;
  }
};

// 保存SPU
const saveSPU = async () => {
  spuForm.value.spuSaleAttrList = spuForm.value.spuSaleAttrList.filter((item: any) => {
    saleAttrs.value.push({
      name: item.saleAttrName,
      id: item.baseSaleAttrId,
    });
    return item.spuSaleAttrValueList.length > 0;
  });

  // 删除isEdit
  spuForm.value.spuSaleAttrList.forEach((item: any) => {
    delete item.isEdit;
  });
  spuForm.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name, // 图片的名字
      imgUrl: item.url,
    };
  });

  console.log(spuForm.value);
  let res = null;
  if (spuForm.value.id) {
    res = await updateSpu(spuForm.value);
  } else {
    res = await addSPU(spuForm.value);
  }
  console.log(res);
  if (res.code == 200) {
    ElMessage.success(spuForm.value.id ? "更新成功" : "新增成功");
    emits("changeScene", 0, spuForm.value.id ? props.currentPage : 1);
    // 清空图片列表
    imageList.value = [];
  }
};

// 完成编辑
const doneEdit = (row: any, $index: number) => {
  if (newsaleAttrValueName.value.trim() == "") {
    ElMessage.error("属性值不能为空");
    row.isEdit = false;
    return;
  } else if (
    row.spuSaleAttrValueList.find(
      (item: any) => item.saleAttrValueName == newsaleAttrValueName.value
    )
  ) {
    ElMessage.error(`${newsaleAttrValueName.value}属性值已存在`);
    row.isEdit = false;
    return;
  }

  row.spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: newsaleAttrValueName.value,
  });
  row.isEdit = false;
  newsaleAttrValueName.value = "";
  row.isEdit = false;
};

// 删除销售属性
const handleDelete = (row: any, index: number) => {
  spuForm.value.spuSaleAttrList.splice(index, 1);
  saleAttrs.value.push({
    name: row.saleAttrName,
    id: row.baseSaleAttrId,
  });
};

// 取消
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
    tmId: "",
    spuSaleAttrList: [],
  });
  spuFormRef.value.clearValidate();
  emits("changeScene", 0);
};

// 获取品牌列表
const getTradeList = async () => {
  let res = await getTrademarkList();
  console.log(res);
  if (res.code == 200) {
    trademarkList.value = res.data;
  }
};

// 获取销售属性列表
let getSalelist = async () => {
  let res = await getSaleList();
  console.log(res);
  if (res.code == 200) {
    saleAttrs.value = res.data;
  }
};

// 获取SPU图片列表
let getSpuImagesList = async (id: number) => {
  let res = await getSpuImageList(id);
  console.log(res.data);
  if (res.code == 200) {
    imageList.value = res.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      };
    });
  }
};

// 获取该SPU销售属性列表
const getSpuSaleAttrlist = async (id: number) => {
  let res = await getSpuSaleAttrList(id);
  if (res.code == 200) {
    let arr = res.data;
    console.log(arr, saleAttrs.value);
    arr.forEach((item) => {
      spuForm.value.spuSaleAttrList.push({
        baseSaleAttrId: item.baseSaleAttrId,
        saleAttrName: item.saleAttrName,
        isEdit: false,
        spuSaleAttrValueList: item.spuSaleAttrValueList.map((item) => {
          return {
            baseSaleAttrId: item.baseSaleAttrId,
            saleAttrValueName: item.saleAttrValueName,
          };
        }),
      });
      saleAttrs.value = saleAttrs.value.filter((item2) => item2.id != item.baseSaleAttrId);
    });
  }
};

const initData = async (row: SPUData) => {
  console.log(row);
  Object.assign(spuForm.value, {
    id: row.id,
    category3Id: categoryStore.thirdValue,
    spuName: "",
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
  });
  // 清空照片墙
  imageList.value = [];
  // 清空数据
  newsaleAttrValueName.value = "";
  spuForm.value.description = row.description;
  spuForm.value.spuName = row.spuName;
  await getTradeList();
  await getSalelist();
  await getspuList();
  if (row.id) {
    await getSpuImagesList(row.id as number);
    await getSpuSaleAttrlist(row.id as number);
    spuForm.value.tmId = row.tmId as string;
    spuId.value = row.id as number;
  }
};

// 暴露方法
defineExpose({
  initData,
});
</script>
<style scoped lang="scss"></style>

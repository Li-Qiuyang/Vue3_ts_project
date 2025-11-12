<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="large" icon="plus" @click="addTradeMark"> 添加品牌</el-button>
      <!-- 
        el-table组件
        border: 竖线
        label：列名
        align: center居中对齐
      -->

      <el-table style="margin: 20px 0" border :data="trademarkList">
        <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, index }">
            <img :src="row.logoUrl" alt="未上传品牌LOGO" width="50px" height="50px" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, index }">
            <el-button type="primary" size="small" icon="edit">编辑</el-button>
            <el-button type="danger" size="small" icon="delete" @click="deleteTradeMark(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogFormVisible" title="添加品牌" width="800" draggable modal>
        <el-form :model="form" :rules="rules">
          <el-form-item label="品牌名称" prop="tmName">
            <el-input v-model="form.tmName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="品牌LOGO" prop="logoUrl">
            <!-- Upload组件属性：action图片上传路径书写/api, 代理服务器发送请求 -->
            <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 分页组件
       el-pagination
       v-model:current-page：当前页码
       v-model:page-size: 每页显示条数
       :page-sizes: 用于设置下拉菜单的数据，数组类型
       background: 背景颜色
       layout: 可以设置分页器六个子组件的布局
      -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 8, 10]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @change="changePage"
      />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Records } from "@/api/product/trademark/type";
import { ElMessage } from "element-plus";
import { reqGetTrademarkList, reqDeleteTrademark } from "@/api/product/trademark";
import type { UploadProps } from "element-plus";

// 分页相关
let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let trademarkList = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let form = ref({
  tmName: "",
  logoUrl: "",
});
let rules = {
  tmName: [{ required: true, message: "品牌名称不能为空", trigger: "blur" }],
  logoUrl: [{ required: true, message: "品牌LOGO不能为空", trigger: "blur" }],
};
const getTradeMarkList = async () => {
  let res = await reqGetTrademarkList(currentPage.value, pageSize.value);
  console.log(res);
  total.value = res.data.total;
  trademarkList.value = res.data.records;
};

const addTradeMark = () => {
  dialogFormVisible.value = true;
};

onMounted(async () => {
  getTradeMarkList();
});
const changePage = () => {
  getTradeMarkList();
};
const deleteTradeMark = async (id: number) => {
  let res = await reqDeleteTrademark(id);
  console.log(res);
};
const cancel = () => {
  dialogFormVisible.value = false;
  form.value.tmName = "";
  form.value.logoUrl = "";
};
const confirm = async () => {};
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.log(response, uploadFile);
  form.value.logoUrl = response.data;
};

// 图片上传之前校验
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // 校验图片格式和大小
  if (rawFile.type == "image/jpeg" || rawFile.type == "image/png" || rawFile.type == "image/gif") {
    if (rawFile.size / 1024 / 1024 > 4) {
      // 单位是字节，1MB = 1024KB = 1024 * 1024B
      ElMessage.error("上传图片大小不能超过4MB!");
      return false;
    } else {
      return true;
    }
  } else {
    ElMessage.error("上传图片必须是JPG|PNG|GIF格式!");
    return false;
  }
};
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

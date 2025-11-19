<template>
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
</template>
<script lang="ts" setup>
import { ref } from "vue";

let emit = defineEmits(["changePage"]);
// 分页
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(0);
const changePage = async () => {
  emit("changePage", {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
};
</script>
<style scoped lang="scss"></style>

<template>
  <div>
    <h1>test axios 二次封装</h1>
  </div>
</template>
<script lang="ts" setup>
import request from "./utils/request";
import { onMounted } from "vue";
onMounted(() => {
  request({
    url: "user/login",
    method: "post",
    data: {
      userName: "adimin",
      password: "111111",
    },
  }).then((res) => {
    console.log(res);
  });
});
</script>
<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>

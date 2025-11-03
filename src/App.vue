<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { login } from "@/api/user/index";
onMounted(() => {
  login({
    userName: "adimin",
    password: "111111",
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

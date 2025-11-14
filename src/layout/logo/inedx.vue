<template>
  <div class="logo" v-if="!setting.logoHiden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script lang="ts" setup name="Logo">
//引入设置标题与logo配置文件
import setting from "@/setting";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding-top: 10px;
  margin-left: 15px;
  img {
    width: 48px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 15px;
    white-space: nowrap;
  }
}
</style>

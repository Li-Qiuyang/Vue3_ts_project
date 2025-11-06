<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
    </div>
    <!-- 顶部面包屑 -->
    <div class="layout_tabbar"></div>
    <!-- 主内容区域 -->
    <div class="layout_main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/layout/logo/inedx.vue";
</script>
<style scoped lang="scss">
.layout_container {
  height: 100vh;
  width: 100%;
  .layout_slider {
    width: $base-menu-width;
    color: white;
    height: 100vh;
    background-color: $base-menu-background;
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    background-color: blue;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    padding: 20px;
    left: $base-menu-width;
    background-color: pink;
    overflow: auto;
  }
}
</style>

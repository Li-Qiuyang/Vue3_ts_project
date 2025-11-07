<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="layoutSettingStore.fold ? 'fold' : ''">
      <Logo></Logo>
      <!-- 导航区 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          text-color="#fff"
          background-color="$base-menu-background"
          active-text-color="yellowgreen"
          router
          :default-active="route.path"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :routesList="routesStore.routes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="layoutSettingStore.fold ? 'fold' : ''">
      <Tabbar></Tabbar>
    </div>

    <!-- 主内容区域 -->
    <div class="layout_main" :class="layoutSettingStore.fold ? 'fold' : ''">
      <Main></Main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/layout/logo/inedx.vue";
import Menu from "@/layout/menu/index.vue";
import useRoutesStore from "@/store/routes";
import Main from "@/layout/main/index.vue";
import { useRoute } from "vue-router";
import Tabbar from "@/layout/tabbar/index.vue";
import useLayoutSettingStore from "@/store/setting";

const layoutSettingStore = useLayoutSettingStore();

const routesStore = useRoutesStore();
let route = useRoute();
</script>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss">
.layout_container {
  height: 100vh;
  width: 100%;
  .layout_slider {
    width: $base-menu-width;
    color: white;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      padding-top: 30px;

      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    padding: 20px;
    left: $base-menu-width;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>

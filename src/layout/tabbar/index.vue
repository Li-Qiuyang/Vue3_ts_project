<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <el-icon @click="fold">
        <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'" />
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <template v-for="item in route.matched">
          <el-breadcrumb-item :to="{ path: item.path }" v-if="item.meta.title">{{
            item.meta.title
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button size="small" :icon="Refresh" circle @click="refresh"></el-button>
      <el-button size="small" :icon="FullScreen" circle></el-button>
      <el-button size="small" :icon="Setting" circle></el-button>
      <img src="../../../public/logo.png" alt="" />
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowRight, Refresh, Setting, FullScreen } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import useLayoutSettingStore from "@/store/setting";

const layoutSettingStore = useLayoutSettingStore();
const route = useRoute();
const router = useRouter();
const handleLogout = () => {
  localStorage.setItem("token", "");
  router.push({ path: "/login" });
};

const fold = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
</script>
<style scoped lang="scss">
.tabbar-container {
  display: flex;
  justify-content: space-between;
  .tabbar-left {
    height: $base-tabbar-height;
    display: flex;
    align-items: center;
    .el-icon {
      margin: 0 10px;
    }
  }
  .tabbar-right {
    height: $base-tabbar-height;
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin: 0 10px;
    }
    .block-col-2 .demonstration {
      display: block;
      color: var(--el-text-color-secondary);
      font-size: 14px;
      margin-bottom: 20px;
    }

    .block-col-2 .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>

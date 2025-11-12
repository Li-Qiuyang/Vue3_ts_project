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
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button size="default" :icon="Refresh" circle @click="refresh"></el-button>
      </el-tooltip>
      <el-tooltip :content="isFull ? '退出全屏' : '全屏'" placement="bottom" effect="light">
        <el-button size="default" :icon="FullScreen" circle @click="fullScreen"></el-button>
      </el-tooltip>
      <el-tooltip content="设置" placement="bottom" effect="light">
        <el-button size="default" :icon="Setting" circle></el-button>
      </el-tooltip>
      <img :src="userStore.avatar" alt="" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
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
import useUserStore from "@/store/user";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();
const route = useRoute();
const router = useRouter();

const isFull = ref(false);

// 退出登录
const logout = async () => {
  // 向服务器发送退出登录请求
  // 仓库中关于用户相关的数据清空
  // 跳转登录页面
  try {
    await userStore.logout();
    router.replace({ path: "/login", query: { redirect: route.path } });
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};

const fold = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    isFull.value = true;
    document.documentElement.requestFullscreen();
  } else {
    isFull.value = false;
    document.exitFullscreen();
  }
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
      width: 40px;
      height: 40px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }
}
:deep(.fullscreen-transition) {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

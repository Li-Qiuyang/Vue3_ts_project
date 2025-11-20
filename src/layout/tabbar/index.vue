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
      <el-popover title="主题设置" placement="bottom" trigger="hover" width="300">
        <template #reference>
          <el-button size="default" :icon="Setting" circle></el-button
        ></template>
        <template #default>
          <el-form>
            <el-form-item label="主题颜色">
              <el-color-picker
                v-model="color"
                show-alpha
                :predefine="predefineColors"
                :teleported="false"
                @change="changeColor"
            /></el-form-item>
            <el-form-item label="暗黑模式">
              <el-switch
                v-model="dark"
                class="mt-2"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                @change="changeDark"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-popover>

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
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Moon, Sunny } from "@element-plus/icons-vue";

let dark = ref(false);

const color = ref("rgb(30, 144, 255)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
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

// 切换折叠状态
const fold = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};

// 刷新页面
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};

// 切换全屏状态
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

// 切换暗黑模式
const changeDark = () => {
  console.log(dark.value);

  let root = document.documentElement;
  console.log(root);
  console.log(dark.value);
  root.className = dark.value ? "dark" : "";
};

// 切换主题颜色
const changeColor = () => {
  const html = document.documentElement;
  // 设置 css 变量
  html.style.setProperty("--el-color-primary", color.value);
  html.style.setProperty("--el-color-warning", color.value);
  html.style.setProperty("--menu-active-text-color", color.value);

  // 在本地存储该颜色，在下次加载页面时读取储存的颜色
  localStorage.setItem("COLOR", color.value);
};

onMounted(() => {
  // 从本地读取上次储存的主题色
  color.value = localStorage.getItem("COLOR") || "rgba(30, 144, 255, 1)";
  changeColor();
});
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

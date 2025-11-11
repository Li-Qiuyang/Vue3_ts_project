<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, onMounted } from "vue";
import useLayoutSettingStore from "@/store/setting";
let layoutSettingStore = useLayoutSettingStore();

let flag = ref(true);

watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);

// 用户点击刷新按钮，refresh值变化
// watch监听到变化，执行回调
// 设置flag.value = false，导致路由组件被销毁
// 使用nextTick等待DOM更新完成
// 在nextTick回调中，设置flag.value = true，导致路由组件重新创建
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>

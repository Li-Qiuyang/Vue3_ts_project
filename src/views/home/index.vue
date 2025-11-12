<template>
  <el-card>
    <div class="user-info">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div>
        <h4>{{ time }}好！{{ userStore.username }}</h4>
        <div class="welcome">欢迎来到后台管理系统</div>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <SvgIcon name="welcome" width="800px" height="400px" />
  </div>
</template>
<script lang="ts" setup>
import useUserStore from "@/store/user";
import getTime from "@/utils/time";
import { ref } from "vue";
let userStore = useUserStore();
let time = ref(getTime());
</script>
<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  h4 {
    font: {
      size: 20px;
      weight: bold;
    }
  }
  .welcome {
    margin-top: 20px;
    font: {
      size: 12px;
      style: italic;
    }
    color: #666;
  }
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="top">
    <div class="left"><div class="title" @click="goHome">首页</div></div>
    <div class="middle">智慧旅游可视化大数据展示平台</div>
    <div class="right">
      <div class="report">统计报告</div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
defineProps({
  time: {
    type: String,
    default: "",
  },
});

// 首页跳转
const goHome = () => {
  router.push({ path: "/" });
};
</script>
<style scoped lang="scss">
.top {
  height: 60px;
  width: 100%;
  display: flex;

  padding-top: 20px;
  .left {
    height: 40px;
    width: 576px;
    background: url("@/assets/images/screen_header_bg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .title {
      font-size: 16px;
      color: #29fcff;
      width: 150px;
      height: 40px;
      background: url("@/assets/images/screen_header_left.png") no-repeat;
      background-size: 100% 100%;
      padding-right: 10px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
    }
  }
  .middle {
    height: 74px;
    line-height: 74px;
    text-align: center;
    font-size: 30px;
    width: 768px;
    background: url("@/assets/images/screen_header_center.png") no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    cursor: pointer;
  }
  .right {
    display: flex;
    justify-content: space-between;
    height: 40px;
    width: 576px;
    background: url("@/assets/images/screen_header_bg.png") no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    font-size: 14px;
    .report {
      font-size: 16px;
      color: #29fcff;
      width: 150px;
      height: 40px;
      background: url("@/assets/images/screen_header_right.png") no-repeat;
      background-size: 100% 100%;
      padding-right: 10px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
    }
    .time {
      width: 426px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
    }
  }
}
</style>

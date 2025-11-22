<template>
  <div class="tourist-container">
    <div class="tourist-top">
      <div class="title">实时游客统计</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
      <div class="tourist-num">可预约总量<span class="number">99999</span>人</div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.tourist-container {
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .tourist-top {
    color: #fff;
    font-size: 20px;
    padding-left: 10px;
    .tourist-num {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      .number {
        color: #ffb700;
        font-family: "Times New Roman";
        font-weight: bold;
        margin: 0 6px;
      }
    }
  }
}
</style>

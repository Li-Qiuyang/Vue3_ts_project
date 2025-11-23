<template>
  <div class="sex-container">
    <div class="sex-top">
      <div class="title">性别比例</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="sex-img">
      <div class="man">
        <div>男士</div>
        <img src="@/assets/images/screen_man.png" alt="" />
      </div>
      <div class="woman">
        <div>女士</div>
        <img src="@/assets/images/screen_woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <div>男士 60%</div>
      <div>女士 40%</div>
    </div>
    <div class="charts" ref="echart"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let echart = ref();
onMounted(() => {
  let mychart = echarts.init(echart.value);
  let option = {
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: "category", // 类目轴
    },
    series: [
      //数据
      {
        type: "bar",
        data: [100],
        barGap: "-100%", //向上偏移
        barWidth: 20, // 控制柱状图的宽度
        itemStyle: {
          // 控制柱状图的样式
          color: "#FF4B7A", // 颜色
          barBorderRadius: 20, // 圆角
        },
      },
      {
        type: "bar",
        z: 100, // 层级
        data: [60],
        barWidth: 20,
        itemStyle: {
          color: "#007AFE",
          barBorderRadius: 20,
        },
      },
    ],
    // 布局
    grid: {
      left: 40,
      right: 40,
      top: 0,
      bottom: 20,
    },
  };
  mychart.setOption(option);
});
</script>
<style scoped lang="scss">
.sex-container {
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .sex-top {
    color: #fff;
    font-size: 20px;
    padding-left: 10px;
    font-size: 24px;
  }
  .sex-img {
    display: flex;
    align-items: center;
    justify-content: center;
    .man {
      margin: 30px;
      width: 111px;
      height: 116px;
      display: flex;
      padding-bottom: 20px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: url("@/assets/images/screen_man_bg.png") no-repeat;
      background-size: 100% 100%;
      div {
        color: #fff;
        font-size: 15px;
      }
      img {
        width: 61px;
        height: 61px;
      }
    }
    .woman {
      margin: 30px;
      width: 111px;
      height: 116px;
      display: flex;
      padding-bottom: 20px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: url("@/assets/images/screen_woman_bg.png") no-repeat;
      background-size: 100% 100%;
      div {
        color: #fff;
        font-size: 15px;
      }
      img {
        width: 61px;
        height: 61px;
      }
    }
  }
  .rate {
    display: flex;
    align-items: center;
    padding: 0 110px;
    justify-content: space-between;
    div {
      color: #fff;
      font-size: 15px;
    }
  }
  .charts {
    width: 100%;
    height: 50px;
    margin-top: 20px;
  }
}
</style>

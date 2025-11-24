<template>
  <div class="age-container">
    <div class="age-top">
      <div class="title">年龄比例</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="charts" ref="echart"><</div>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let echart = ref();
onMounted(() => {
  let myChart = echarts.init(echart.value);
  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      // 图例位置
      orient: "vertical",
      top: 20,
      right: 20,
      // 图例组件垂直显示
      textStyle: {
        // 图例字体样式
        color: "#fff",
        fontSize: 12,
      },
    },
    series: [
      {
        color: ["#8C6FC4", "#E4B64C", "#E57824", "#0B7A86", "#064190", "#75BBE6"],
        name: "年龄比例",
        type: "pie",
        radius: ["45%", "80%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 4,
          fontSize: 24,
        },
        label: {
          // 饼图标签
          show: true,
          position: "center",
          formatter: "本日总数", // 格式化标签内容
          color: "rgba(255,255,255,.5)",
          fontSize: 14,
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 16, name: "10岁以下 16%" },
          { value: 10, name: "10-18岁 10%" },
          { value: 24, name: "18-30岁 24%" },
          { value: 18, name: "30-40岁 18%" },
          { value: 20, name: "40-60岁 20%" },
          { value: 12, name: "60岁以上 12%" },
        ],
      },
    ],
  });
});
</script>
<style scoped lang="scss">
.age-container {
  flex: 1;
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  .age-top {
    color: #fff;
    font-size: 20px;
    padding-left: 10px;
  }
  .charts {
    width: 100%;
    height: 200px;
  }
}
</style>

<template>
  <div class="tourist-container">
    <div class="top">
      <div class="title">年度游客量对比</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="chart" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let charts = ref();
onMounted(() => {
  let myChart = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "rgb(126,199,255)",
        },
      },
    },
    legend: {
      show: true,
      itemWidth: 30,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      right: 24,
    },
    grid: {
      top: "20%",
      left: "12%",
      right: "6%",
      bottom: "9%",
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgb(41,188,245)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgba(112, 151, 184, 1)",
            fontSize: 12,
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          // 隐藏刻度线
          show: false,
        },
        data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgb(41,188,245)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(112, 151, 184, 1)",
            fontSize: 14,
          },
        },
      },
    ],
    series: [
      {
        name: "2022",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 1,
          color: "#00ffa2", // 线条颜色
        },
        showSymbol: false,
        itemStyle: {
          color: "#00ffa2", //拐点颜色
          label: {
            show: true, //开启显示
            color: "#fff",
            position: "top", //在上方显示
            formatter: function (res: any) {
              if (res.value) {
                return res.value;
              } else {
                return 0;
              }
            },
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 渐变颜色
              {
                offset: 0,
                color: "rgba(36, 214, 214, 0.6)",
              },
              {
                offset: 1,
                color: "rgba(36, 214, 214, 0)",
              },
            ],
            global: false,
          },
        },
        data: ["130", "70", "130", "200", "290", "580", "156", "246", "144", "435", "78", "257"],
      },
      {
        name: "2023",
        type: "line",
        symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 1,
          color: "#3D84F7", // 线条颜色
        },
        itemStyle: {
          color: "#3D84F7", //拐点颜色
          label: {
            show: true, //开启显示
            color: "#fff",
            position: "top", //在上方显示
            formatter: function (res: any) {
              if (res.value) {
                return res.value;
              } else {
                return 0;
              }
            },
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 渐变颜色
              {
                offset: 0,
                color: "rgba(61, 132, 247, 0.6)",
              },
              {
                offset: 1,
                color: "rgba(61, 132, 247, 0)",
              },
            ],
            global: false,
          },
        },
        data: ["542", "230", "170", "510", "210", "420", "145", "95", "146", "357", "83", "452"],
      },
      {
        name: "2024",
        type: "line",
        showSymbol: false,
        symbol: "circle",
        smooth: true,
        lineStyle: {
          width: 1,
          color: "#EA02A5", // 线条颜色
        },
        itemStyle: {
          color: "#EA02A5", //拐点颜色
          label: {
            show: true, //开启显示
            color: "#fff",
            position: "top", //在上方显示
            formatter: function (res: any) {
              if (res.value) {
                return res.value;
              } else {
                return 0;
              }
            },
          },
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              // 渐变颜色
              {
                offset: 0,
                color: "rgba(234, 2, 165, 0.6)",
              },
              {
                offset: 1,
                color: "rgba(234, 2, 165, 0)",
              },
            ],
            global: false,
          },
        },
        data: ["153", "10", "428", "53", "451", "86", "344", "255", "98", "146", "183", "98"],
      },
    ],
  };
  myChart.setOption(option);
});
</script>
<style scoped lang="scss">
.tourist-container {
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .top {
    color: #fff;
    font-size: 22px;
    padding-left: 10px;
  }
  .chart {
    width: 100%;
    height: calc(100% - 80px);
  }
}
</style>

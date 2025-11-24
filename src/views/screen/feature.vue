<template>
  <div class="feature-container">
    <div class="feature-item">
      <div class="title">未来7天游客量趋势图</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let line = ref();
onMounted(() => {
  let myChart = echarts.init(line.value);
  myChart.setOption({
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ["10/09", "10/10", "10/11", "10/12", "10/13", "10/14", "10/15"],
      axisLine: {
        show: true,
        // lineStyle: {
        //   color: "#233653",
        // },
        symbol: ["none", "arrow"],
      },
      axisLabel: {
        fontSize: 14,
        color: "#7ec7ff",
        padding: 16,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 14,
        color: "#7ec7ff",
        margin: 16,
        formatter: function (value: any, index: number) {
          return value >= 10000 ? value / 10000 + "w" : value;
        },
      },
      axisLine: {
        show: true,
        // lineStyle: {
        //   color: "#233653",
        // },
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      top: "18%",
      left: "10%",
      right: "5%",
      bottom: "22%",
    },
    series: {
      type: "line",
      smooth: true,
      lineStyle: {
        width: 2,
        color: "rgba(25,163,223,1)",
      },
      showSymbol: false,
      symbolSize: 0,
      // emphasis: {
      //   focus: "series",
      // },
      areaStyle: {
        //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(25,163,223,.3)",
              },
              {
                offset: 1,
                color: "rgba(25,163,223, 0)",
              },
            ],
            false
          ),
        },
      },
      data: [
        "28000",
        "5832",
        "18000",
        "7600",
        "14625",
        "8625",
        "21568",
        "9826",
        "13568",
        "7953",
        "14523",
      ],
    },
  });
});
</script>
<style scoped lang="scss">
.feature-container {
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  .feature-item {
    color: #fff;
    font-size: 20px;
  }
  .charts {
    height: 200px;
    width: 100%;
    margin-top: 20px;
  }
}
</style>

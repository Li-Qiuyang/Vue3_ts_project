<template>
  <div class="map-container" ref="map"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import chinaJson from "./china.json";
let map = ref();

// 注册地图
echarts.registerMap("china", chinaJson as any);
const planePath = ref(
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z"
);
const points = ref([
  { value: [116.405285, 39.904989], itemStyle: { color: "#FFFA00" } },
  { value: [113.54909, 22.198951], itemStyle: { color: "#00EEFF" } },
  { value: [91.132212, 29.660361], itemStyle: { color: "#00EEFF" } },
  { value: [126.642464, 45.756967], itemStyle: { color: "#00EEFF" } },
  { value: [87.617733, 43.792818], itemStyle: { color: "#00EEFF" } },
  { value: [121.472644, 31.231706], itemStyle: { color: "#00EEFF" } },
  { value: [117.283042, 31.86119], itemStyle: { color: "#00EEFF" } },
]);
onMounted(() => {
  let myChart = echarts.init(map.value);
  myChart.setOption({
    // 地图组件
    geo: {
      map: "china",
      roam: true, // 是否开启放大缩小/拖拽功能
      // 地图位置
      left: 72,
      top: 66,
      right: 72,
      label: {
        show: true,
        color: "#fff", //标签颜色
        fontSize: 13,
      },
      itemStyle: {
        color: "#12235c",
        borderColor: "#2ab8ff",
        borderWidth: 0.5,
        shadowColor: "rgba(0,54,255, 0.4)", //阴影色
        // shadowOffsetX: 0,
        // shadowOffsetY: 0,
        shadowBlur: 100, //阴影模糊的大小
        // opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          color: "rgba(0,54,255, 0.4)",
        },
        label: {
          fontSize: 18,
          color: "#fff",
        },
      },
    },
    series: [
      {
        type: "lines",
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [113.54909, 22.198951],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [91.132212, 29.660361],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [87.617733, 43.792818],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [121.472644, 31.231706],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [117.283042, 31.86119],
            ],
          },
          {
            coords: [
              [113.54909, 22.198951],
              [117.283042, 31.86119],
            ],
          },
          {
            coords: [
              [121.472644, 31.231706],
              [126.642464, 45.756967],
            ],
          },
        ],
        effect: {
          show: true,
          period: 6, //箭头指向速度，值越小速度越快
          trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: planePath.value,
          symbolSize: 15, //图标大小
        },
        lineStyle: {
          color: "#00eaff",
          width: 1, //尾迹线条宽度
          opacity: 0.7, //尾迹线条透明度
          curveness: 0.3,
        },
      },
      {
        // 带有涟漪特效动画的散点（气泡）图
        type: "effectScatter",
        coordinateSystem: "geo", //布局在一个地理坐标系中
        showEffectOn: "render", //绘制完成后显示特效
        zlevel: 1,
        rippleEffect: {
          //涟漪特效相关配置。
          number: 3, // 波纹的数量。
          period: 5, // 动画的周期，秒数。
          scale: 17, // 动画中波纹的最大缩放比例。
          brushType: "fill", // 波纹的绘制方式，可选 'stroke' 和 'fill'。
        },
        symbolSize: 2,
        data: points.value,
      },
    ],
  });
});
</script>
<style scoped lang="scss"></style>

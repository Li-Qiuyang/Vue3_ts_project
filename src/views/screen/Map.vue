<template>
  <div class="map-container" ref="map"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let map = ref();

onMounted(() => {
  let myChart = echarts.init(map.value);
  myChart.setOption({});
});
</script>
<style scoped lang="scss"></style>

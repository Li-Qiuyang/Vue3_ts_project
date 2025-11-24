<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Top class="top" :time="time"></Top>
      <div class="main">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="middle">
          <Map class="map"></Map>
          <Feature class="feature"></Feature>
        </div>
        <div class="right">
          <HotPlace class="hot-place"></HotPlace>
          <YearTourist class="year-tourist"></YearTourist>
          <Data class="data"></Data>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
let screen = ref();
import Sex from "@/views/screen/sex.vue";
import Age from "@/views/screen/age.vue";
import Tourist from "@/views/screen/tourist.vue";
import Top from "@/views/screen/top.vue";
import Map from "@/views/screen/MAP/Map.vue";
import Feature from "@/views/screen/feature.vue";
import HotPlace from "@/views/screen/hotPlace.vue";
import YearTourist from "@/views/screen/yearTourist.vue";
import Data from "@/views/screen/data.vue";

let time = ref("");
let timer = ref(0);
// 数据大屏自适应宽高的解决方法
const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w;
  let wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
};

window.onresize = () => {
  screen.value.style.transform = `translate(-50%,-50%) scale(${getScale()})`;
};

// 时间格式化函数
const formatTime = (time: string | number) => {
  if (time.toString().length == 1) return "0" + time;
  return time;
};

// 获取时间
let getTime = () => {
  let now = new Date();
  time.value = `${formatTime(now.getFullYear())}-${formatTime(now.getMonth() + 1)}-${formatTime(
    now.getDate()
  )} ${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`;
};

timer.value = setInterval(() => {
  getTime();
}, 1000);

onMounted(() => {
  screen.value.style.transform = `translate(-50%,-50%) scale(${getScale()})`;
});

// 组件销毁时清除定时器
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background: url("@/assets/images/screen-bg.png") no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    height: 1080px;
    width: 1920px;
    top: 50%;
    left: 50%;
    /* 缩放参考点 */
    // transform-origin: left top;

    .main {
      display: flex;
      flex-direction: row;
      .left {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 1000px;
        .tourist {
          flex: 1.5;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .middle {
        flex: 1.8;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        .map {
          flex: 2.8;
        }
        .feature {
          flex: 1;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 1000px;
        .hot-place {
          flex: 1.3;
        }
        .year-tourist {
          flex: 1;
        }
        .data {
          flex: 1;
        }
      }
    }
  }
}
</style>

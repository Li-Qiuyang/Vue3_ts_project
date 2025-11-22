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
          <div class="map">111</div>
          <div class="feature">
            <div class="feature-item">
              <div class="title">未来30天游客量趋势图</div>
              <img src="@/assets/images/screen_title_tag.png" alt="" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="tourist">
            <div class="tourist-top">
              <div class="title">热门景区排行</div>
              <img src="@/assets/images/screen_title_tag.png" alt="" />
            </div>
          </div>
          <div class="sex">
            <div class="sex-top">
              <div class="title">年度游客量对比</div>
              <img src="@/assets/images/screen_title_tag.png" alt="" />
            </div>
          </div>
          <div class="age">
            <div class="age-top">
              <div class="title">预约渠道数据统计</div>
              <img src="@/assets/images/screen_title_tag.png" alt="" />
            </div>
          </div>
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
          display: flex;
          color: #fff;
          font-size: 20px;
          .feature-item {
            flex: 1;
            background: url("@/assets/images/screen_main_IB.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 1000px;
        .tourist {
          background: url("@/assets/images/screen_main_IB.png") no-repeat;
          background-size: 100% 100%;
          flex: 1.5;
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
        .sex {
          flex: 1;
          background: url("@/assets/images/screen_main_IB.png") no-repeat;
          background-size: 100% 100%;
          margin: 20px 0;
          .sex-top {
            color: #fff;
            font-size: 20px;
            padding-left: 10px;
          }
        }
        .age {
          flex: 1;
          background: url("@/assets/images/screen_main_IB.png") no-repeat;
          background-size: 100% 100%;
          .age-top {
            color: #fff;
            font-size: 20px;
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>

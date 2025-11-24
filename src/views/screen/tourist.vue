<template>
  <div class="tourist-container">
    <div class="tourist-top">
      <div class="title">实时游客统计</div>
      <img src="@/assets/images/screen_title_tag.png" alt="" />
      <div class="tourist-num">可预约总量<span class="number">99999</span>人</div>
    </div>
    <div class="number-container">
      <span v-for="(item, index) in number" :key="index" class="hasnumber">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
// 水球图拓展插件
import "echarts-liquidfill";
let number = ref("356872人");
let charts = ref();
// onMounted(() => {
//   //获取echarts类的实例
//   let mycharts = echarts.init(charts.value);
//   //设置实例的配置项
//   mycharts.setOption({
//     //标题组件
//     // title: {
//     //   text: "水球图",
//     // },
//     //x|y轴组件
//     xAxis: {},
//     yAxis: {},
//     //系列:决定你展示什么样的图形图标
//     series: {
//       type: "liquidFill", //系列
//       data: [0.4, 0.4, 0.4], //展示的数据
//       color: ["#16B4A5"],
//       itemStyle: {
//         opacity: 0.5,
//         shadowBlur: 20,
//         shadowColor: "rgba(22, 180, 165, 0.8)", // 内部阴影
//         shadowOffsetX: 0,
//         shadowOffsetY: 10,
//       },
//       backgroundStyle: {
//         borderWidth: 2,
//         borderColor: "#3595AB",
//         color: "#031E43",
//       },
//       label: {
//         formatter: "预约量",
//         fontSize: 17,
//         position: ["50%", "30%"],
//         color: "#fff",
//       },
//       outline: {
//         show: true,
//         borderDistance: 10,
//         shadowBlur: 20,
//         itemStyle: {
//           borderWidth: 3,
//           borderColor: "#16B4A5",
//           shadowBlur: 20,
//           // 上是虚线，下半部分是实线

//           borderType: [15, 8], // 虚线样式 [实线长度, 间隙长度]

//           shadowColor: "#16B4A5",
//         },
//       },
//       waveAnimation: true, //动画
//       animationDuration: 3,
//       animationDurationUpdate: 0,
//       radius: "95%", //半径
//     },
//     //布局组件
//     grid: {
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//     },
//   });
// });
onMounted(() => {
  // 获取echarts类的实例
  let mychart = echarts.init(charts.value);
  let option = {
    series: [
      {
        type: "liquidFill",
        radius: "60%", // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
        center: ["50%", "50%"],
        data: [
          0.4,
          0.4,
          0.42,
          {
            value: 0.4,
            direction: "left", //波浪方向
          },
        ], // data个数代表波浪数
        backgroundStyle: {
          borderWidth: 1,
          color: "rgba(62, 208, 255, 1)", // 球体本景色
        },
        amplitude: "6%", //波浪的振幅
        // 修改波浪颜色
        // color: ['#0286ea', 'l#0b99ff'], // 每个波浪不同颜色，颜色数组长度为对应的波浪个数
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "#6CDEFC",
              },
              {
                offset: 0,
                color: "#429BF7",
              },
            ],
            globalCoord: false,
          },
        ],
        label: {
          normal: {
            formatter: "预留量",
            fontSize: 15,
            color: "rgba(255,255,255,1)",
            position: ["50%", "20%"],
          },
        },
        outline: {
          show: false,
        },
      },
      {
        type: "pie",
        z: 1,
        center: ["50%", "50%"],
        radius: ["72%", "73.5%"], // 控制外圈圆的粗细
        hoverAnimation: false,
        data: [
          {
            name: "",
            value: 500,
            labelLine: {
              show: false,
            },
            itemStyle: {
              color: "#00AFFF",
            },
            emphasis: {
              labelLine: {
                show: false,
              },
              itemStyle: {
                color: "#00AFFF",
              },
            },
          },
        ],
      },
      {
        //外发光
        type: "pie",
        z: 1,
        zlevel: -1,
        radius: ["70%", "90.5%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            borderWidth: 20,
            color: "rgba(224,242,255,.05)",
          },
        },
        label: {
          show: false,
        },
        data: [100],
      },
      {
        //底层外发光
        type: "pie",
        z: 1,
        zlevel: -2,
        radius: ["70%", "100%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            borderWidth: 20,
            color: "rgba(224,242,255,.05)",
          },
        },
        data: [100],
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["78%", "80%"],
        z: 1,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: pie(),
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
  mychart.setOption(option);
});
const pie = () => {
  let dataArr = [];
  for (var i = 0; i < 150; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 50,
        itemStyle: {
          normal: {
            color: "#00AFFF",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 100,
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        },
      });
    }
  }
  return dataArr;
};
</script>
<style scoped lang="scss">
.tourist-container {
  background: url("@/assets/images/screen_main_IB.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .tourist-top {
    color: #fff;
    font-size: 20px;
    padding-left: 10px;
    .title {
      font-size: 22px;
    }
    .tourist-num {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      margin-top: 10px;
      .number {
        color: #ffb700;
        font-family: "Times New Roman";
        font-weight: bold;
        margin: 0 6px;
      }
    }
  }
  .number-container {
    margin-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    color: #29fcff;
    font-size: 32px;
    font-weight: bold;
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    display: flex;
    .hasnumber {
      background: url("@/assets/images/screen_tourist_num_bg.png") no-repeat;
      background-size: 100% 100%;
      flex: 1;
    }
  }
  .charts {
    width: 100%;
    height: 240px;
    margin-top: 8px;
  }
}
</style>

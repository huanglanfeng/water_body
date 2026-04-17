<template>
  <div id="echart1"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import type {form }from './type';

const init = () => {
  let chartDom = document.getElementById("echart1")!;
  let myChart = echarts.init(chartDom);
  var zhibiao = jsonObj?.waterQualityParameters;
  const option = {
    grid: {
      containLabel: true,
    },
    xAxis: {
      show: false,
      min: 0,
      max: 10
    },
    yAxis: {
      show: false,
      min: 0,
      max: 10
    },
    series: [
      {
      name: '最底层暗背景',
      type: 'gauge',
      center: ['50%', '50%'],
      radius: "80%",
      z: 12,
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      pointer: {
        show: false
      },
      anchor: {
        show: false,
        showAbove: true,
      },
      data: [{
        value: 100
      },],
      detail: {
        show: false
      },
      progress: {
        show: true,
        width: 32,
        itemStyle: {
          color: "rgba(50, 99, 234, 0.238)"
        }
      },
    }, {
      name: '最底层颜色背景',
      type: 'gauge',
      center: ['50%', '50%'],
      radius: "80%",
      z: 12,
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      pointer: {
        show: false
      },
      anchor: {
        show: false,
        showAbove: true,
      },
      data: [{
        value: 100
      },],
      detail: {
        show: false
      },
      progress: {
        show: true,
        width: 10,
        itemStyle: {
          color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'red'
              },
              {
                offset: 1,
                color: 'green'
              }
              ]
            }
        }
      },
    }, {
      name: '刻度线及刻度值',
      type: 'gauge',
      center: ['50%', '50%'],
      radius: "70%",
      z: 14,
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [
            [1, 'rgba(50, 164, 234)']
          ],
          width: 1,
        },
      },
      splitLine: {
        distance: 0,
        length: 8,
        lineStyle: {
          width: 1,
          color: '#FFF'
        },
      },
      axisLabel: {
        show: true,
        distance: 10,
        fontSize: 10,
        color: "#FFF",
        formatter: function (value: number) {
          return value % 20 == 0 ? value : '';
        }
      },
      axisTick: {
        distance: 0,
        length: 1,
        lineStyle: {
          color: 'rgba(250,214,57,0.6)',
        },
      },
      pointer: {
        show: false
      },
      anchor: {
        show: false,
        showAbove: true,
      },
      detail: {
        fontSize: 15,
        color: '#FFFFFFCC', // 数据详情颜色
        formatter: '水体质量',
        offsetCenter: ["0%", "90%"]
      },
      data: [{
        value: zhibiao
      },],

    }, {
      name: '进度条及指示器',
      type: 'gauge',
      center: ['50%', '50%'],
      radius: "80%",
      z: 30,
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      anchor: {
        show: false,
        showAbove: true,
      },
      detail: {
        show: false
      },
      data: [{
        value: zhibiao
      },],
      pointer: {
        show: true,
        length: '90%',
        width: 1,
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        itemStyle: {
          color: 'skyblue'
        }
      },
      progress: {
        show: true,
        width: 10,
        roundCap: true,
        itemStyle: {
          color:'rgba(250,214,57,0)'
        }
      },
    },
    {
      name: '渐变覆盖区',
      type: 'gauge',
      center: ['50%', '50%'],
      radius: "70%",
      z: 18,
      min: 0,
      max: 100,
      axisLine: {
        show: true,
        lineStyle: {
          width: 32,
          color: [
            [
              zhibiao / 100, new echarts.graphic.LinearGradient(
                0, 1, 1, 0, [{
                  offset: 0,
                  color: 'rgba(250,214,57,0)',
                }, {
                  offset: 0.3,
                  color: 'rgba(250,214,57,0)',
                },
                {
                  offset: 1,
                  color: 'rgba(50, 164, 234, 0.8)',
                }
              ]
              )
            ],
            [
              1, 'rgba(255, 36, 74,0)'
            ]
          ]
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      detail: {
        show: false
      },
      itemStyle: {
        color: 'rgba(255, 36, 74,.3)',
        borderColor: 'rgba(255, 36, 74,1)',
      },
      data: [{
        value: zhibiao
      },]
    },

    {
      name: '内圆暗色背景',
      type: 'pie',
      radius: '40%',
      center: ['50%', '50%'],
      z: 29,
      animation: true,
      itemStyle: {
        color: 'yellowblue',
        shadowColor: 'rgba(17,46,62,1)',
        shadowBlur: 0
      },
      hoverAnimation: true,
      label: {
        show: false,
        fontSize: 16,
        fontWeight: 400,
        color: "#FFF",
        position: 'center',
        formatter: "{c}{a|%}",
        rich: {
          a: {
            color: '#fff',
            fontSize: 10,
          }
        }
      },
      tooltip: {
        show: false,
      },
      data: [zhibiao],
    },
    {
      name: '内圆颜色背景及数值',
      type: 'pie',
      radius: '35%',
      center: ['50%', '50%'],
      z: 30,
      animation: true,
      itemStyle: {
        color: 'skyblue',
      },
      hoverAnimation: true,
      label: {
        show: true,
        fontSize: 40,
        fontWeight: 500,
        color: "#fff",
        position: 'center',
        formatter: "{c}{a|%}",
        rich: {
          a: {
            color: '#fff',
            fontSize: 20,
          }
        }
      },
      tooltip: {
        show: false,
      },
      data: [zhibiao],
    },

    ],
  }
    myChart.setOption(option, true);
  option && myChart.setOption(option);
}


const formData= ref<Array<form>>([]);
//读取本地的字符串数据
const getLocalData = localStorage.getItem('address');
//显示类型 这个时候是字符串类型
console.log(typeof (getLocalData));
var jsonObj = ref([formData]);
//将字符串类转换为json格式
if (getLocalData !== null) {
  jsonObj = JSON.parse(getLocalData);
  //从jsonObj中提取我们想要的数据
  // console.log(jsonObj.value?.name, 11111111111);
}

onMounted(async() => {
  init();
});
</script>

<style lang="less" scoped>
#echart1 {
  width: 300px;
  height: 200px;
  position: absolute;
  left: 20vw;
  top: 79vh;
}
</style>

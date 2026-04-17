<template>
  <div id="waterTP"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted ,ref} from "vue";
import type{form} from "../src/type.ts";
import {waterdata} from "@/api/index"

const init = () => {
  let chartDom = document.getElementById("waterTP")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  option = {
    legend: {
      textStyle: {
        color: '###a0a0a0'
      },
      top: '5%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#7B7DDC'
        }
      }
    },
    xAxis: {
      axisLabel: {
        formatter: '{value}'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(245, 238, 238, 0.996)',
        }
      },
      data: ['一', '二', '三', '四', '五', '六', '七']
    },
    yAxis: [
      {
        name: 'ml',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4',
          }
        },

        axisLabel: {
          formatter: '{value} ',
        },
      },
      {
        name: '℃',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4',
          }
        },

        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        type: 'bar',
        yAxisIndex: 0,
        name: '水量',
        stack: '水量',
        barWidth: 15,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#00f'
              },
              {
                offset: 1,
                color: '#0ff'
              }
              ]
            )
          }
        },
        data: [tableData.value[0]?.a1, 
        tableData.value[0]?.a2, 
        tableData.value[0]?.a3, 
        tableData.value[0]?.a4, 
        tableData.value[0]?.a5, 
        tableData.value[0]?.a6, 
        tableData.value[0]?.a7]
      },
      {
        type: 'line',
        name: '温度',
        smooth: true,
        yAxisIndex: 1,
        lineStyle:{
          color:"greenyellow"
        },
        data: [
          tableData.value[0]?.t1,
          tableData.value[0]?.t2,
          tableData.value[0]?.t3,
          tableData.value[0]?.t4,
          tableData.value[0]?.t5,
          tableData.value[0]?.t6,
          tableData.value[0]?.t7,
        ]
      }
    ],
    dataZoom: [ //给x轴设置滚动条
      {
        start: 0, //默认为0
        end: 50, //默认为100
        type: 'slider',
        show: false,
        xAxisIndex: [0],
        handleSize: 10, //滑动条的 左右2个滑动条的大小
        height: 0, //组件高度

      },
      //下面这个属性是里面拖到
      {
        type: 'inside',
        show: true,
        xAxisIndex: [0],
        start: 0, //默认为1
        end: 50 // 100 - 1500 / 31, //默认为100
      },
    ]
  };

  var timeOut = null
  autoMove()

  function autoMove() {
    timeOut = setInterval(() => {

      if (Number(option.dataZoom[0].end) > 100) {
        option.dataZoom[0].end = 50;
        option.dataZoom[0].start = 0;
      } else {
        option.dataZoom[0].end = option.dataZoom[0].end + 1 * (100 / option.series[0].data.length);
        option.dataZoom[0].start = option.dataZoom[0].start + 1 * (100 / option.series[0].data.length);
      }
      myChart.setOption(option);
    }, 2500);
  }
  
  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await waterdata({});
  tableData.value = res.data;
};

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#waterTP {
  width: 600px;
  height: 300px;
}
</style>

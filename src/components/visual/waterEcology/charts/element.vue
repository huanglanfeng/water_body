<template>
  <div id="Element"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import {element_O} from "@/api/index";
import type{form} from "../src/type";

const init = () => {
  let colorList = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#FF8B94"];
  let chartDom = document.getElementById("Element")!;
  let myChart = echarts.init(chartDom);
  let option: any;

  option = {
    legend: {
      icon: "cube",
      right: "0%",
      top:'0%',
      itemWidth: 6,
      itemGap: 5,
      textStyle: {
        color: "#fff",
        padding: [3, 0, 0, 0],
      },
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        color: "#000",
      },
    },
    grid: {
      top: "15%",
      left: "10%",
      bottom: "20%",
      right: "3%",
    },
    xAxis: [
      {
        type: "category",
        data: ["1", "2", "3", "4", "5"],
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#fff",
          },
          fontSize: 12,
          margin: 10,
        },
        axisPointer: {
          label: {
            padding: [0, 0, 0, 0],
            margin: 10,
            fontSize: 12,
          },
        },
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        name: "umol/L",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "无机盐",
        type: "line",
        data: tableData.value?.salt,
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: "#FF9B9B",
            },
            {
              offset: 1,
              color: "#FF6B6B",
            },
          ]),
          shadowColor: "rgba(255, 107, 107, .3)",
          shadowBlur: 5,
          shadowOffsetY: 5,
        },
        itemStyle: {
          normal: {
            color: colorList[0],
            borderColor: colorList[0],
          },
        },
      },
      {
        name: "有机化合物",
        type: "line",
        data: tableData.value?.organic,
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: "#7EDDD6",
            },
            {
              offset: 1,
              color: "#4ECDC4",
            },
          ]),
          shadowColor: "rgba(78, 205, 196, .3)",
          shadowBlur: 5,
          shadowOffsetY: 5,
        },
        itemStyle: {
          normal: {
            color: colorList[1],
            borderColor: colorList[1],
          },
        },
      },
      {
        name: "无机化合物",
        type: "line",
        data: tableData.value?.inorganic,
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: "#FFF09D",
            },
            {
              offset: 1,
              color: "#FFE66D",
            },
          ]),
          shadowColor: "rgba(255, 230, 109, .3)",
          shadowBlur: 2,
          shadowOffsetY: 2,
        },
        itemStyle: {
          normal: {
            color: colorList[2],
            borderColor: colorList[2],
          },
        },
      },
      {
        name: "重金属",
        type: "line",
        data:tableData.value?.metal,
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: "#C8F0DF",
            },
            {
              offset: 1,
              color: "#A8E6CF",
            },
          ]),
          shadowColor: "rgba(168, 230, 207, .1)",
          shadowBlur: 5,
          shadowOffsetY: 5,
        },
        itemStyle: {
          normal: {
            color: colorList[3],
            borderColor: colorList[3],
          },
        },
      },
      {
        name: "电导率",
        type: "line",
        data: tableData.value?.conductivity,
        symbolSize: 1,
        symbol: "circle",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
            {
              offset: 0,
              color: "#FFB3B8",
            },
            {
              offset: 1,
              color: "#FF8B94",
            },
          ]),
          shadowColor: "rgba(255, 139, 148, .5)",
          shadowBlur: 5,
          shadowOffsetY: 5,
        },
        itemStyle: {
          normal: {
            color: colorList[4],
            borderColor: colorList[4],
          },
        },
      },
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
const getData=(async()=>{
  let res=await element_O({});
  tableData.value=res.data;
})

onMounted(async() => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#Element {
  width: 100%;
  height: 100%;
}
</style>

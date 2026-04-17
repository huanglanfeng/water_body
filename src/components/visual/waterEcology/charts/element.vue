<template>
  <div id="Element"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import {element_O} from "@/api/index";
import type{form} from "../src/type";

const init = () => {
  let colorList = ["#46ea91", "#2ba0ff", "#ed593b", "#7357ff", "#f2d750"];
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
              color: "#90ffc6",
            },
            {
              offset: 1,
              color: "#46ea91",
            },
          ]),
          shadowColor: "rgba(144, 255, 198, .3)",
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
              color: "#67bcfc",
            },
            {
              offset: 1,
              color: "#2ba0ff",
            },
          ]),
          shadowColor: "rgba(105, 188, 252,.3)",
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
              color: "#fc937e ",
            },
            {
              offset: 1,
              color: "#ed593b",
            },
          ]),
          shadowColor: "rgb(252, 147, 126,.3)",
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
              color: "#a390ff",
            },
            {
              offset: 1,
              color: "#7357ff",
            },
          ]),
          shadowColor: "rgba(115, 87, 255, .1)",
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
              color: "#ffeb86",
            },
            {
              offset: 1,
              color: "#f2d750",
            },
          ]),
          shadowColor: "rgba(255, 235, 134, .5)",
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
  width: 550px;
  height: 250px;
}
</style>

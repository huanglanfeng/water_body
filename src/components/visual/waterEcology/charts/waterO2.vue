<template>
  <div id="waterO2"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted,ref } from "vue";
import { element_O } from "@/api/index";
import type { form } from "../src/type";

const init = () => {
  let chartDom = document.getElementById("waterO2")!;
  let myChart = echarts.init(chartDom);
  let option: any;

  let xData = [
    "0点",
    "1点",
    "2点",
    "3点",
    "4点",
    "5点",
    "6点",
    "7点",
    "8点",
  ];

  option = {
    grid: {
      top: "5%",
      bottom: "5%",
      right:'18%',
      left:'5%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
          margin: 3,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: ["5%", "5%"],
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#fff",
          margin: 6,
        },
        splitLine: {
          lineStyle: {
            color: "#fff",
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        name: "水质溶解氧",
        type: "line",
        smooth:true,
        stack: "总量",
        symbolSize: 6,
        itemStyle: {
          color: "#55EFF1",
          borderColor: "#55EFF1",
          borderWidth: 2,
        },
        data:tableData.value?.dissolve,
        markLine: {
          label: {
            position: "end",
            formatter: "{b}",
          },
          symbol: ["none", "none"], // 去掉箭头
          data: [
            {
              name: "Ⅰ类(>=7.5)",
              yAxis: "7.5",
            },
            {
              name: "Ⅱ类(>=6)",
              yAxis: "6",
            },
            {
              name: "Ⅲ类(>=5)",
              yAxis: "5",
            },
            {
              name: "Ⅳ类(>=3)",
              yAxis: "3",
            },
            {
              name: "Ⅴ类(>=2)",
              yAxis: "2",
            },
          ],
          lineStyle: {
            color: "#f00",
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
const getData = (async () => {
  let res = await element_O({});
  tableData.value = res.data;
  console.log(tableData.value.salt);

})

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#waterO2 {
  width: 400px;
  height: 200px;
  box-sizing: border-box;
}
</style>

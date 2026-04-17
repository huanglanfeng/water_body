<template>
  <div id="mid_line"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";
import type{form} from "../type";
import {weekGet} from "@/api/index";

const init = () => {
  let chartDom = document.getElementById("mid_line")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  let dataAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let data = [220, 182, 191, 234, 290, 330, 310];
  let dataShadow = [];

  option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 20
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.6, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
  };
  const zoomSize = 6;
  myChart.on('click', function (params) {
    // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);

const getData = (async () => {
  let res = await weekGet({});
  tableData.value = res.data;
})

onMounted(async() => {
  await getData;
  init();
})
</script>

<style lang="less" scoped>
#mid_line {
  position: relative;
  left: -60px;
  width: 1000px;
  height: 300px;
}
</style>

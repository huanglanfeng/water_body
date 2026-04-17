<template>
  <div id="main"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
const init = () => {
let chartDom = document.getElementById("main")!;
let myChart = echarts.init(chartDom);
let option: any;
let datas: { name: string; value: (number|Date)[]; }[] = [];
let now = new Date();
let oneDay = 1000;
for (var i = 0; i < 1000; i++) {
  datas.push(randomData());
}
let dataZoom = [
  {
    show: false,
    type: 'slider',
    filterMode: 'none',
    xAxisIndex: [0],
    start: 82,
    end: 100,
  },
];
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      animation: false,
    },
  },
    grid: {
      left: '5%',
      right: '3%',
      top: '10%',
      bottom: '15%',
      containLabel: true
    },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },
    axisLine: {
      onZero: false,
    },
    axisLabel: {
      showMaxLabel: true, //强制显示最后一个数据的刻度
      formatter: function (params: string|number|Date) {
        let date = new Date(params);
        let hour = date.getHours();
        let miu = date.getMinutes();
        let sec = date.getSeconds();
        return (
          (hour < 10 ? '0' + hour : hour) +
          ':' +
          (miu < 10 ? '0' + miu : miu) +
          ':' +
          (sec < 10 ? '0' + sec : sec)
        );
      },
    },
  },
  yAxis: {
    type: 'value',
    data: [-2, -1, 0, 1, 2],
    splitLine: false,
    axisLabel: {
      color: '#fff',
      },

  },
  dataZoom,
  series: [
    {
      name: 'Spectrum',
      type: 'line',
      showSymbol: false,
      data: datas,
      lineStyle: {
        normal: {
          width: 1,
        },
        emphasis: { width: 1 },
      },
      itemStyle: {
          normal: {
            color: 'orange',
          },
        },
      smooth: true
    },
  ],
};
function randomData() {
  now = new Date(+now + oneDay);
  return {
    name: now.toString(),
    value: [now, Math.random() * 4 - 2],
  };
}

setInterval(function () {
  for (let i = 0; i < 1; i++) {
    datas.shift();
    datas.push(randomData());
  }
  myChart.setOption({
    series: [
      {
        data: datas,
      },
    ],
  });
}, 1000);
option && myChart.setOption(option);
}
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
#main {
  width: 550px;
  height: 250px;
}
</style>
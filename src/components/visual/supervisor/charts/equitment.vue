<template>
  <div id="piewithT"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const init = () => {
  let chartDom = document.getElementById("piewithT")!;
  let myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: true,
      orient: 'vertical',
      icon: 'rect',
      textStyle: {
        color: '#FFF',
      },
      right: '10%',
      top: '5%',
    },
    color: ['#DB616F', '#00E045', '#F3EF00', '#25C1F1'],
    series: [
      {
        name: '设备统计',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          color: '#FFF',
          formatter: '{b}: {c}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#FFF',
          },
          scaleSize: 8,
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#FFF',
          },
        },
        data: [
          { name: '传感器', value: 420 },
          { name: '摄像头', value: 758 },
          { name: 'GPS', value: 353 },
          { name: '其他', value: 572 },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};

onMounted(async () => {
  init();
});
</script>

<style lang="less" scoped>
#piewithT {
  width: 100%;
  height: calc(100% - 32px);
}
</style>

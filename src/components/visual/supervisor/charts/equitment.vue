<template>
  <div id="piewithT"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";

let chartInstance: echarts.ECharts | null = null;

const init = () => {
  let chartDom = document.getElementById("piewithT")!;
  chartInstance = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,20,50,0.8)',
      borderColor: 'rgba(0,180,255,0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
    },
    legend: {
      show: true,
      orient: 'horizontal',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      bottom: '2%',
      textStyle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 11,
      },
    },
    color: ['#DB616F', '#4ECDC4', '#FFE66D', '#45B7D1'],
    series: [
      {
        name: '设备统计',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          color: 'rgba(255,255,255,0.7)',
          fontSize: 10,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
          },
          length: 10,
          length2: 8,
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

  option && chartInstance.setOption(option);
};

onMounted(() => { init(); });
onUnmounted(() => { chartInstance?.dispose(); });
</script>

<style lang="less" scoped>
#piewithT {
  width: 100%;
  height: calc(100% - 32px);
}
</style>

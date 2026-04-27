<template>
    <div id="TodayData1"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";

let chartInstance: echarts.ECharts | null = null;

const init = () => {
    let chartDom = document.getElementById("TodayData1")!;
    chartInstance = echarts.init(chartDom);

    const gaugeData = [
        { value: 21, name: '今日检测', title: { offsetCenter: ['0%', '70%'] },
          detail: { valueAnimation: true, offsetCenter: ['0%', '50%'] },
          itemStyle: { color: '#4ECDC4' } },
        { value: 305, name: '本月检测', title: { offsetCenter: ['0%', '-20%'] },
          detail: { valueAnimation: true, offsetCenter: ['0%', '0%'] },
          itemStyle: { color: '#45B7D1' } },
    ];

    const option = {
        series: [
            {
                type: 'gauge',
                center: ['25%', '55%'],
                radius: '70%',
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 500,
                splitNumber: 5,
                itemStyle: { color: '#4ECDC4' },
                progress: { show: true, width: 10, roundCap: true },
                pointer: { show: false },
                axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(78,205,196,0.15)']] } },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { fontSize: 11, color: 'rgba(255,255,255,0.5)', offsetCenter: ['0%', '70%'] },
                detail: {
                    fontSize: 20, fontWeight: 700, color: '#4ECDC4',
                    offsetCenter: ['0%', '45%'],
                    formatter: '{value}次',
                },
                data: [{ value: 21, name: '今日检测' }],
            },
            {
                type: 'gauge',
                center: ['75%', '55%'],
                radius: '70%',
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 500,
                splitNumber: 5,
                itemStyle: { color: '#45B7D1' },
                progress: { show: true, width: 10, roundCap: true },
                pointer: { show: false },
                axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(69,183,209,0.15)']] } },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: { fontSize: 11, color: 'rgba(255,255,255,0.5)', offsetCenter: ['0%', '70%'] },
                detail: {
                    fontSize: 20, fontWeight: 700, color: '#45B7D1',
                    offsetCenter: ['0%', '45%'],
                    formatter: '{value}次',
                },
                data: [{ value: 305, name: '本月检测' }],
            },
        ],
    };

    chartInstance.setOption(option);
};

onMounted(() => { init(); });
onUnmounted(() => { chartInstance?.dispose(); });
</script>

<style lang="less" scoped>
#TodayData1 {
    width: 100%;
    height: calc(100% - 32px);
}
</style>

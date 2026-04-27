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
    let v2L2Chart = {
        xData: ['今日检测', '本月已检测'],
        data: [21, 305],
        max: 500,
        color: ['rgba(119, 191, 255, 0.8)', 'rgba(0, 72, 203,1)',]
    };
    var option = {
        grid: {
            top: '20%',
            left: '5%',
            right: '10%',
            bottom: '25%',
            containLabel: true,
        },
        tooltip: {
            show: true,
            formatter: function (params: any) {
                let text = '<p style="font-size:13px;color:#fff;margin:0;">' +
                    '<span style="display:inline-block;width:8px;height:8px;background:' + v2L2Chart.color[params.dataIndex] + ';border-radius:50%;margin-right:8px;"></span>' +
                    v2L2Chart.xData[params.dataIndex] + '：' + v2L2Chart.data[params.dataIndex] + '次</p>';
                return text;
            },
            backgroundColor: 'rgba(38, 68, 110, 0.8)',
            borderColor: 'rgba(0,180,255,0.3)',
            textStyle: { color: '#fff' },
        },
        xAxis: {
            offset: 30,
            data: v2L2Chart.xData,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: '#00e5ff',
                fontSize: 13,
                fontWeight: 600,
            },
        },
        yAxis: {
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
        },
        series: [
            {
                name: '底部圆片',
                stack: 'a',
                type: 'effectScatter',
                symbolSize: [40, 20],
                symbolOffset: [0, 0],
                z: 22,
                data: [
                    { value: '0', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(253, 221, 97, 1)' }, { offset: 1, color: 'rgba(251, 171, 88, 1)' }]) } },
                    { value: '0', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(107, 255, 243, 1)' }, { offset: 1, color: 'rgba(8, 177, 255, 1)' }]) } },
                ],
            },
            {
                name: '柱状图',
                stack: 'a',
                type: 'bar',
                barWidth: 40,
                z: 2,
                barGap: '-100%',
                data: [
                    { value: '21', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(251, 171, 88, 0.8)' }, { offset: 1, color: 'rgba(253, 227, 100, 0.8)' }]) } },
                    { value: '305', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(8, 177, 255, 0.8)' }, { offset: 1, color: 'rgba(107, 255, 243, 0.8)' }]) } },
                ],
            },
            {
                name: '顶部标签',
                stack: 'a',
                type: 'pictorialBar',
                symbolSize: [40, 10],
                symbolOffset: [0, -8],
                z: 22,
                data: [
                    { value: '21', symbolPosition: 'end', label: { formatter: '{c} 次', color: '#fff', offset: [0, -5], show: true, position: 'top', fontSize: 12, fontWeight: 400 }, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(251, 171, 88, 1)' }, { offset: 1, color: 'rgba(253, 227, 100, 1)' }]) } },
                    { value: '305', symbolPosition: 'end', label: { formatter: '{c} 次', color: '#fff', offset: [0, -5], show: true, position: 'top', fontSize: 12, fontWeight: 400 }, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(8, 177, 255, 1)' }, { offset: 1, color: 'rgba(107, 255, 243, 1)' }]) } },
                ],
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

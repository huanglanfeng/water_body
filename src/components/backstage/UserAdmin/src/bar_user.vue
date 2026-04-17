<template>
    <div id="bar"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const init = () => {
    let chartDom = document.getElementById("bar")!;
    let myChart = echarts.init(chartDom);
    let option: any;

    var dataName = ['超级管理员', '管理员', '普通用户', '总共用户']
    var dataValue = [3, 20, 30, 53]
    option = {
        tooltip: {},
        grid: [{ x: '10%', y: '7%', width: '25%', height: '80%', left: 70 }],
        color: ['#73ACFF', '#DECD85', '#64B7FF', '#64B7EF'],
        xAxis: {
            show: false,
            type: 'value',
            gridIndex: 0,
        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: '12px',
                fontFamily: 'PingFangSC-Semibold, PingFang SC',
                fontWeight: 600,
                color: '#000',
                verticalAlign: 'middle',
                align: 'left',
                padding: [2, 2, 2, -50],
            },
            gridIndex: 0,
            data: dataName,
        },
        series: [
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent',
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent',
                    },
                },
                data: [dataValue[0], 0, 0, 0],
            },
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                barWidth: 20,
                label: {
                        show: true,
                        color: '#fff',
                        fontSize: '12px',
                        fontFamily: 'DINAlternate-Bold, DINAlternate',
                        fontWeight: 'bold',
                },
                itemStyle: {
                    barBorderRadius: 120,
                    color: (params) => {
                        // 首先定义一个数组
                        const colorList = ['#73ACFF', '#DECD85', '#64B7FF', '#64B7EF'];
                        return colorList[params.dataIndex];
                    },
                    // 以下为是否显示
                    label: {
                        show: false,
                    },
                },
                data: dataValue,
            },
            {
                type: 'pie',
                data: [
                    { value: dataValue[0], name: dataName[0] },
                    { value: dataValue[1], name: dataName[1] },
                    { value: dataValue[2], name: dataName[2] },
                    { value: dataValue[3], name: dataName[3] },
                ],
                radius: '50%',
                center: ['65%', '50%'],
            },
        ],
    };


    option && myChart.setOption(option);
};

onMounted(() => {
    init();
});
</script>

<style lang="less" scoped>
#bar {
    width: 400px;
    height: 200px;
}
</style>

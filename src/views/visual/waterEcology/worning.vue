<template>
    <div id="WorningVue"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const init = () => {
    let chartDom = document.getElementById("WorningVue")!;
    let myChart = echarts.init(chartDom);
    let option: any;

    function xWrapText(params, num = 2) {
        let newParamsName = ''
        const paramsNameNumber = params.length
        const provideNumber = num //一行显示几个字
        const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
        if (paramsNameNumber > provideNumber) {
            for (let p = 0; p < rowNumber; p++) {
                let tempStr = ''
                const start = p * provideNumber
                const end = start + provideNumber
                if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                } else {
                    tempStr = params.substring(start, end) + ''
                }
                newParamsName += tempStr
            }
        } else {
            newParamsName = params
        }
        return newParamsName
    }
    let xData = ['6月', '7月', '8月', '9月', '10月', '11月', '12月']
    let y1Data = [110, 90, 120, 70, 60, 52, 43]
    let y2Data = [15, 22, 13, 22, 13, 12, 19]
    option = {
        grid: {
            left: '9%',
            right: '7%',
            top: '20%',
            bottom: '18%',
        },
        title: {
            show: false,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#3A4667',
            borderColor: '#3A4667',
            textStyle: {
                color: '#fff'
            },
            axisPointer: {
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            data: ['报警增减比', '预警次数'],
            right: 'center',
            top: '6%',
            itemWidth: 11,
            itemHeight: 11,
            textStyle: {
                color: '#B3CFFF',
                fontSize: 12,
            },
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            show: true,
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 9.5,
                color: '#B3CFFF',
                formatter(params) {
                    const res = xWrapText(params, 6) // 文字换行处理
                    return params.length > 15 ? `${res.slice(0, 15)}...` : res
                },
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#4e608b', // 左边线的颜色
                    width: '1', // 坐标线的宽度
                },
            },
            data: xData,
        },],
        yAxis: [{
            type: 'value',
            scale: true,
            name: '',
            axisLine: {
                show: false,
            },
            splitNumber: 2,
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#4e608b', // 使用深浅的间隔色
                },
            },
            axisLabel: {
                fontSize: 12,
                color: '#B3CFFF',
                margin: 12,
            },
            min: 0,
            boundaryGap: [0.2, 0.2],
        },
        {
            type: 'value',
            scale: true,
            axisLine: {
                show: false,
            },
            splitNumber: 2,
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: '#B3CFFF',
                margin: 12,
                formatter: '{value}',
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#4e608b',
                },
            },
            name: '',
            min: 0,
            boundaryGap: [0.2, 0.2],
        },
        ],
        series: [{
            name: '报警增减比',
            yAxisIndex: 0,
            color: 'rgba(208, 222, 238, .5)',
            lineStyle: {
                color: 'rgba(208, 222, 238, .5)',
            },
            type: 'line',
            data: y1Data,
        },
        {
            name: '预警次数',
            type: 'bar',
            label: {
                normal: {
                    show: false
                },
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [{
                            offset: 0,
                            color: 'rgba(123, 133, 255, 1)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(96, 132, 255, 0)', // 100% 处的颜色
                        },
                        ],
                        false
                    ),
                },
            },
            barWidth: '20%',
            yAxisIndex: 1,
            data: y2Data,

        },

        ],
    }

    option && myChart.setOption(option);
};

// const tableData = ref<Array<form>>([]);
// const getData = (async () => {
//     let res = await element_O({});
//     tableData.value = res.data;
// })

onMounted(async () => {
    // await getData();
    init();
});
</script>

<style lang="less" scoped>
#WorningVue {
    width: 600px;
    height: 160px;
}
</style>

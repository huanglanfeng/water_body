<template>
    <div id="TodayData1"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const init = () => {
    let chartDom = document.getElementById("TodayData1")!;
    let myChart = echarts.init(chartDom);
    let v2L2Chart = {
        xData: ['今日检测', '本月已检测'],
        data: [21, 305],
        max: 500,
        color: ['rgba(119, 191, 255, 0.8)', 'rgba(0, 72, 203,1)',]
    };
    var option = {
        grid: {
            top: '15%',
            left: '0%',
            right: '5%',
            bottom: '40%',
        },
        tooltip: {
            show: true,
            formatter: function (params) {
                let text = '<p  style="font-size:16px;font-weight: 400;color:rgba(255, 255, 255, 1);margin-bottom: 20px;"><span style="display:inline-block;width:10px;height: 10px;background: ' + v2L2Chart.color[params.dataIndex] + ';border-radius: 50%;margin-right: 10px;"></span>' + v2L2Chart.xData[params.dataIndex] + '：' + v2L2Chart.data[params.dataIndex] + '次</p>';
                return text
            },
            backgroundColor: 'rgba(38, 68, 110, 0.5)',
            borderColor: 'rgba(38, 68, 110, 0)',
            textStyle: {
                color: '#fff',
            }
        },

        xAxis: {
            offset: 40,
            data: v2L2Chart.xData,
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: 'rgb(0, 255, 255)',
                    fontSize: 20,
                    fontWeight:600,
                },
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
        series: [
            //'最低下的圆片',
            {
                name: '最低下的圆片',
                stack: 'a',
                type: 'effectScatter',
                symbolSize: [50, 25],
                symbolOffset: [0, 0],
                z: 22,
                data: [
                    {
                        name: '',
                        value: '0',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(253, 221, 97,  1)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(251, 171, 88,   1)',
                                    },
                                ]),
                            },
                        },
                    },
                    {
                        name: '',
                        value: '0',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(107, 255, 243,  1)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(8, 177, 255, 1)',
                                    },
                                ]),
                            },
                        },
                    },
                ],
            },
            //下半截柱状图
            {
                name: '下半截柱状图',
                stack: 'a',
                type: 'bar',
                barWidth: 50,
                z: 2,
                barGap: '-100%',
                data: [
                    {
                        name: '',
                        value: '21',
                        itemStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    type: 'linear',
                                    global: false,
                                    colorStops: [
                                        {
                                            //第一节下面
                                            offset: 0,
                                            color: 'rgba(251, 171, 88, 0.8)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(253, 227, 100,0.8)',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    {
                        name: '',
                        value: '305',
                        itemStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    type: 'linear',
                                    global: false,
                                    colorStops: [
                                        {
                                            //第二个柱状图下面
                                            offset: 0,
                                            color: 'rgba(8, 177, 255, 0.8)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(107, 255, 243, 0.8)',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
            {
                name: '头部1',
                stack: 'a',
                type: 'pictorialBar',
                symbolSize: [50, 12],
                symbolOffset: [0, -10],
                z: 22,
                data: [
                    {
                        name: '',
                        value: '21',
                        symbolPosition: 'end',
                        label: {
                            formatter: '{c} 次',
                            color: '#fff',
                            offset: [0, -5],
                            show: true,
                            position: 'top',
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: 'zcool-gdh',
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(251, 171, 88, 1)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(253, 227, 100,  1)',
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                    },
                    {
                        name: '',
                        value: '305',
                        symbolPosition: 'end',
                        label: {
                            formatter: '{c} 次',
                            color: '#fff',
                            offset: [0, -5],
                            show: true,
                            position: 'top',
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: 'zcool-gdh',
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(8, 177, 255,   1)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(107, 255, 243,    1)',
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                    },
                ],
            },
        ],
    };


    option && myChart.setOption(option);
}
onMounted(async () => {
    init();
});
</script>

<style lang="less" scoped>
#TodayData1 {
    width: 100%;
    height: calc(100% - 32px);
}
</style>

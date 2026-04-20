<template>
    <div id="WornType"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const init = () => {
    let chartDom = document.getElementById("WornType")!;
    let myChart = echarts.init(chartDom);
    let data = [
        { name: '1月', value: 480, },
        { name: '2月', value: 170, },
        { name: '3月', value: 200, },
        { name: '4月', value: 105, },
        { name: '5月', value: 202, },
        { name: '6月', value: 270, },
        { name: '7月', value: 470, },
        { name: '8月', value: 420, predict: true, },
        { name: '9月', value: 200, predict: true, },
        { name: '10月', value: 270, predict: true, },
        { name: '11月', value: 70, predict: true, },
    ];

    let data1 = [];
    let data2 = [];

    data.forEach((item) => {
        if (item.predict) {
            data2.push([item.name, item.value]);
        } else {
            data1.push([item.name, item.value]);
        }
    });

    // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
    data2.unshift(data1[data1.length - 1]);

    let labels = data.map((m) => {
        return m.name;
    });

    var option = {
        title: {
            text: "次数",
            left: "8%",
            top: "0%",
            textStyle: {
                fontSize: 14,
                color: "white",
                fontWeight: "lighter"
            },
            textAlign: "right"
        },
        grid: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '32%',
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.8)',
            axisPointer: {
                label: {
                    show: true,
                    backgroundColor: '#0b1f56',
                    color: '#fff',
                    fontSize: 14
                },
                lineStyle: {
                    width: 2,
                    type: 'dashed',
                    color: 'rgba(230, 247, 255, 0.20)',//设置垂直x轴线的颜色
                }
            },
        },
        xAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
                margin: 15, // x轴距离文字距离,
                textStyle: {
                    fontFamily: 'Noto Sans SC',
                    color: 'lightblue',
                    fontSize: 14
                },
            },
            axisTick: {
                "show": false //隐藏x轴刻度
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: (val, key) => {
                    if (key % 2 == 0) {
                        return val
                    }
                },
                textStyle: {
                    fontFamily: 'Noto Sans SC',
                    color: 'lightblue',
                    fontSize: 12
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#43B7C4',
                    opacity: 0.25
                }
            },
        },
        series: [
            {
                name: '报警次数',
                type: 'line',
                showSymbol: false,
                data: data1,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: 'rgba(63, 218, 182, 8e-05)'
                        },
                        {
                            offset: 0,
                            color: 'rgba(0, 250, 255, 0.8)'
                        }
                    ])
                },
                lineStyle: {
                    width: 3,
                    color: "rgba(65, 228, 187, 1)",
                }
            },
            {
                name: '预测报警次数',
                type: 'line',
                showSymbol: false,
                lineStyle: {
                    type: 'dashed',
                    width: 3,
                    color: "rgba(255, 255, 255, 1)",
                },
                // symbol: 'none',
                data: data2,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 255, 255, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 255, 255,8e-05)'
                        }
                    ])
                }
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
#WornType {
    width: 100%;
    height: 100%;
}
</style>

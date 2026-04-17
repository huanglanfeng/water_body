<template>
    <div id="statistic"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const init = () => {
    let chartDom = document.getElementById("statistic")!;
    let myChart = echarts.init(chartDom);
    let option: any;
    let rq =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let seriesArr =[]
    let list =[{
            name: "增加成员",
            children: [100, 100, 100, 100, 80, 90, 100, 88, 88, 99, 100, 80]
        },
        {
            name: "删除成员",
            children: [50, 50, 40, 40, 35, 40, 30, 35, 30, 30, 25, 25]
        },
        {
            name: "修改信息",
            children: [75, 75, 55, 55, 45, 50, 40, 30, 35, 40, 50, 50]
        }
        ]
let colorArr =["0, 62, 246", "0, 193, 142", "253, 148, 67"]
list.forEach((val, index) => {
            seriesArr.push({
                name: val.name,
                type: 'line',
                symbolSize: 6,
                data: val.children,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: `rgba(${colorArr[index]},.2)`
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255,0)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: `rgb(${colorArr[index]})`
                    }
                },
                lineStyle: {
                    normal: {
                        width: 2,
                        shadowColor: `rgba(${colorArr[index]}, .2)`,
                        shadowBlur: 4,
                        shadowOffsetY: 25
                    }
                }
            })
        })
option = {
            backgroundColor: "#fff",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#000',
                }
            },
            legend: {
                right: "3%",
                top: "0%",
                textStyle: {
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 600
                },
                data: list.map(val => {
                    return val.name
                })
            },
            grid: {
                left: '0%',
                right: '5%',
                bottom: '0%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rq,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        type: "dashed",
                        color: ['#cfcfcf']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#cfcfcf'
                    }
                },
                axisLabel: {
                    // margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: "#9e9d9f",
                        fontWeight: 600
                    }
                }
            },
            yAxis: [{
                name: "(%)",
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: ['#cfcfcf']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        fontSize: 12,
                        color: '#cfcfcf',
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#9e9d9f",
                        fontWeight: 600
                    }
                },
                max: 100
            }],
            series: seriesArr
        };

    option && myChart.setOption(option);
};

onMounted(async () => {
    init();
});
</script>

<style lang="less" scoped>
#statistic {
    width: 400px;
    height: 200px;
}
</style>

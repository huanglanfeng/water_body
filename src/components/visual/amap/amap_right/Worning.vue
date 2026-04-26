<template>
  <div id="Worning_data"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const init = () => {
  let chartDom = document.getElementById("Worning_data")!;
  let myChart = echarts.init(chartDom);
    let dataX= ['3月1日', '3月4日', '3月7日', '3月10日', '3月13日', '3月16日', '3月19日', '3月22日']
let dataY =[98, 38, 48, 35, 92, 28, 93, 85]
let dataY1 =[400, 500, 300, 300, 300, 400, 400, 400, 300]
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none',
        },
        formatter: function (params) {
            return (
                dataX[params[0].dataIndex] +
                '<br/>解决率：' +
                dataY[params[0].dataIndex] +
                '%' +
                '<br> 处理量：' +
                dataY1[params[0].dataIndex] +
                ''
            );
        },
    },
    grid: {
        top: '15%',
        bottom: '10%',
        left: '5%',
        right: '3%',
        containLabel: true,
    },
    legend: {
        data: ['报警数', '解决率'],
        left: '50',
        top: '5',
        textStyle: {
            padding:[4,0,0,0],
            color: '#33FFFF',
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25,
    },
    xAxis: {
        type: 'category',
        data: dataX,
        axisLine: {
            lineStyle: {
                color: 'rgba(66, 192, 255, .3)',
            },
        },
        
        axisLabel: {
        rotate: -45,
            textStyle: {
                color: '#33FFFF',
            },
        },
    },

    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: '#5FBBEB',
                },
            },
            axisLine: {
                lineStyle: {
                    fontSize:12,
                    color: 'rgba(66, 192, 255, .3)',
                },
            },
        },
        {
            type: 'value',
            name: '(%)',
            nameTextStyle: {
                color: '#d2d2d2',
            },
            max:'100',
            min:'0',
            scale: true,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: 'rgba(66, 192, 255, .3)',
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                formatter: '{value} %', //右侧Y轴文字显示
                textStyle: {
                    fontSize:12,
                    color: '#42C0FF',
                },
            },
        },
    ],
    series: [
        {
            name: '报警数',
            type: 'bar',
            barWidth: '12px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#29acff',
                        },
                        {
                            offset: 1,
                            color: '#4bdfff',
                        },
                    ]),
                    barBorderRadius: 6,
                },
            },
            data: dataY1,
        },
        {
            name: '解决率',
            type: 'line',
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, //平滑曲线显示

            symbol: 'circle', //标记的图形为实心圆
            symbolSize: 8, //标记的大小
            itemStyle: {
                normal: {
                    color: '#ffa43a',
                    borderColor: 'rgba(255, 234, 0, 0.5)', //圆点透明 边框
                    borderWidth: 5,
                },
            },
            lineStyle: {
                color: '#ffa43a',
            },

            data: dataY,
        },
    ],
};

    option && myChart.setOption(option);
}
onMounted(async() => {
  init();
});
</script>

<style lang="less" scoped>
#Worning_data{
  width: 100%;
  height: calc(100% - 32px);
}
</style>

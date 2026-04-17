<template>
    <div class="content">
        <div id="water03"></div>
        <span>在线人数</span>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入

const init = () => {
    let chartDom = document.getElementById("water03")!;
    let myChart = echarts.init(chartDom);
    let option: any;
    function Pie() { // 外层虚线圈数据
        let dataArr = [];
        for (var i = 0; i < 150; i++) {
            if (i % 2 === 0) {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 50,
                    itemStyle: {
                        color: '#19A4BB',
                        borderWidth: 0,
                        borderColor: 'rgba(0,0,0,0)',
                    },
                });
            } else {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 100,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        borderColor: 'rgba(0,0,0,0)',
                    },
                });
            }
        }
        return dataArr;
    }
    const rate = 0.6
    option = {
        // backgroundColor: '#081736',
        polar: {
            radius: ['75%', '80%'],
            center: ['50%', '50%'],
        },
        angleAxis: {
            max: 100,
            clockwise: false,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            { // 水波球
                // value: 50, //  内容 配合formatter
                type: 'liquidFill',
                name: '26人',
                radius: '70%', // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
                center: ['50%', '50%'],
                data: [
                    rate,
                    rate,
                    rate
                ], // data个数代表波浪数
                backgroundStyle: {
                    borderWidth: 1,
                    color: 'rgba(62, 208, 255, 1)', // 球体本景色
                },
                amplitude: '6%', //波浪的振幅
                color: [
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 1,
                                color: '#6CDEFC',
                            },
                            {
                                offset: 0,
                                color: '#429BF7',
                            },
                        ],
                        globalCoord: false,
                    },
                ],
                label: {
                    formatter: '{a}',
                    fontSize: 24,
                    color: '#fff',
                },
                outline: {
                    show: false,
                },
            },
            { // 外层虚线环
                type: 'pie',
                zlevel: 0,
                silent: true,
                radius: ['76%', '78%'],
                z: 1,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: Pie(),
            },
            { // 进度条环
                name: '',
                type: 'bar',
                roundCap: true,
                z: 2,
                showBackground: false,
                data: [rate * 100],
                coordinateSystem: 'polar',
                barWidth: 30, //大的占比环
                itemStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                            offset: 0,
                            color: '#19A4BB',
                        },
                        {
                            offset: 1,
                            color: '#22C7DA',
                        },
                    ]),
                },
            },
        ],
    };
    myChart.setOption(option, true);
    option && myChart.setOption(option);
}
onMounted(async() => {
  await  init();
});
</script>

<style lang="less" scoped>
.content{
    width: 150px;
    height: 200px;

    #water03 {
        width: 150px;
        height: 150px;
    }
    span{
        font-size: larger;
        color: #aaa;
        font-weight: 600;
        position: relative;
        left:37px
    }
}
</style>
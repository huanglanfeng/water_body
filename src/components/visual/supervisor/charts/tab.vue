<template>
    <div id="echart4"></div>
</template>

<script lang="ts" setup>
import { tabData } from "@/api";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const init = () => {
    let chartDom = document.getElementById("echart4")!;
    let myChart = echarts.init(chartDom);
    let dataArray = {
        xdataName: [
        dataValue.value[0]?.site, 
        dataValue.value[1]?.site, 
        dataValue.value[2]?.site, 
        dataValue.value[3]?.site, 
        dataValue.value[4]?.site, 
        dataValue.value[5]?.site, 
        dataValue.value[6]?.site, 
        dataValue.value[7]?.site,
        dataValue.value[8]?.site,
        dataValue.value[9]?.site,
        dataValue.value[10]?.site,
    ],
        contractnum: [
            dataValue.value[0]?.amount,
            dataValue.value[1]?.amount,
            dataValue.value[2]?.amount,
            dataValue.value[3]?.amount,
            dataValue.value[4]?.amount,
            dataValue.value[5]?.amount,
            dataValue.value[6]?.amount,
            dataValue.value[7]?.amount,
            dataValue.value[8]?.amount,
            dataValue.value[9]?.amount,
            dataValue.value[10]?.amount,
        ]
    }


    let color2 = [
        [{
            offset: 0,
            color: '#ff8881'
        }, {
            offset: 0.15,
            color: '#ff564c'
        }, {
            offset: 1,
            color: 'rgba(255,86,76, 0.08)'
        }],
        [{
            offset: 0,
            color: '#fff9e1'
        }, {
            offset: 0.15,
            color: '#ffe376'
        }, {
            offset: 1,
            color: 'rgba(255,209,26, 0.08)'
        }],
        [{
            offset: 0,
            color: '#f7ff98'
        }, {
            offset: 0.15,
            color: '#efff37'
        }, {
            offset: 1,
            color: 'rgba(239,255,55, 0.08)'
        }],
        [{
            offset: 0,
            color: '#32ffee'
        }, {
            offset: 0.15,
            color: '#cdfffb'
        }, {
            offset: 1,
            color: 'rgba(50,255,238, 0.1)'
        }],
        [{
            offset: 0,
            color: '#ff8881'
        }, {
            offset: 0.15,
            color: '#ff564c'
        }, {
            offset: 1,
            color: 'rgba(255,86,76, 0.08)'
        }],
        [{
            offset: 0,
            color: '#fff9e1'
        }, {
            offset: 0.15,
            color: '#ffe376'
        }, {
            offset: 1,
            color: 'rgba(255,209,26, 0.08)'
        }],
        [{
            offset: 0,
            color: '#f7ff98'
        }, {
            offset: 0.15,
            color: '#efff37'
        }, {
            offset: 1,
            color: 'rgba(239,255,55, 0.08)'
        }],
        [{
            offset: 0,
            color: '#32ffee'
        }, {
            offset: 0.15,
            color: '#cdfffb'
        }, {
            offset: 1,
            color: 'rgba(50,255,238, 0.1)'
        }],
        [{
            offset: 0,
            color: '#ff8881'
        }, {
            offset: 0.15,
            color: '#ff564c'
        }, {
            offset: 1,
            color: 'rgba(255,86,76, 0.08)'
        }],
        [{
            offset: 0,
            color: '#fff9e1'
        }, {
            offset: 0.15,
            color: '#ffe376'
        }, {
            offset: 1,
            color: 'rgba(255,209,26, 0.08)'
        }],
        [{
            offset: 0,
            color: '#f7ff98'
        }, {
            offset: 0.15,
            color: '#efff37'
        }, {
            offset: 1,
            color: 'rgba(239,255,55, 0.08)'
        }],
        [{
            offset: 0,
            color: '#32ffee'
        }, {
            offset: 0.15,
            color: '#cdfffb'
        }, {
            offset: 1,
            color: 'rgba(50,255,238, 0.1)'
        }],
    ]

    // tooltip
    let tooltip = {
        trigger: 'axis',
        textStyle: {
            fontSize: 18
        },
        axisPointer: {
            type: 'cross',//横轴显示
            label: {
                backgroundColor: '#283b56'
            }
        },
        formatter: (v: [any]) => {
            let [a] = v
            return `
            <div class='u-p-2'>
                <div>${a.name}：${a.value}</div>
            </div>
        `
        }
    }

    // grid
    let grid = {
        top: '5%',
        left: '10%',
        right: '0%',
        bottom: '10%'
    }

    // xAxis
    let xAxis = {
        type: 'category',
        boundaryGap: true,
        data: dataArray.xdataName,
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#fff'
            },
            rotate: 0
        },
        axisTick: {
            show: false
        }, //坐标轴刻度
    }

    // yAxis
    let yAxis = {
        type: 'value',
        scale: true,
        min: 0,
        name: '人数/地图',
        nameTextStyle: {
            color: '#fff',
            fontSize: 12,
            padding: [0, 0, 0, -35]
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        }
    }

    let dataZoom = [ //给x轴设置滚动条
        {
            start: 0, //默认为0
            end: 50, //默认为100
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            handleSize: 10, //滑动条的 左右2个滑动条的大小
            height: 0, //组件高度

        },
        //下面这个属性是里面拖到
        {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 0, //默认为1
            end: 50 // 100 - 1500 / 31, //默认为100
        },
    ]

    // series
    let series = [{
        name: '中高风险地区',
        type: 'pictorialBar',
        barWidth: 40,
        // 三角矢量柱状图
        symbol: 'path://M-0.000,431.000 C59.528,394.477 61.000,-0.000 61.000,-0.000 C61.000,-0.000 62.472,394.477 122.000,431.000 L-0.000,431.000 Z',
        // 是否裁剪图形
        symbolClip: false,
        data: dataArray.contractnum,
        itemStyle: {
            color: params => {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, color2[params.dataIndex])
            }
        },
        label: {
            show: true,
            position: 'top',
            formatter: params => {
                return params.name

            },
            textStyle: {
                fontSize: 16,
                color: '#fff'
            }
        },
    }]

    // 渲染
    const option = {
        tooltip,
        grid,
        xAxis,
        yAxis,
        series,
        dataZoom,
        
    }

    //自己滚动图表
    var timeOut = null
    myChart.on('mouseover', stop);
    myChart.on('mouseout', goMove);
    autoMove()

    function autoMove() {
        timeOut = setInterval(() => {

            if (Number(option.dataZoom[0].end) > 100) {
                option.dataZoom[0].end = 50;
                option.dataZoom[0].start = 0;
            } else {
                option.dataZoom[0].end = option.dataZoom[0].end + 1 * (100 / option.series[0].data.length);
                option.dataZoom[0].start = option.dataZoom[0].start + 1 * (100 / option.series[0].data.length);
            }
            myChart.setOption(option);
        }, 2500);
    }
    //鼠标按住停止滚动
    function stop() {
        clearInterval(timeOut)
    }
    //鼠标松开继续滚动
    function goMove() {
        autoMove()

    }
    option && myChart.setOption(option);
}
const dataValue=ref();
const getData=(async()=>{
    let res=await tabData({});
    dataValue.value=res.data;
    console.log(dataValue.value,113546);
    
})

onMounted(async() => {
    await getData();
    init();
});
</script>

<style lang="less" scoped>
#echart4 {
    width: 600px;
    height: 300px;
}
</style>

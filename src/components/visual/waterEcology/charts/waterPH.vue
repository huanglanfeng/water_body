<template>
  <div id="waterPH"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted,ref } from "vue";
import { waterdata } from "@/api/index"
import type { form } from "../src/type.ts";

const init = () => {
  let chartDom = document.getElementById("waterPH")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  let rq = [1, 2, 3, 4, 5, 6, 7]
  let bblList = [
    tableData.value[0]?.p1,
    tableData.value[0]?.p2,
    tableData.value[0]?.p3,
    tableData.value[0]?.p4,
    tableData.value[0]?.p5,
    tableData.value[0]?.p6,
    tableData.value[0]?.p7,
  ]
  let bslList = [
    tableData.value[1]?.p1,
    tableData.value[1]?.p2,
    tableData.value[1]?.p3,
    tableData.value[1]?.p4,
    tableData.value[1]?.p5,
    tableData.value[1]?.p6,
    tableData.value[1]?.p7,
  ]
  let rzrfsylList = [6.3, 5.9, 3.2, 6.1, 5.4, 6.0]
  option = {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: '#black',
      }
    },
    legend: {
      right: "3%",
      textStyle: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 600
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: rq,
      boundaryGap: false,
      splitLine: {
        show: false,
        interval: 'auto',
        lineStyle: {
          color: ['#606060']
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
    },
    yAxis: [{
      type: 'value',
       splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          fontSize: 14,
          color: '#fff',
        }
      },
    },
    {
      splitLine: {
        show: false,
      },
    },
    ],
    series: [{
      yAxisIndex: 0,
      name: '鄱阳湖',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      data: bblList,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(23, 227, 114,.5)'
          }, {
            offset: 1,
            color: 'rgba(23, 227, 114,.0)'
          }], false)
        }
      },
      itemStyle: {
        normal: {
          color: '#15ee6e'
        }
      },
      lineStyle: {
        normal: {
          width: 1
        }
      }
    }, {
      yAxisIndex: 0,
      name: '瑶湖',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      data: bslList,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 54, 0,0.5)'
          }, {
            offset: 1,
            color: 'rgba(255, 54, 0,.0)'
          }], false)
        }
      },
      itemStyle: {
        normal: {
          color: '#ff3600'
        }
      },
      lineStyle: {
        normal: {
          width: 1
        }
      }
    }, {
      yAxisIndex: 1,
      name: '鱼尾洲',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      data: rzrfsylList,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0, 115, 237,0.5)'
          }, {
            offset: 1,
            color: 'rgba(102, 235, 244,.0)'
          }], false)
        }
      },
      itemStyle: {
        normal: {
          color: '#0073ed'
        }
      },
      lineStyle: {
        normal: {
          width: 1
        }
      }
    }],
        dataZoom: [ //给x轴设置滚动条
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
  };

  var timeOut = null
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

  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await waterdata({});
  tableData.value = res.data;
};

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less">
#waterPH {
  width: 600px;
  height: 300px;
}
</style>

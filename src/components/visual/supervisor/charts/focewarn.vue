<template>
  <div id="focewarn"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted,ref } from "vue";
import type { form } from "../type";
import { focewarning } from "@/api/index";

const init = () => {
  let chartDom = document.getElementById("focewarn")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  let data1 = tableData.value?.mental;
  let data2 = tableData.value?.organism;
  let data3 = tableData.value?.radiation;
  let data4 = tableData.value?.garbage;
  let xData = ['1', '2', '3', '4', '5'];
  let cp = ['重金属', '微生物', '射线', '垃圾'];

  option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '3%',
      right: '0%',
      textStyle: {
        fontSize: 11,
        color: '#FFFFFF',
      },
    },
      grid: {
      left: '11%',
      right: '3%',
      top: '15%',
      bottom: '22%',
    },
    xAxis: [{
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
        // fontSize: 10,
      },
      data: xData,
    },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show:false,
          // lineStyle: {
          //   type: 'dashed',
          //   color: 'rgba(255,255,255,0.5)'
          // }
        },
        axisLabel: {
          color: '#fff',
          // fontSize: 15,
        },
      },
    ],
    series: [
      {
        name: cp[0],
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            color: '#F7DD32',
          },
        },
        markPoint: {
          symbolSize: 0,
          label: {
            backgroundColor: 'rgba(0,160,221,0.3)',
            borderRadius: 200,
            formatter: [
              '    {d|●}',
              ' {a|{c}}',
              '    {b|}'
            ].join(''),
            rich: {
              d: {
                color: 'inherit',
              },
              a: {
                color: '#fff',
                align: 'center',
              },
              b: {
                width: 1,
                height: 1,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left'
              },
            }
          },

          data: [
            {
              type: 'max',
              name: '最大值',
            },
            {
              type: 'min',
              name: '最小值',
            },
          ],
        },
        data: data1,
      },
      {
        name: cp[1],
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            color: '#0DDBA8',
          },
        },
        markPoint: {
          symbolSize: 0,
          label: {
            backgroundColor: 'rgba(0,160,221,0.3)',
            borderRadius: 200,
            formatter: [
              '    {d|●}',
              ' {a|{c}}',
              '    {b|}'
            ].join(''),
            rich: {
              d: {
                color: 'inherit',
              },
              a: {
                color: '#fff',
                align: 'center',
              },
              b: {
                width: 1,
                height: 1,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left'
              },
            }

          },

          data: [
            {
              type: 'max',
              name: '最大值',
            },
            {
              type: 'min',
              name: '最小值',
            },
          ],
        },
        data: data2,
      },
      {
        name: cp[2],
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            color: '#1298EB',
          },
        },
        markPoint: {
          symbolSize: 0,
          label: {
            backgroundColor: 'rgba(0,160,221,0.3)',
            borderRadius: 200,
            formatter: [
              '    {d|●}',
              ' {a|{c}}',
              '    {b|}'
            ].join(''),
            rich: {
              d: {
                color: 'inherit',
              },
              a: {
                color: '#fff',
                align: 'center',
              },
              b: {
                width: 1,
                height: 1,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left'
              },
            }

          },
          data: [
            {
              type: 'max',
              name: '最大值',
            },
            {
              type: 'min',
              name: '最小值',
            },
          ],
        },
        data: data3,
      },
      {
        name: cp[3],
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            color: '#7348FF',
          },
        },
        markPoint: {
          showSymbol: true,
          symbolSize: 0,
          label: {
            backgroundColor: 'rgba(0,160,221,0.3)',
            borderRadius: 200,
            formatter: [
              '    {d|●}',
              ' {a|{c}}',
              '    {b|}'
            ].join(''),
            rich: {
              d: {
                color: 'inherit',
              },
              a: {
                color: '#fff',
                align: 'center',
              },
              b: {
                width: 1,
                height: 1,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left'
              },
            }

          },

          data: [
            {
              type: 'max',
              name: '最大值',
            },
            {
              type: 'min',
              name: '最小值',
            },
          ],
        },
        data: data4,
      },
    ],
    dataZoom :[ //给x轴设置滚动条
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
  
  myChart.setOption(option, true);
  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);
const getData = (async () => {
  let res = await focewarning({});
  tableData.value = res.data;
})

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#focewarn {
  width: 400px;
  height: 240px;
}
</style>

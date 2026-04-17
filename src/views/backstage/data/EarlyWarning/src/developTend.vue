<template>
  <div id="developTend"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted,ref } from "vue";
import type { form } from "../type";
import { develop } from "@/api/index";

const init = () => {
  let chartDom = document.getElementById("developTend")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  setTimeout(function () {
    option = {
      title: {
        left: '10%',
        text: '趋势预测',
        textStyle: {
          fontSize: 18,
          color: '#000' // 设置标题的字体大小为18px
        }
      },
      legend: {
        right:'20%',
        icon:'cobe',
        top:'5%',
        textStyle: {
          color: '#000',
        },
      },
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['2017', '2018', '2019', '2020', '2021', '2022'],
          tableData.value?.excellent,
          tableData.value?.good,
          tableData.value?.pollute,
          tableData.value?.serious,
        ]
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#000' // 设置 x 轴的颜色为白色
          }
        },
      },
      yAxis: {
        gridIndex: 0,
        axisLine: {
          lineStyle: {
            color: '#000' // 设置 y 轴的颜色为白色
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed' // 将 x 轴的横线改为虚线
          }
        }
      },
      
      grid: { top: '48%' },
      series: [
        {
          name:'优',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
        },
        {
          name:'良',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          name:'污染',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          name:'严重污染',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '28%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{d}%',
            color:'#000'
          },
          encode: {
            value: '2017',
            tooltip: '2017'
          }
        }
      ]
    };
    myChart.on('updateAxisPointer', function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: ' {d}%'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    myChart.setOption(option);
  });


  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);
const getData = (async () => {
  let res = await develop({});
  tableData.value = res.data;
  console.log(tableData.value);
})

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#developTend {
  width: 450px;
  height: 360px;
}
</style>

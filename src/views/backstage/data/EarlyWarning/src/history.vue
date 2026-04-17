<template>
  <div id="history"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted ,ref} from "vue";
import type { form } from "../type";
import { history } from "@/api/index";

const init = () => {
  let colors = [
    'rgba(53, 232, 30, 0.4)',
    'rgba(53, 232, 30, 0.3)',
    'rgb(154, 205, 50,0.5)',
    'rgba(167, 238, 62, 0.25)',
    'rgba(12, 242, 161, 0.25)', 
    'rgba(222, 242, 49, 0.4)', 
    'rgba(225,225,0,0.5)', 
    'rgba(243, 187, 56, 0.35)', 
    'rgb(255, 165, 0,0.5)', 
    'rgba(245, 116, 10, 0.45)'];

  let chartDom = document.getElementById("history")!;
  let myChart = echarts.init(chartDom);
  let option: any;

  option = {
    title: {
      left: '10%',
      text: '历史记录',
      textStyle: {
        fontSize: 18,
        color: '#000' // 设置标题的字体大小为18px
      }
    },
    tooltip: {
      trigger: 'axis'
    },

    xAxis: {
      axisLabel: {
        color: '#000' // 设置x轴标签的字体颜色为白色
      },
      data: ['1', '2', '3', '4', '5', '6', '7'],
    },
    yAxis: {
      axisLabel: {
        color: '#000' // 设置y轴标签的字体颜色为白色
      }
    },
     grid: { top: '13%' },
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle:{
          color:'red'
        },
        markArea: {
          silent: true,
          data: [
            [
              {
                name: '一级',
                yAxis: 0,
                itemStyle: {
                  color: colors[0],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 10,
              },
            ],
            [
              {
                name: '二级',
                yAxis: 10,
                itemStyle: {
                  color: colors[1],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 20,
              },
            ],
            [
              {
                name: '三级',
                yAxis: 20,
                itemStyle: {
                  color: colors[2],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 30,
              },
            ],
            [
              {
                name: '四级',
                yAxis: 30,
                itemStyle: {
                  color: colors[3],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 40,
              },
            ],
            [
              {
                name: '五级',
                yAxis: 40,
                itemStyle: {
                  color: colors[4],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 50,
              },
            ],
            [
              {
                name: '六级',
                yAxis: 50,
                itemStyle: {
                  color: colors[5],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 60,
              },
            ],
            [
              {
                name: '七级',
                yAxis: 60,
                itemStyle: {
                  color: colors[6],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 70,
              },
            ],
            [
              {
                name: '八级',
                yAxis: 70,
                itemStyle: {
                  color: colors[7],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 80,
              },
            ],
            [
              {
                name: '九级',
                yAxis: 80,
                itemStyle: {
                  color: colors[8],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 90,
              },
            ],
            [
              {
                name: '十级',
                yAxis: 90,
                itemStyle: {
                  color: colors[9],
                },
                label: {
                  position: 'insideLeft',
                },
              },
              {
                yAxis: 100,
              },
            ],
          ],
        },
        data: tableData.value?.level,
      },
    ],
  };


  option && myChart.setOption(option);
};

const tableData = ref<Array<form>>([]);
const getData = (async () => {
  let res = await history({});
  tableData.value = res.data;
})

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#history {
  width: 450px;
  height: 300px;
}
</style>

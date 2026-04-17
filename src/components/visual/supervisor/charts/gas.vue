<template>
  <div id="gas"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import type { form } from "../type";
import { gas } from "@/api/index";

const init = () => {
  let chartDom = document.getElementById("gas")!;
  let myChart = echarts.init(chartDom);
  let option: any;
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      icon:"cube",
      itemWidth: 6,
      top: '0%',
      right:"0%",
      textStyle: {
        color: 'white',
        fontSize: 10,
      },
    },
    grid: {
      left: '5%',
      right: '3%',
      top:'17%',
      bottom: '15%',
      containLabel: true
    },
    textStyle: {
      color: 'white'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show:false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      },
    },
    series: [
      {
        name: '氨气',
        type: 'line',
        smooth: true,
        data: tableData.value?.ammonia,
      },
      {
        name: '二氧化硫',
        type: 'line',
        smooth: true,
        data: tableData.value?.sulfur,
      },
      {
        name: '硫化氢',
        type: 'line',
        smooth: true,
        data: tableData.value?.hydrogen,
      },
      {
        name: '二氧化氮',
        type: 'line',
        smooth: true,
        data: tableData.value?.nitrogen,
      },
      {
        name: '一氧化碳',
        type: 'line',
        smooth: true,
        data: tableData.value?.carbon,
      }
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

  var timeOut: number|null|undefined = null
  // myChart.on('mouseover', stop);
  // myChart.on('mouseout', goMove);
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
  // //鼠标按住停止滚动
  // function stop() {
  //   clearInterval(timeOut)
  // }
  // //鼠标松开继续滚动
  // function goMove() {
  //   autoMove()
  // }

  option && myChart.setOption(option);

  // let current = -1;
  // let dataLen1 = option.series[0].data.length;
  // setInterval(() => {
  //   // 取消之前高亮的图形
  //   myChart.dispatchAction({
  //     type: "downplay",
  //     seriesIndex: 0,
  //     dataIndex: current,
  //   });
  //   current = (current + 1) % dataLen1;
  //   // 高亮当前图形
  //   myChart.dispatchAction({
  //     type: "highlight",
  //     seriesIndex: 0,
  //     dataIndex: current,
  //   });
  //   // 显示 tooltip
  //   myChart.dispatchAction({
  //     type: "showTip",
  //     seriesIndex: 0,
  //     dataIndex: current,
  //   });
  // }, 2000);
};


const tableData = ref<Array<form>>([]);
const getData = (async () => {
  let res = await gas({});
  tableData.value = res.data;
})

onMounted(async () => {
  await getData();
  init();
});
</script>

<style lang="less" scoped>
#gas {
  width: 550px;
  height: 250px;
}
</style>

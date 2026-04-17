<template>
  <div id="echart2"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import type { form } from './type';

const init = () => {
  let chartDom = document.getElementById("echart2")!;
  let myChart = echarts.init(chartDom);
  const data = [
    { value: jsonObj?.alertNumber, name: '现存预警',itemStyle: { color: '#fac858' } },
    { value: jsonObj?.alertLevel, name: '预警等级' , itemStyle: { color: '#ee6666' } },
    { value: jsonObj?.alertNumber, name: '总次数' , itemStyle: { color: '#73c0de' } }
  ]
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '预警详情',
        type: 'pie',
        radius: ['25%', '55%'],
        avoidLabelOverlap: false,
        hoverAnimation: true,
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        data
      },
      // {
      //   name: '预警详情',
      //   type: 'pie',
      //   radius: ['34%', '40%'],
      //   avoidLabelOverlap: false,
      //   hoverAnimation: false,
      //   silent: true,
      //   label: {
      //     formatter: '({d}%)'
      //   },
      //   data
      // },
      {
        type: 'custom',
        coordinateSystem: 'none',
        silent: true,
        data: [0],
        renderItem(params: any, api: { getWidth: () => number; getHeight: () => number; }) {
          //环形图半径
          const r = Math.min(api.getWidth(), api.getHeight()) / 2
          //圆心
          const center = {
            x: api.getWidth() / 2,
            
            y: api.getHeight() / 2
          }
          //大圆半径
          const rBig = r * 0.9
          //小圆半径
          const rSmall = r * 0.75
          //大圆上的扇形
          const bigSector = []
          const smallSector = []
          const circleOnCircle = [] //小圆上携带的小圆圈
          const sectorSize = 60 //扇形长度（弧度）
          const sectorInterval = 30 //扇形与扇形之间的间隔
          const BigStartAngle = 310 //大扇形起始角度
          for (let i = 0; i < 4; i++) {
            const startAngle = ((i * (sectorInterval + sectorSize) + BigStartAngle) * Math.PI) / 180
            const endAngle = startAngle + (sectorSize * Math.PI) / 180
            const smallStartAngle = (Math.PI / 180) * (280 + angle + i * (sectorSize + sectorInterval))
            const smallEndAngle = smallStartAngle + (sectorSize * Math.PI) / 180
            bigSector.push({
              type: 'sector',
              shape: {
                cx: center.x,
                cy: center.y,
                r: rBig,
                r0: rBig * 0.93,
                startAngle,
                endAngle
              },
              style: {
                fill: '#55EAF1',
                lineWidth: 2
              }
            })
            smallSector.push({
              type: 'sector',
              shape: {
                cx: center.x,
                cy: center.y,
                r: rSmall * 0.93,
                r0: rSmall * 0.87,
                startAngle: smallStartAngle,
                endAngle: smallEndAngle
              },
              style: {
                fill: '#14769f',
                lineWidth: 2
              }
            })
            circleOnCircle.push({
              type: 'circle',
              shape: {
                cx: getCirclePoint(center.x, center.y, rSmall, 270 + i * 90 - angle).x,
                cy: getCirclePoint(center.x, center.y, rSmall, 270 + i * 90 - angle).y,
                r: 6
              },
              style: {
                fill: '#19ECFF',
                stroke: '#19ECFF',
                lineWidth: 2
              }
            })
          }
          return {
            type: 'group',
            children: [
              {
                type: 'group',
                children: [
                  ...bigSector,
                  {
                    // 外圆环
                    type: 'arc',
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rBig
                    },
                    style: {
                      fill: 'transparent',
                      stroke: '#55EAF1',
                      lineWidth: 2
                    }
                  }
                ]
              },
              {
                //内圆环
                type: 'group',
                children: [
                  ...smallSector,
                  ...circleOnCircle,
                  {
                    //内圆
                    type: 'arc',
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rSmall
                    },
                    style: {
                      fill: 'transparent',
                      stroke: '#55EAF1',
                      lineWidth: 2
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  }


  //获取圆上某点的坐标(x0、y0表示坐标，r半径，angle角度)
  function getCirclePoint(x0: number, y0: number, r: number, angle: number) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
    return {
      x: x1,
      y: y1
    }
  }

  //添加旋转动画
  let timer: number|null
  let angle = 0
  function play() {
    angle += 3
    option && myChart.setOption(option)
    if (timer) return
    timer = setTimeout(() => {
      requestAnimationFrame(play)
      timer = null
    }, 28)
  }

  //过渡完成后开始动画
  myChart.on('finished', () => {
    play()
  })
  myChart.setOption(option, true);
  option && myChart.setOption(option);
}

const formData = ref<Array<form>>([]);
//读取本地的字符串数据
const getLocalData = localStorage.getItem('address');
//显示类型 这个时候是字符串类型
console.log(typeof (getLocalData));
var jsonObj = ref([formData]);
//将字符串类转换为json格式
if (getLocalData !== null) {
  jsonObj = JSON.parse(getLocalData);
  //从jsonObj中提取我们想要的数据
}

onMounted(async () => {
  init();
});
</script>

<style lang="less" scoped>
#echart2 {
  width: 330px;
  height: 220px;
}
</style>

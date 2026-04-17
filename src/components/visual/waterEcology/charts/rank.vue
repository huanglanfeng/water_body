<template>
  <div id="main" style="width: 500px; height: 200px;left:80px"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
type EChartsOption = echarts.EChartsOption;

const init = () => {
  let chartDom = document.getElementById("main")!;
  let myChart = echarts.init(chartDom);
  let option: any;

  var listData = [
    { value: 40, name: '鄱阳湖' },
    { value: 30, name: '赣江' },
    { value: 19, name: '瑶湖' },
  ];
  const img3 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAPCAYAAABut3YUAAACjklEQVRIiZ3Uv25cVRAG8N/YFpFw7GSNDAhREC8VDUiOoKGMW8o8gl2y3foR4m4pzSMkEv9KTINSIKG4oEkVb0AICaKQjZwEKUAYinPu9d31ggkj3T13Z+bMfOf75tzITPMsfHRUXgb91pmjA2y0vhxtYh+bNeMQO2JweKpgjq5hG72adzV9OO6mLMxFcmIbcrT/L/Hr2MDl+mzgYA6QKxjiBvo171Tds8DAdi0222CjFt0Tg8PKxh56Nda1CXaxKwZjhZnZHEtnABl3TtGfiTXFJjNNm9iJBAXoYecQm+3/jp3FzBgfO1uu/2aF4SNlbnafFwwx2Kmgts2h9rksBl9hrdb7XzMDO3Xtgmlk6HV8vZlYsRxdkaNhBTRRJNo0Y3Hhy891L3dIieOt748wFoOtWnBfYWfcudoN5Vt1+0FtuFbjQ2WOerimSHMDtzBZPbjUb/qFsMD878wpO5Gra1er71Z9xh1gKoChGOwpszdUZmZS9mYlIMq6/PVnC1gRXsCv+KskqIhPw21jWdeoOc2GmhHI1teNt3UWkpeC3/Fo6el5bwsrNfgbjjJNRN1XC2SnRVR4mQVIUzobAO2J//lAuIg3gxeRmR4v5QV9Yv2khMuVoTvJXTxsdlcIbUtJtkx0c6bfO76LuET0yfVOLHE/Fu99uix8IL1HnBOZpUM9U3gs8y5+xi94gOPi9yee4pmwKOOc8iE9j1Wska/gVeUmLpsSLQJ/4Bvyi1h88kkj/greF96V3hHW6kBEq3zz21AzHUtTLDUD1VWp0TsfEN+R38q4KfIRxOKz6zNSZsEWXibekvmG8DrxGtbJXqV7uTK4Wg6YcFyWeCLyoXJr7hM/kT/iB9wm7k0LWPb/DS9M/Btd/0fjAAAAAElFTkSuQmCC';
  const img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAPCAYAAABut3YUAAAClUlEQVRIiZWUzU4UURCFv4MT1CDKiP9pYxhdudEEohuXuHWnkReAxBeQR5D4BPAALnTnFlbGhTEQd7owjC7aREVnCGqMv8fFrW7ujBORk77p7ltVt06dqm5sM3CVrLtknQwuWc73XDLpklWXONaqSyYZAJfMuqQTfh2XTPfnHBoUmKHlksV/2O8DLWAqVgtYHkCkCSwCa8BhoBvvPdiJDMCsS6YHJGhF8gUVrKlgDVgAmmHrxzwwr4IusBKxPWjsQKQdQYvA2T5bdVg32+tmtna1GQQWMr/p3F5hJ2XawBI7t+u/4bJu7dxuyaCCuSA1ywBpd0lkFrgOLKlgZddkAlUVOZlK5ma21+yz5USmSe1eiQL/gmZm9uUh9dO9u9/WgbYKrsZhiyR12irS/MRn3oTkQ3xJKjgc9ttAVwVLme/ZmCFmbu4DbefOlDHJUq0+1tvtynEj9lZjtTNiAHeA26FKK8hU/xojR96UW7fm9g4Bo4ZhwUfDb4JORS+HIZ2hbR3Vb487NpKyfWOrDhIM2Ywjf8f61Dg+7guI0bB/NX4JbKZoIYPjdAmMEcoamqcXuHZMN7u3suodmphziP3BfKtRnHQLcyzTYQqxgVmH36+ATar0Ajs9W1WlQUggu5ekkoqutfMYMAE6Bz4Ccrokw4aWHzRGsK9ZXMYMC7CIGxi+KM3CW+Ad0AFtGX8W/AS+Ab8weyz2ChqYA4iDpF//cdAJ8IThQN7yoPgDeIJ5qBeP6hkeRVzBXAIuIsbrwqvAkF1IPYMRA5C8VVvycYr2GlmgDuYZ8BR4DHwCUOd5agK1FDHZcAw4D5wBTgOnjI8iNYXHbEbC75BTi2y0ldqpL7Y3hbrgD6A3hhJ4DTwXfl/NVVYUfwAziEz38N+3aQAAAABJRU5ErkJggg==';
  const img1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAPCAYAAABut3YUAAACUUlEQVRIib2TvU+TURjFf6dWiUGQWmnUOEhhcjAmEF1cTGQ2vIkmDq7wJ7AxOIl/gXR3cXgdGWB00EQGFycsMSZGBS0C0ajgceh929uXSmMwnuTm5vm6z3k+rmzTFU/0GkAJo5nKKUtANdM5ZRxYAMaDywowo4SVbk865TFwC6gx5Zm8vdCdSQtVpywcYH8MVIGJcKrAUg8if0QvMgDTTrnR5fFqSD6vhJXQjXmgFGx5lIDJw5Cph7tbd7KEjUjXyNlaUMKkEpYPS6ZG73H9E/QckxJmAqlpulT8X8kEZJsfk8lGWIp0pZztr1Ccm6qAgOyHq3ndu9t2UsKyU2o0u5Pp6k6pA7NOW7swCzSUNMk4bcm1fOK5pNKZ03FndDDraFwxbgfdi3DqdP6Y+4HgfjjKGUjpwZ1yARhA9AEbwK/MwYCUC8zEnK4jQd4WyTlTAVMGfgDbxfLg3iXDIE2nbxarMo3c1OIC2gWFxPGUyflkRkeymnIJGBMcD+E7xeGh3THBsNukJ4ANwSqwZtiMi3X2og0Siik6IijjEKFAzXgINCIYNT6d471ePFPaWwTftHVVcMzCar5/HYzRjuQ1o/fYHyQ+G23J3gHtWnzH7AFHJPdhFS1OYA8iylgV8FmkEXA/blbQ6q75KXhmsai1h0ezcgeAa4grmMuCU9GCyc32OjeqVmtsIYU6jBUa6bh5YCEhf7J5KfHc8FRm24C2HhXaC9G53RXEReACcB5zDjGMGQJKSP3B8WQU+yVEfwU2QQ3wOuYd8BZ4A7xCfNyXE/gNPwLqz1THNfMAAAAASUVORK5CYII=';

  option = {
    legend: {
      show: true,
      top:'3%',
      right:'20%',
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      top: '10%',
      left: '5%',
      right: '15%',
      bottom: '0%'
    },
    tooltip: {
      show: true,
      formatter: params => {
        console.log(params)
        if (params.componentSubType === 'bar' && params.seriesName !== '背景条') {
          return `${params.seriesName}<br />${params.data.name}:${params.data.value}`
        } else {
          return ''
        }
      }
    },
    xAxis: {
      splitLine: {
        show: false,
      },
      axisLabel: {
        margin: 10,
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      inverse: true,
      type: 'category',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        width: 10,
        padding: [-60, 0, 0, 60],
        align: 'left',
        formatter: (name, index) => {
          const id = index + 1;
          if (id < 4) {
            return `{icon${id}|}{icon${id}|}{name|${name}}`;
          } else {
            return `{category|}{count|${id}}{name|${name}}`;
          }
        },
        rich: {
          category: {
            width: 35
          },
          icon1: {
            width: 35,
            height: 15,
            align: 'center',
            backgroundColor: {
              image: img1,
            },
          },
          icon2: {
            width: 35,
            height: 15,
            align: 'center',
            backgroundColor: {
              image: img2,
            },
          },
          icon3: {
            width: 35,
            height: 15,
            align: 'center',
            backgroundColor: {
              image: img3,
            },
          },
          count: {
            padding: [0, 0, 0, 0],
            width: 35,
            height: 15,
            color: '#A4E8E8',
            align: 'center',
            fontSize: 15,
            fontFamily: 'DIN',
            fontWeight: 500,
            fontStyle: 'italic',
          },
          name: {
            width: 80,
            fontSize: 15,
            align: 'left',
            color: '#fff',
            fontFamily: 'Source Han Sans CN',
            fontWeight: 500,
          },
        },
      },
      axisTick: {
        show: false
      },
      data: listData.map(item => item.name)
    },
    series: [{
      name: "江西储水量",
      type: 'bar', //pictorialBar
      barWidth: '30%',
      itemStyle: {
        normal: {
          borderWidth: 0,
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#052a32'
            }, {
              offset: 1,
              color: '#00ffe9'
            }]
          }
        },
        barBorderRadius: 10
      },
      data: listData,
      z: 1
    },
    ]
  };
  option && myChart.setOption(option);
};

onMounted(() => {
  init();
});
</script>

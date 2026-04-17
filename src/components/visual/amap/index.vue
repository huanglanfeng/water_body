<template>
  <div class="contain">
    <div class="time">
      <timeVue></timeVue>
    </div>
    <div class="Top">
      <ButtonVue></ButtonVue>
    </div>
    <div class="Down">
      <div class="Left">
        <div class="BasicalData">
          <staticData></staticData>
        </div>
        <div class="down_right">
          <dv-borderBox12>
            <chartsTitleVue title="预警统计"></chartsTitleVue>
            <WorningDataVue></WorningDataVue>
          </dv-borderBox12>
        </div>
      </div>
      <div class="Middle">
        <div class="left_area">
          <leftAreaVue></leftAreaVue>
        </div>
        <div class="map">
          <dv-borderBox2>
            <amapMiddleVue></amapMiddleVue>
          </dv-borderBox2>
        </div>
      </div>
      <div class="Right">
        <rightAreaVue></rightAreaVue>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import rightAreaVue from "./RightAera/index.vue";
import amapMiddleVue from "./amap_middle/amap.vue";
import staticData from "./staticData.vue";
import ButtonVue from "./Button.vue";
import timeVue from "@/views/visual/supervisor/time.vue";
import WorningDataVue from "./amap_right/Worning.vue"
import chartsTitleVue from "./chartsTitle.vue"
import leftAreaVue from './amap_left/leftArea.vue';
import { onMounted, onUnmounted, ref, provide } from 'vue';

// 自动刷新相关
const refreshKey = ref(0);
const REFRESH_INTERVAL = 30000; // 30秒刷新一次
let refreshTimer: number | null = null;

// 触发刷新的方法
const triggerRefresh = () => {
  refreshKey.value++;
};

// 启动自动刷新
const startAutoRefresh = () => {
  refreshTimer = window.setInterval(() => {
    triggerRefresh();
  }, REFRESH_INTERVAL);
};

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
};

// 提供刷新key给子组件使用
provide('refreshKey', refreshKey);

onMounted(() => {
  startAutoRefresh();
});

onUnmounted(() => {
  stopAutoRefresh();
});
</script>

<style lang="less" scoped>
.contain{
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  .time {
      position: absolute;
      top: 0.5vh;
      left: 1vw;
    }
    .Top{
      width: 100vw;
      height: 10vh;
      position: absolute;
      top: 4vh;
      z-index: 9999;
    }
    .Down{
      width: 100vw;
      height: 87vh;
      margin-top: 2vh;
      display: flex;
      flex-direction: row;

      .Left{
        display: flex;
        flex-direction: column;
        .BasicalData{
          width: 25vw;
          height: 55vh;
          margin: 0 1vw 0 0.5vw;
        }
        .down_right{
          width: 25vw;
          height: 32vh;
          margin: 0vh 1vw 0 0.5vw;
        }
      }
      .Middle{
        width: 47vw;
        height: 87vh;
        display: flex;
        flex-direction: column;
        .map {
            width: 47vw;
            height: 72vh;
          }
        .left_area{
          width: 47vw;
          height: 15vh;
    
        }
      }
      .Right{
        width: 25vw;
        height: 87vh;
        margin: 0vw 0.5vw 0vw 1vw;
      }
    }
}
</style>

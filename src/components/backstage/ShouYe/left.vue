<template>
  <div class="left">
    <div class="top">
      <!-- <topVue></topVue> -->
      <carouselVue></carouselVue>
    </div>
    <div class="mid">
      <midVue></midVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import topVue from "@/components/backstage/ShouYe/src/left/top.vue";
import midVue from "@/components/backstage/ShouYe/src/left/mid.vue";
import carouselVue from "./src/left/top/carousel.vue";
import { onMounted, onUnmounted, ref, provide } from 'vue';

// 自动刷新相关
const refreshKey = ref(0);
const REFRESH_INTERVAL = 60000; // 60秒刷新一次
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
.left {
  overflow: scroll;
  width: 70vw;
  .mid {
    margin: 10px 10px;
  }
}
</style>

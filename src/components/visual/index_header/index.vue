<template>
  <div class="content">
    <div class="time">
      <timeVue></timeVue>
    </div>
    <div class="title">
      <headerTitleVue></headerTitleVue>
    </div>
    <div class="nav">
      <div class="nav-item" :class="{ active: currentPath === '/index/water_detection' || currentPath === '/index/map' }" @click="$router.push('/index/water_detection')">水质检测</div>
      <div class="nav-item" :class="{ active: currentPath === '/index/video' }" @click="$router.push('/index/video')">视频监控</div>
      <div class="nav-item" :class="{ active: currentPath === '/index/worning_detection' }" @click="$router.push('/index/worning_detection')">预警详情</div>
    </div>
    <div class="back">
      <tabButtonVue label="后台管理" path="/"></tabButtonVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import tabButtonVue from "./tabButton.vue";
import headerTitleVue from "./headerTitle.vue";
import timeVue from "@/views/visual/supervisor/time.vue";

const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background:
    linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #0f385e 100%);
  background-size: 100% 100%;
  border-bottom: 2px solid rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  position: relative;
  z-index: 1;

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vw;
  }
  .title {
    width: 35vw;
  }
  .nav {
    display: flex;
    gap: 6px;
    width: 30vw;
    justify-content: center;
    .nav-item {
      padding: 4px 16px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 2px;
      transition: all 0.3s;
      &:hover { color: #fff; background: rgba(0, 180, 255, 0.15); }
      &.active {
        color: #00e5ff;
        border-color: rgba(0, 229, 255, 0.4);
        background: rgba(0, 229, 255, 0.1);
      }
    }
  }
  .back {
    width: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

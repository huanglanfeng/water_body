<template>
  <div class="content">
    <div class="time">
      <timeVue></timeVue>
    </div>
    <div class="title">
      <headerTitleVue></headerTitleVue>
    </div>
    <div class="nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item) }"
        @click="$router.push(item.path)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>
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

const navItems = [
  { label: '地图总览', path: '/index/map', icon: '🗺️' },
  { label: '水质检测', path: '/index/water_detection', icon: '💧' },
  { label: '视频监控', path: '/index/video', icon: '📹' },
  { label: '预警详情', path: '/index/worning_detection', icon: '⚠️' },
];

const isActive = (item: { path: string }) => {
  return currentPath.value === item.path;
};
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 8vh;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #0f385e 100%);
  background-size: 100% 100%;
  border-bottom: 2px solid rgba(0, 212, 255, 0.5);
  box-shadow: 0 2px 20px rgba(0, 212, 255, 0.2);
  position: relative;
  z-index: 100;
  padding: 0 20px;
  box-sizing: border-box;

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vw;
    flex-shrink: 0;
  }
  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
    .nav-item {
      padding: 6px 18px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.65);
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 4px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
      .nav-icon {
        font-size: 14px;
      }
      &:hover {
        color: #fff;
        background: rgba(0, 180, 255, 0.15);
        border-color: rgba(0, 180, 255, 0.2);
      }
      &.active {
        color: #00e5ff;
        border-color: rgba(0, 229, 255, 0.5);
        background: rgba(0, 229, 255, 0.12);
        box-shadow: 0 0 12px rgba(0, 229, 255, 0.15);
      }
    }
  }
  .back {
    width: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
}
</style>

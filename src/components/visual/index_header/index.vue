<template>
  <div class="content">
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
      <div class="admin-btn" @click="goBack">
        <span class="admin-icon">⚙️</span>
        <span>后台管理</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import headerTitleVue from "./headerTitle.vue";

const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);

const navItems = [
  { label: '地图总览', path: '/index/map', icon: '🗺️' },
  { label: '水质检测', path: '/index/water_detection', icon: '💧' },
  { label: '预警监控', path: '/index/video', icon: '📹' },
];

const isActive = (item: { path: string }) => {
  return currentPath.value === item.path;
};

const goBack = () => {
  router.push('/');
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
  padding: 0 24px;
  box-sizing: border-box;

  .title {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .nav {
    flex: 1;
    display: flex;
    gap: 4px;
    justify-content: center;
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
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .admin-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: 1px solid rgba(0, 180, 255, 0.4);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(0, 40, 80, 0.4);
    .admin-icon {
      font-size: 14px;
    }
    &:hover {
      color: #00e5ff;
      border-color: rgba(0, 229, 255, 0.6);
      background: rgba(0, 229, 255, 0.1);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
    }
  }
}
</style>

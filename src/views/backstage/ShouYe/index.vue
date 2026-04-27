<template>
  <div class="dashboard">
    <!-- 顶部统计卡片 -->
    <div class="stats-row">
      <div class="stat-card" v-for="item in statsCards" :key="item.label">
        <div class="stat-icon" :style="{ background: item.bg }">
          <span>{{ item.icon }}</span>
        </div>
        <div class="stat-info">
          <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 统计卡片数据
const statsCards = ref([
  { label: '监测站点', value: '15', icon: '📍', color: '#409eff', bg: 'rgba(64,158,255,0.1)' },
  { label: '今日预警', value: '3', icon: '⚠️', color: '#ff4d4f', bg: 'rgba(255,77,79,0.1)' },
  { label: '设备在线率', value: '92%', icon: '📡', color: '#52c41a', bg: 'rgba(82,196,26,0.1)' },
  { label: '水质达标率', value: '86%', icon: '💧', color: '#13c2c2', bg: 'rgba(19,194,194,0.1)' },
]);
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 40px 16px;
  box-sizing: border-box;
}

/* 顶部统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 900px;
  width: 100%;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}
.stat-label {
  font-size: 13px;
  color: #999;
  margin-top: 2px;
}
</style>

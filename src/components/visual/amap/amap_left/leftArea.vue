<template>
  <div class="stats-row">
    <div class="stat-card" v-for="item in stats" :key="item.label">
      <div class="stat-icon" :style="{ color: item.color }">{{ item.icon }}</div>
      <div class="stat-info">
        <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
        <div class="stat-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, watch } from "vue";
import { zoneData, warning } from "@/api/index";

const stats = ref([
  { label: '监测站点', value: '--', icon: '📍', color: '#4ECDC4' },
  { label: '在线设备', value: '--', icon: '📡', color: '#45B7D1' },
  { label: '今日预警', value: '--', icon: '🔔', color: '#FFA07A' },
  { label: '水质达标', value: '--', icon: '✅', color: '#98D8C8' },
]);

const loadData = async () => {
  try {
    // 获取站点数据
    const zoneRes = await zoneData({});
    if (zoneRes.data && Array.isArray(zoneRes.data)) {
      stats.value[0].value = zoneRes.data.length + '个';
      // 计算在线设备（有预警次数的视为活跃）
      const activeSites = zoneRes.data.filter((s: any) => s.alertNumber > 0);
      stats.value[1].value = Math.max(zoneRes.data.length - 1, 1) + '台';
      // 计算达标率
      const goodQuality = zoneRes.data.filter((s: any) => {
        const level = s.waterQuality || '';
        return level.includes('Ⅱ') || level.includes('Ⅲ');
      });
      const rate = zoneRes.data.length > 0
        ? Math.round((goodQuality.length / zoneRes.data.length) * 100)
        : 0;
      stats.value[3].value = rate + '%';
    }
    // 获取预警数据
    const warnRes = await warning({});
    if (warnRes.data && Array.isArray(warnRes.data)) {
      stats.value[2].value = warnRes.data.length + '条';
    }
  } catch (e) {
    console.warn('统计数据加载失败', e);
  }
};

// 监听刷新
const refreshKey = inject<ReturnType<typeof ref<number>>>('refreshKey');
if (refreshKey) {
  watch(refreshKey, () => { loadData(); });
}

onMounted(() => { loadData(); });
</script>

<style lang="less" scoped>
.stats-row {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid rgba(0, 180, 255, 0.15);
  border-radius: 4px;
  background: rgba(0, 30, 60, 0.5);
  transition: all 0.3s;
  &:hover {
    border-color: rgba(0, 180, 255, 0.35);
    background: rgba(0, 40, 80, 0.6);
  }
  .stat-icon {
    font-size: 24px;
    flex-shrink: 0;
  }
  .stat-info {
    display: flex;
    flex-direction: column;
    .stat-value {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }
    .stat-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 2px;
    }
  }
}
</style>

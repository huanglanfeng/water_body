<template>
  <div class="dashboard">
    <!-- Row 1: Main Content -->
    <div class="main-content">
      <div class="main-left">
        <div class="kpi-row">
          <leftAreaVue></leftAreaVue>
        </div>
        <div class="map-area">
          <amapMiddleVue></amapMiddleVue>
        </div>
      </div>
      <div class="main-right">
        <div class="panel basic-info">
          <div class="panel-title">基本信息</div>
          <staticData></staticData>
        </div>
        <div class="panel detection">
          <div class="panel-title">检测情况</div>
          <TodayDataVue></TodayDataVue>
        </div>
      </div>
    </div>

    <!-- Row 3: Bottom Panels -->
    <div class="bottom-row">
      <div class="bottom-panel warning-detail">
        <div class="panel-title">预警详情</div>
        <WornContentVue></WornContentVue>
      </div>
      <div class="bottom-panel warning-stats">
        <div class="panel-title">预警统计</div>
        <WorningDataVue></WorningDataVue>
      </div>
      <div class="bottom-panel device-info">
        <div class="panel-title">设备信息</div>
        <equitmentVue></equitmentVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, provide } from 'vue';
import rightAreaVue from "./RightAera/index.vue"; // keep for potential use
import amapMiddleVue from "./amap_middle/amap.vue";
import staticData from "./staticData.vue";
import WorningDataVue from "./amap_right/Worning.vue";
import WornContentVue from "./RightAera/WornContent.vue";
import TodayDataVue from "./RightAera/TodayData.vue";
import equitmentVue from "@/components/visual/supervisor/charts/equitment.vue";
import leftAreaVue from './amap_left/leftArea.vue';

// Auto refresh
const refreshKey = ref(0);
const REFRESH_INTERVAL = 30000;
let refreshTimer: number | null = null;
const triggerRefresh = () => { refreshKey.value++; };
const startAutoRefresh = () => { refreshTimer = window.setInterval(triggerRefresh, REFRESH_INTERVAL); };
const stopAutoRefresh = () => { if (refreshTimer) { clearInterval(refreshTimer); refreshTimer = null; } };
provide('refreshKey', refreshKey);
onMounted(() => { startAutoRefresh(); });
onUnmounted(() => { stopAutoRefresh(); });
</script>

<style lang="less" scoped>
.dashboard {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;
}

/* === MAIN CONTENT === */
.main-content {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
  .main-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    .kpi-row {
      min-height: 80px;
    }
    .map-area {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      border: 1px solid rgba(0, 180, 255, 0.2);
      border-radius: 2px;
    }
  }
  .main-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    .panel {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      border: 1px solid rgba(0, 180, 255, 0.2);
      border-radius: 2px;
      background: rgba(0, 20, 50, 0.4);
    }
  }
}

/* === BOTTOM ROW === */
.bottom-row {
  height: 220px;
  min-height: 220px;
  display: flex;
  gap: 8px;
  .bottom-panel {
    overflow: hidden;
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 2px;
    background: rgba(0, 20, 50, 0.4);
  }
  .warning-detail { flex: 35; }
  .warning-stats { flex: 40; }
  .device-info { flex: 25; }
}

/* === PANEL TITLE === */
.panel-title {
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #00e5ff;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  background: linear-gradient(90deg, rgba(0, 180, 255, 0.1), transparent);
  letter-spacing: 1px;
}
</style>

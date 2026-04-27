<template>
  <div class="dashboard">
    <!-- 顶部统计卡片 -->
    <div class="kpi-row">
      <leftAreaVue></leftAreaVue>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧：水域地图 -->
      <div class="map-section">
        <div class="panel-title">南昌市水域监测分布</div>
        <div class="map-body">
          <div class="map-container">
            <div class="map-bg">
              <!-- 简化水域示意图 -->
              <svg viewBox="0 0 800 500" class="map-svg">
                <!-- 背景网格 -->
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,180,255,0.06)" stroke-width="0.5"/>
                  </pattern>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgba(0,100,200,0.3)"/>
                    <stop offset="100%" style="stop-color:rgba(0,180,255,0.15)"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <rect width="800" height="500" fill="url(#grid)"/>
                <!-- 赣江 -->
                <path d="M 50 200 Q 200 180 350 220 Q 500 260 650 230 Q 720 220 780 240" fill="none" stroke="url(#waterGrad)" stroke-width="18" stroke-linecap="round"/>
                <text x="400" y="210" fill="rgba(0,200,255,0.5)" font-size="13">赣 江</text>
                <!-- 抚河 -->
                <path d="M 200 50 Q 250 120 280 200 Q 300 260 320 320" fill="none" stroke="url(#waterGrad)" stroke-width="12" stroke-linecap="round"/>
                <text x="220" y="140" fill="rgba(0,200,255,0.5)" font-size="11">抚 河</text>
                <!-- 瑶湖 -->
                <ellipse cx="520" cy="150" rx="80" ry="45" fill="url(#waterGrad)" stroke="rgba(0,180,255,0.3)" stroke-width="1.5"/>
                <text x="500" y="155" fill="rgba(0,200,255,0.6)" font-size="12">瑶 湖</text>
                <!-- 青山湖 -->
                <ellipse cx="380" cy="280" rx="55" ry="35" fill="url(#waterGrad)" stroke="rgba(0,180,255,0.3)" stroke-width="1.5"/>
                <text x="362" y="285" fill="rgba(0,200,255,0.6)" font-size="11">青山湖</text>
                <!-- 艾溪湖 -->
                <ellipse cx="580" cy="260" rx="45" ry="28" fill="url(#waterGrad)" stroke="rgba(0,180,255,0.3)" stroke-width="1.5"/>
                <text x="564" y="265" fill="rgba(0,200,255,0.6)" font-size="11">艾溪湖</text>
                <!-- 南昌标注 -->
                <text x="350" y="170" fill="rgba(255,255,255,0.7)" font-size="18" font-weight="600" filter="url(#glow)">南昌市</text>
                <circle cx="350" cy="175" r="4" fill="rgba(0,229,255,0.8)"/>

                <!-- 监测站点标记 -->
                <g v-for="(site, idx) in sites" :key="idx">
                  <circle :cx="site.x" :cy="site.y" r="8" :fill="site.color" opacity="0.3" class="pulse-ring"/>
                  <circle :cx="site.x" :cy="site.y" r="5" :fill="site.color"/>
                  <text :x="site.x + 12" :y="site.y + 4" fill="rgba(255,255,255,0.8)" font-size="11">{{ site.name }}</text>
                  <!-- 水质标签 -->
                  <rect :x="site.x + 10" :y="site.y + 8" width="50" height="18" rx="3" fill="rgba(0,0,0,0.5)"/>
                  <text :x="site.x + 35" :y="site.y + 21" fill="#00e5ff" font-size="10" text-anchor="middle">{{ site.quality }}</text>
                </g>
              </svg>
            </div>
            <!-- 图例 -->
            <div class="map-legend">
              <div class="legend-item"><span class="dot green"></span>正常</div>
              <div class="legend-item"><span class="dot orange"></span>预警</div>
              <div class="legend-item"><span class="dot red"></span>严重</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panels">
        <div class="panel basic-info">
          <div class="panel-title">水域信息</div>
          <staticData></staticData>
        </div>
        <div class="panel device-info">
          <div class="panel-title">设备信息</div>
          <equitmentVue></equitmentVue>
        </div>
        <div class="panel detection">
          <div class="panel-title">检测情况</div>
          <TodayDataVue></TodayDataVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, provide } from 'vue';
import amapMiddleVue from "./amap_middle/amap.vue";
import staticData from "./staticData.vue";
import TodayDataVue from "./RightAera/TodayData.vue";
import equitmentVue from "@/components/visual/supervisor/charts/equitment.vue";
import leftAreaVue from './amap_left/leftArea.vue';

const sites = ref([
  { name: '瑶湖', x: 520, y: 150, quality: 'Ⅲ类', color: '#4ECDC4' },
  { name: '青山湖', x: 380, y: 280, quality: 'Ⅳ类', color: '#FFA07A' },
  { name: '赣江', x: 300, y: 220, quality: 'Ⅲ类', color: '#4ECDC4' },
  { name: '艾溪湖', x: 580, y: 260, quality: 'Ⅱ类', color: '#4ECDC4' },
  { name: '抚河', x: 280, y: 200, quality: 'Ⅴ类', color: '#FF6B6B' },
  { name: '鄱阳湖', x: 700, y: 300, quality: 'Ⅱ类', color: '#4ECDC4' },
]);

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

.kpi-row {
  flex-shrink: 0;
  height: 80px;
}

.main-content {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}

.map-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  overflow: hidden;
}

.map-body {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-bg {
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 40, 80, 0.3) 0%, rgba(10, 22, 40, 0.8) 100%);
}

.map-svg {
  width: 100%;
  height: 100%;
}

.map-legend {
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  gap: 12px;
  padding: 6px 12px;
  background: rgba(0, 20, 50, 0.7);
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &.green { background: #4ECDC4; }
  &.orange { background: #FFA07A; }
  &.red { background: #FF6B6B; }
}

.right-panels {
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
    border-radius: 4px;
    background: rgba(0, 20, 50, 0.4);
  }
}

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
  flex-shrink: 0;
}

.pulse-ring {
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { r: 8; opacity: 0.3; }
  50% { r: 14; opacity: 0.1; }
}
</style>

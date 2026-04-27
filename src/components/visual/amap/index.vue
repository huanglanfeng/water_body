<template>
  <div class="dashboard">
    <!-- 顶部统计卡片 -->
    <div class="kpi-row">
      <leftAreaVue></leftAreaVue>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧：地图 -->
      <div class="map-section">
        <div class="panel-title">南昌市水域监测分布</div>
        <div class="map-body">
          <div id="leaflet-map" ref="mapRef"></div>
        </div>
      </div>

      <!-- 右侧面板：水域信息 → 检测情况 → 设备信息 -->
      <div class="right-panels">
        <div class="panel basic-info">
          <div class="panel-title">水域信息</div>
          <staticData></staticData>
        </div>
        <div class="panel detection">
          <div class="panel-title">检测情况</div>
          <TodayDataVue></TodayDataVue>
        </div>
        <div class="panel device-info">
          <div class="panel-title">设备信息</div>
          <equitmentVue></equitmentVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, provide } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import staticData from "./staticData.vue";
import TodayDataVue from "./RightAera/TodayData.vue";
import equitmentVue from "@/components/visual/supervisor/charts/equitment.vue";
import leftAreaVue from './amap_left/leftArea.vue';

const mapRef = ref<HTMLElement | null>(null);
let map: L.Map | null = null;

const sites = [
  { name: '瑶湖', lat: 28.6820, lng: 115.9320, quality: 'Ⅲ类', area: '15.5km²', status: '在线', color: '#4ECDC4' },
  { name: '青山湖', lat: 28.6920, lng: 115.9720, quality: 'Ⅳ类', area: '3.2km²', status: '预警', color: '#FFA07A' },
  { name: '赣江', lat: 28.6850, lng: 115.8900, quality: 'Ⅲ类', area: '--', status: '在线', color: '#4ECDC4' },
  { name: '艾溪湖', lat: 28.6980, lng: 115.9550, quality: 'Ⅱ类', area: '4.5km²', status: '在线', color: '#4ECDC4' },
  { name: '抚河', lat: 28.6700, lng: 115.9200, quality: 'Ⅴ类', area: '--', status: '严重', color: '#FF6B6B' },
  { name: '鄱阳湖', lat: 29.1500, lng: 116.2000, quality: 'Ⅱ类', area: '3283km²', status: '在线', color: '#4ECDC4' },
];

const initMap = () => {
  if (!mapRef.value) return;
  map = L.map(mapRef.value, {
    center: [28.68, 115.93],
    zoom: 12,
    zoomControl: true,
    attributionControl: false,
  });

  // 深色地图瓦片
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  }).addTo(map);

  // 添加监测站点标记
  sites.forEach((site) => {
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 14px; height: 14px;
        background: ${site.color};
        border: 2px solid rgba(255,255,255,0.8);
        border-radius: 50%;
        box-shadow: 0 0 10px ${site.color}80, 0 0 20px ${site.color}40;
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const marker = L.marker([site.lat, site.lng], { icon: markerIcon }).addTo(map);

    // 点击弹窗
    marker.bindPopup(`
      <div style="font-family: sans-serif; min-width: 180px; padding: 4px 0;">
        <div style="font-size: 15px; font-weight: 700; color: #333; margin-bottom: 8px; border-bottom: 2px solid ${site.color}; padding-bottom: 6px;">
          ${site.name}
        </div>
        <table style="width: 100%; font-size: 13px; color: #555; border-collapse: collapse;">
          <tr><td style="padding: 3px 0; color: #999;">水质等级</td><td style="font-weight: 600; color: ${site.color};">${site.quality}</td></tr>
          <tr><td style="padding: 3px 0; color: #999;">水域面积</td><td>${site.area}</td></tr>
          <tr><td style="padding: 3px 0; color: #999;">运行状态</td><td><span style="color: ${site.color}; font-weight: 600;">${site.status}</span></td></tr>
          <tr><td style="padding: 3px 0; color: #999;">经纬度</td><td>${site.lat.toFixed(4)}, ${site.lng.toFixed(4)}</td></tr>
        </table>
      </div>
    `, { className: 'dark-popup' });
  });
};

// Auto refresh
const refreshKey = ref(0);
const REFRESH_INTERVAL = 30000;
let refreshTimer: number | null = null;
const triggerRefresh = () => { refreshKey.value++; };
const startAutoRefresh = () => { refreshTimer = window.setInterval(triggerRefresh, REFRESH_INTERVAL); };
const stopAutoRefresh = () => { if (refreshTimer) { clearInterval(refreshTimer); refreshTimer = null; } };
provide('refreshKey', refreshKey);

onMounted(() => {
  initMap();
  startAutoRefresh();
});
onUnmounted(() => {
  stopAutoRefresh();
  if (map) { map.remove(); map = null; }
});
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

#leaflet-map {
  width: 100%;
  height: 100%;
  z-index: 1;
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
</style>

<style>
/* 全局样式 - Leaflet弹窗深色主题 */
.dark-popup .leaflet-popup-content-wrapper {
  background: rgba(10, 22, 40, 0.95);
  color: #fff;
  border: 1px solid rgba(0, 180, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
.dark-popup .leaflet-popup-tip {
  background: rgba(10, 22, 40, 0.95);
  border: 1px solid rgba(0, 180, 255, 0.3);
}
.dark-popup .leaflet-popup-close-button {
  color: rgba(255, 255, 255, 0.6) !important;
}
.custom-marker {
  background: transparent !important;
  border: none !important;
}
</style>

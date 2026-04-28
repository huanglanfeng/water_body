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
          <div id="amap-container" ref="mapRef"></div>
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
import staticData from "./staticData.vue";
import TodayDataVue from "./RightAera/TodayData.vue";
import equitmentVue from "@/components/visual/supervisor/charts/equitment.vue";
import leftAreaVue from './amap_left/leftArea.vue';

const mapRef = ref<HTMLElement | null>(null);
let map: any = null;

const sites = [
  { name: '瑶湖', lat: 28.6820, lng: 115.9320, quality: 'Ⅲ类', area: '15.5km²', status: '在线', ph: '7.2', turbidity: '12.5', color: '#4ECDC4', type: '湖泊' },
  { name: '青山湖', lat: 28.6920, lng: 115.9720, quality: 'Ⅳ类', area: '3.2km²', status: '预警', ph: '6.8', turbidity: '28.3', color: '#FFA07A', type: '湖泊' },
  { name: '艾溪湖', lat: 28.6980, lng: 115.9550, quality: 'Ⅱ类', area: '4.5km²', status: '在线', ph: '7.5', turbidity: '8.2', color: '#4ECDC4', type: '湖泊' },
  { name: '象湖', lat: 28.6550, lng: 115.9050, quality: 'Ⅲ类', area: '2.8km²', status: '在线', ph: '7.1', turbidity: '15.0', color: '#4ECDC4', type: '湖泊' },
  { name: '碟子湖', lat: 28.7100, lng: 115.8650, quality: 'Ⅲ类', area: '0.6km²', status: '在线', ph: '7.3', turbidity: '10.8', color: '#4ECDC4', type: '湖泊' },
  { name: '梅湖', lat: 28.6400, lng: 115.9500, quality: 'Ⅳ类', area: '1.2km²', status: '预警', ph: '6.5', turbidity: '22.1', color: '#FFA07A', type: '湖泊' },
  { name: '军山湖', lat: 28.5200, lng: 116.3500, quality: 'Ⅱ类', area: '32.0km²', status: '在线', ph: '7.8', turbidity: '5.6', color: '#4ECDC4', type: '湖泊' },
  { name: '赣江（南昌段）', lat: 28.6850, lng: 115.8900, quality: 'Ⅲ类', area: '--', status: '在线', ph: '7.0', turbidity: '18.5', color: '#4ECDC4', type: '河流' },
  { name: '抚河（南昌段）', lat: 28.6700, lng: 115.9200, quality: 'Ⅴ类', area: '--', status: '严重', ph: '5.8', turbidity: '45.2', color: '#FF6B6B', type: '河流' },
  { name: '锦江', lat: 28.5800, lng: 115.7500, quality: 'Ⅲ类', area: '--', status: '在线', ph: '7.2', turbidity: '14.3', color: '#4ECDC4', type: '河流' },
  { name: '信江', lat: 28.4500, lng: 116.5000, quality: 'Ⅱ类', area: '--', status: '在线', ph: '7.6', turbidity: '9.1', color: '#4ECDC4', type: '河流' },
  { name: '修水', lat: 29.0300, lng: 114.5800, quality: 'Ⅱ类', area: '--', status: '在线', ph: '7.4', turbidity: '7.8', color: '#4ECDC4', type: '河流' },
  { name: '鄱阳湖（南昌区域）', lat: 29.1500, lng: 116.2000, quality: 'Ⅱ类', area: '3283km²', status: '在线', ph: '7.9', turbidity: '6.2', color: '#4ECDC4', type: '湖泊' },
  { name: '幸福水库', lat: 28.7500, lng: 115.7000, quality: 'Ⅲ类', area: '1.8km²', status: '在线', ph: '7.1', turbidity: '11.0', color: '#4ECDC4', type: '水库' },
  { name: '溪霞水库', lat: 28.9000, lng: 115.6500, quality: 'Ⅱ类', area: '0.9km²', status: '在线', ph: '7.5', turbidity: '6.5', color: '#4ECDC4', type: '水库' },
];

const initMap = () => {
  if (!mapRef.value) return;
  const AMap = (window as any).AMap;
  if (!AMap) {
    console.error('高德地图未加载');
    return;
  }

  map = new AMap.Map('amap-container', {
    zoom: 12,
    center: [115.93, 28.68],
    pitch: 45,
    rotation: 0,
    viewMode: '3D',
    mapStyle: 'amap://styles/dark',
    features: ['bg', 'road', 'building', 'point'],
    showLabel: true,
    showBuildings: false,
  });

  // 添加卫星图层
  const satellite = new AMap.TileLayer.Satellite();
  map.add(satellite);

  // 添加监测站点标记
  sites.forEach((site) => {
    const markerContent = document.createElement('div');
    markerContent.innerHTML = `
      <div style="
        width: 16px; height: 16px;
        background: ${site.color};
        border: 2px solid rgba(255,255,255,0.9);
        border-radius: 50%;
        box-shadow: 0 0 12px ${site.color}80, 0 0 24px ${site.color}40;
        cursor: pointer;
      "></div>
    `;

    const marker = new AMap.Marker({
      position: [site.lng, site.lat],
      content: markerContent,
      offset: new AMap.Pixel(-8, -8),
    });

    // 信息窗体
    const infoWindow = new AMap.InfoWindow({
      isCustom: true,
      content: `
        <div style="
          background: rgba(10, 22, 40, 0.95);
          border: 1px solid rgba(0, 180, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          min-width: 200px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          font-family: sans-serif;
        ">
          <div style="font-size: 15px; font-weight: 700; color: #e0e0e0; margin-bottom: 8px; border-bottom: 2px solid ${site.color}; padding-bottom: 6px;">
            ${site.name}
          </div>
          <table style="width: 100%; font-size: 13px; color: #ccc; border-collapse: collapse;">
            <tr><td style="padding: 3px 0; color: #888;">水域类型</td><td>${site.type}</td></tr>
            <tr><td style="padding: 3px 0; color: #888;">水质等级</td><td style="font-weight: 600; color: ${site.color};">${site.quality}</td></tr>
            <tr><td style="padding: 3px 0; color: #888;">pH值</td><td>${site.ph}</td></tr>
            <tr><td style="padding: 3px 0; color: #888;">浊度(NTU)</td><td>${site.turbidity}</td></tr>
            <tr><td style="padding: 3px 0; color: #888;">水域面积</td><td>${site.area}</td></tr>
            <tr><td style="padding: 3px 0; color: #888;">运行状态</td><td><span style="color: ${site.color}; font-weight: 600;">${site.status}</span></td></tr>
          </table>
        </div>
      `,
      offset: new AMap.Pixel(0, -16),
    });

    marker.on('click', () => {
      infoWindow.open(map, marker.getPosition());
    });

    map.add(marker);
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
  if (map) { map.destroy(); map = null; }
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

#amap-container {
  width: 100%;
  height: 100%;
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

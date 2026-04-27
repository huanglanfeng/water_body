<template>
  <div class="warning-monitor">
    <!-- 左侧：视频监控 -->
    <div class="video-section">
      <div class="section-title">实时视频监控</div>
      <div class="video-grid">
        <div class="video-cell" v-for="(item, index) in videoList" :key="index">
          <div class="video-label">{{ item.label }}</div>
          <VideoPlayer
            width="100%"
            height="100%"
            color="transparent"
            :src="item.src"
            :control="false"
            :autoPlay="true"
            :loop="true"
          />
          <div class="video-toolbar">
            <span class="toolbar-btn" title="全屏">⛶</span>
            <span class="toolbar-btn" title="截图">📷</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧：预警信息 -->
    <div class="alert-section">
      <!-- 检测统计 -->
      <div class="detect-stats">
        <div class="stat-item" v-for="item in detectStats" :key="item.label">
          <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
      <!-- AI检测列表 -->
      <div class="detect-list">
        <div class="list-title">AI 检测异常</div>
        <div class="alert-item" v-for="(item, idx) in alertList" :key="idx">
          <div class="alert-item-header">
            <span class="alert-badge" :class="item.level === '严重' ? 'badge-danger' : 'badge-warn'">{{ item.level }}</span>
            <span class="alert-type">{{ item.type }}</span>
            <span class="alert-time">{{ item.time }}</span>
          </div>
          <div class="alert-desc">{{ item.desc }}</div>
        </div>
      </div>
      <!-- 详情按钮 -->
      <div class="detail-btn-row">
        <div class="detail-btn" @click="goDetail">
          查看预警详情 →
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { warning } from '@/api/index';
import video1 from "@/assets/video/WeChat_20230418210232.mp4";
import video2 from "@/assets/video/WeChat_20230418210259.mp4";
import video3 from "@/assets/video/WeChat_20230418210311.mp4";
import video5 from "@/assets/video/sequence01.mp4";
import video6 from "@/assets/video/WeChat_20230428201855.mp4";
import video8 from "@/assets/video/sequence01_3.mp4";

const router = useRouter();

const videoList = [
  { label: '1号摄像区 - 瑶湖', src: video1 },
  { label: '2号摄像区 - 赣江', src: video2 },
  { label: '3号摄像区 - 青山湖', src: video3 },
  { label: '4号摄像区 - 抚河', src: video5 },
  { label: '5号摄像区 - 艾溪湖', src: video6 },
  { label: '6号摄像区 - 南昌大桥', src: video8 },
];

const detectStats = ref([
  { label: '今日检测', value: '156', color: '#4ECDC4' },
  { label: '异常检测', value: '3', color: '#FFA07A' },
  { label: '识别准确率', value: '98.5%', color: '#98D8C8' },
]);

const alertList = ref([
  { level: '严重', type: '垃圾堆积', time: '10:32', desc: '瑶湖东南角检测到大面积生活垃圾堆积，面积约3平方米，已影响周边水质。' },
  { level: '警告', type: '漂浮物', time: '09:15', desc: '抚河入湖口检测到大量水葫芦漂浮物，覆盖面积约50平方米。' },
  { level: '警告', type: '水质变色', time: '08:47', desc: '青山湖西侧水域出现异常浑浊变色现象，疑似工业废水排放。' },
  { level: '严重', type: '排污口', time: '07:20', desc: '赣江大桥下游200米处发现疑似非法排污口，水质检测pH值异常偏低。' },
  { level: '警告', type: '垃圾堆积', time: '昨日', desc: '艾溪湖公园沿岸检测到零散塑料垃圾，建议安排清理。' },
]);

const goDetail = () => {
  router.push('/');
};

// 加载真实预警数据
const loadWarnings = async () => {
  try {
    const res = await warning({});
    if (res.data && Array.isArray(res.data)) {
      detectStats.value[1].value = res.data.length + '';
      // 取前5条作为列表
      alertList.value = res.data.slice(0, 5).map((item: any) => ({
        level: item.warning?.includes('严重') ? '严重' : '警告',
        type: item.warning || '未知',
        time: item.time ? item.time.split(' ')[1] || item.time : '--',
        desc: `${item.site || '未知站点'} - ${item.warning || ''}，监测值: ${item.value || '--'}`,
      }));
    }
  } catch (e) {
    console.warn('预警数据加载失败', e);
  }
};

onMounted(() => { loadWarnings(); });
</script>

<style lang="less" scoped>
.warning-monitor {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.section-title {
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #00e5ff;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  background: linear-gradient(90deg, rgba(0, 180, 255, 0.1), transparent);
  letter-spacing: 1px;
  flex-shrink: 0;
}
.video-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  overflow: hidden;
}
.video-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;
  padding: 4px;
}
.video-cell {
  position: relative;
  border: 1px solid rgba(0, 180, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
  background: #000;
}
.video-label {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  font-size: 11px;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0.7), transparent);
  z-index: 2;
}
.video-toolbar {
  position: absolute;
  bottom: 0; right: 0;
  display: flex;
  gap: 4px;
  padding: 4px;
  z-index: 2;
}
.toolbar-btn {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  &:hover { background: rgba(0, 180, 255, 0.3); }
}
.alert-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  overflow: hidden;
}
.detect-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 12px;
  flex-shrink: 0;
}
.stat-item {
  text-align: center;
  padding: 8px;
  border: 1px solid rgba(0, 180, 255, 0.1);
  border-radius: 4px;
  background: rgba(0, 30, 60, 0.3);
}
.stat-value {
  font-size: 20px;
  font-weight: 700;
}
.stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}
.detect-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 6px;
  overflow: auto;
  min-height: 0;
}
.list-title {
  font-size: 13px;
  font-weight: 600;
  color: #00e5ff;
  padding: 4px 0;
  flex-shrink: 0;
}
.alert-item {
  padding: 8px 10px;
  border: 1px solid rgba(0, 180, 255, 0.1);
  border-radius: 4px;
  background: rgba(0, 30, 60, 0.3);
  flex-shrink: 0;
}
.alert-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.alert-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 600;
  flex-shrink: 0;
}
.badge-danger {
  color: #FF6B6B;
  background: rgba(255, 107, 107, 0.15);
}
.badge-warn {
  color: #FFA07A;
  background: rgba(255, 160, 122, 0.15);
}
.alert-type {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}
.alert-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
}
.alert-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail-btn-row {
  padding: 8px 12px;
  flex-shrink: 0;
}
.detail-btn {
  width: 100%;
  text-align: center;
  padding: 8px;
  border: 1px solid rgba(0, 180, 255, 0.3);
  border-radius: 4px;
  color: #00e5ff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(0, 180, 255, 0.05);
  &:hover {
    background: rgba(0, 180, 255, 0.15);
    border-color: rgba(0, 229, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
  }
}
</style>

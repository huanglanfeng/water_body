<template>
  <div class="video-monitor">
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
    <!-- 右侧：图像检测分析 -->
    <div class="detect-section">
      <div class="section-title">图像检测分析</div>
      <div class="detect-stats">
        <div class="stat-item" v-for="item in detectStats" :key="item.label">
          <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
      <div class="detect-grid">
        <div class="detect-card" v-for="item in detectTypes" :key="item.title">
          <div class="detect-card-title">{{ item.title }}</div>
          <div class="detect-card-status" :class="item.status === '正常' ? 'status-ok' : 'status-warn'">
            {{ item.status === '正常' ? '✓' : '!' }} {{ item.status }}
          </div>
          <div class="detect-card-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import video1 from "@/assets/video/WeChat_20230418210232.mp4";
import video2 from "@/assets/video/WeChat_20230418210259.mp4";
import video3 from "@/assets/video/WeChat_20230418210311.mp4";
import video5 from "@/assets/video/sequence01.mp4";
import video6 from "@/assets/video/WeChat_20230428201855.mp4";
import video8 from "@/assets/video/sequence01_3.mp4";

const videoList = [
  { label: '1号摄像区 - 瑶湖', src: video1 },
  { label: '2号摄像区 - 赣江', src: video2 },
  { label: '3号摄像区 - 青山湖', src: video3 },
  { label: '4号摄像区 - 抚河', src: video5 },
  { label: '5号摄像区 - 艾溪湖', src: video6 },
  { label: '6号摄像区 - 南昌大桥', src: video8 },
];

const detectStats = [
  { label: '今日检测次数', value: '156', color: '#4ECDC4' },
  { label: '异常检测', value: '3', color: '#FFA07A' },
  { label: '识别准确率', value: '98.5%', color: '#98D8C8' },
];

const detectTypes = [
  { title: '垃圾检测', status: '异常', desc: '检测到2处垃圾堆积' },
  { title: '水质变色', status: '正常', desc: '未发现水质异常变色' },
  { title: '漂浮物检测', status: '异常', desc: '检测到1处漂浮物' },
  { title: '排污口检测', status: '正常', desc: '未发现异常排污' },
];
</script>

<style lang="less" scoped>
.video-monitor {
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
  top: 0;
  left: 0;
  right: 0;
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
  bottom: 0;
  right: 0;
  display: flex;
  gap: 4px;
  padding: 4px;
  z-index: 2;
}
.toolbar-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  &:hover { background: rgba(0, 180, 255, 0.3); }
}
.detect-section {
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
.detect-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 12px 12px;
  overflow: auto;
}
.detect-card {
  border: 1px solid rgba(0, 180, 255, 0.15);
  border-radius: 4px;
  background: rgba(0, 30, 60, 0.3);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.detect-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.detect-card-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 3px;
  display: inline-block;
  width: fit-content;
}
.status-ok {
  color: #4ECDC4;
  background: rgba(78, 205, 196, 0.15);
}
.status-warn {
  color: #FFA07A;
  background: rgba(255, 160, 122, 0.15);
}
.detect-card-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}
</style>

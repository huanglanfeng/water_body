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

    <!-- 中间区域 -->
    <div class="middle-row">
      <!-- 左侧：快捷功能入口 -->
      <div class="quick-entry">
        <h3 class="section-title">快捷功能</h3>
        <div class="entry-grid">
          <div
            class="entry-item"
            v-for="item in quickEntries"
            :key="item.label"
            @click="router.push(item.path)"
          >
            <div class="entry-icon" :style="{ background: item.bg }">
              <el-icon :size="24" :color="item.color"><component :is="item.icon" /></el-icon>
            </div>
            <span class="entry-label">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧：最近预警列表 -->
      <div class="alert-list">
        <h3 class="section-title">最近预警</h3>
        <div class="alert-items">
          <div class="alert-item" v-for="(item, index) in alertList" :key="index">
            <div class="alert-content">
              <el-tag :type="item.tagType" size="small">{{ item.level }}</el-tag>
              <span class="alert-text">{{ item.content }}</span>
            </div>
            <span class="alert-time">{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部：水质趋势图 -->
    <div class="chart-row">
      <h3 class="section-title">近7天水质趋势</h3>
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, markRaw } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import {
  User,
  Monitor,
  DataAnalysis,
  Warning,
  VideoCamera,
  Setting,
} from "@element-plus/icons-vue";

const router = useRouter();

// 统计卡片数据
const statsCards = ref([
  { label: "监测站点", value: "15", icon: "📍", color: "#409eff", bg: "rgba(64,158,255,0.1)" },
  { label: "今日预警", value: "3", icon: "⚠️", color: "#ff4d4f", bg: "rgba(255,77,79,0.1)" },
  { label: "设备在线率", value: "92%", icon: "📡", color: "#52c41a", bg: "rgba(82,196,26,0.1)" },
  { label: "水质达标率", value: "86%", icon: "💧", color: "#13c2c2", bg: "rgba(19,194,194,0.1)" },
]);

// 快捷功能入口
const quickEntries = ref([
  { label: "用户管理", icon: markRaw(User), color: "#409eff", bg: "rgba(64,158,255,0.1)", path: "/system/user" },
  { label: "设备管理", icon: markRaw(Monitor), color: "#52c41a", bg: "rgba(82,196,26,0.1)", path: "/system/device" },
  { label: "水质识别", icon: markRaw(DataAnalysis), color: "#13c2c2", bg: "rgba(19,194,194,0.1)", path: "/water/identify" },
  { label: "预警详情", icon: markRaw(Warning), color: "#ff4d4f", bg: "rgba(255,77,79,0.1)", path: "/warning/detail" },
  { label: "监控录像", icon: markRaw(VideoCamera), color: "#722ed1", bg: "rgba(114,46,209,0.1)", path: "/monitor/video" },
  { label: "预警设置", icon: markRaw(Setting), color: "#fa8c16", bg: "rgba(250,140,22,0.1)", path: "/warning/setting" },
]);

// 最近预警列表
const alertList = ref([
  { level: "严重", tagType: "danger", content: "青山湖站点COD浓度超标（12.5mg/L）", time: "10:32" },
  { level: "警告", tagType: "warning", content: "赣江断面溶解氧低于标准值（4.2mg/L）", time: "09:15" },
  { level: "严重", tagType: "danger", content: "瑶湖站点氨氮浓度异常升高", time: "08:47" },
  { level: "提示", tagType: "info", content: "青山湖站点设备电量低于20%", time: "08:20" },
  { level: "警告", tagType: "warning", content: "抚河断面pH值偏高（8.9）", time: "07:55" },
]);

// ECharts 折线图
const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const dates = ["04-22", "04-23", "04-24", "04-25", "04-26", "04-27", "04-28"];

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["水质等级", "COD(mg/L)", "溶解氧(mg/L)"],
      top: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "40px",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "水质等级",
        type: "line",
        data: [2.1, 2.3, 2.0, 2.5, 2.2, 2.4, 2.1],
        smooth: true,
        itemStyle: { color: "#409eff" },
        areaStyle: { color: "rgba(64,158,255,0.1)" },
      },
      {
        name: "COD(mg/L)",
        type: "line",
        data: [8.5, 9.2, 7.8, 10.1, 9.5, 8.9, 8.2],
        smooth: true,
        itemStyle: { color: "#ff4d4f" },
        areaStyle: { color: "rgba(255,77,79,0.1)" },
      },
      {
        name: "溶解氧(mg/L)",
        type: "line",
        data: [6.2, 5.8, 6.5, 5.3, 5.9, 6.1, 6.4],
        smooth: true,
        itemStyle: { color: "#52c41a" },
        areaStyle: { color: "rgba(82,196,26,0.1)" },
      },
    ],
  };

  chartInstance.setOption(option);
};

const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  overflow-y: auto;
}

.section-title {
  margin: 0 0 14px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

/* 顶部统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
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

/* 中间区域 */
.middle-row {
  display: flex;
  gap: 20px;
}

/* 快捷功能入口 */
.quick-entry {
  flex: 0 0 60%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.entry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #f5f7fa;
    transform: translateY(-2px);
  }
}
.entry-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.entry-label {
  font-size: 13px;
  color: #606266;
}

/* 最近预警列表 */
.alert-list {
  flex: 0 0 calc(40% - 20px);
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.alert-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  background: #fafafa;
  transition: background 0.2s;
  &:hover {
    background: #f0f2f5;
  }
}
.alert-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.alert-text {
  font-size: 13px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.alert-time {
  font-size: 12px;
  color: #c0c4cc;
  flex-shrink: 0;
  margin-left: 12px;
}

/* 底部图表 */
.chart-row {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.chart-container {
  width: 100%;
  height: 300px;
}
</style>

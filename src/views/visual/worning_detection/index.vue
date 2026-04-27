<template>
  <div class="warning-page">
    <!-- 顶部统计卡片 -->
    <div class="stats-row">
      <div class="stat-card" v-for="item in statsCards" :key="item.label">
        <div class="stat-icon" :style="{ color: item.color }">{{ item.icon }}</div>
        <div class="stat-info">
          <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧：预警表格 -->
      <div class="table-section">
        <div class="section-header">
          <div class="section-title">预警记录</div>
          <div class="filter-bar">
            <el-select v-model="levelFilter" placeholder="预警级别" size="small" clearable style="width: 120px">
              <el-option label="严重" value="严重" />
              <el-option label="警告" value="警告" />
              <el-option label="提示" value="提示" />
            </el-select>
            <el-input v-model="searchText" placeholder="搜索站点" size="small" clearable style="width: 140px" />
          </div>
        </div>
        <div class="table-body">
          <dv-scroll-board :config="tableConfig" style="width: 100%; height: 100%" />
        </div>
      </div>
      <!-- 右侧：趋势图 -->
      <div class="chart-section">
        <div class="section-title">预警趋势</div>
        <div id="warningTrend" style="width: 100%; height: calc(100% - 36px)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { warning } from '@/api/index';
import * as echarts from 'echarts';

const statsCards = ref([
  { label: '今日预警', value: '--', icon: '🔔', color: '#FF6B6B' },
  { label: '未处理', value: '--', icon: '⏳', color: '#FFA07A' },
  { label: '已处理', value: '--', icon: '✅', color: '#4ECDC4' },
  { label: '本月累计', value: '--', icon: '📊', color: '#45B7D1' },
]);

const levelFilter = ref('');
const searchText = ref('');

const tableConfig = reactive({
  header: ['编号', '监测站点', '预警内容', '预警值', '预警时间'],
  data: [] as any[],
  index: false,
  columnWidth: [60, 120, 180, 100, 160],
  align: ['center'],
  headerHeight: 40,
  rowHeight: 36,
  oddRowBgc: 'rgba(0,0,0,0.1)',
  evenRowBgc: 'rgba(0,50,100,0.2)',
});

const allData = ref<any[]>([]);

const loadData = async () => {
  try {
    const res = await warning({});
    allData.value = res.data || [];
    // 统计
    statsCards.value[0].value = allData.value.length + '条';
    statsCards.value[1].value = Math.max(Math.floor(allData.value.length * 0.3), 0) + '条';
    statsCards.value[2].value = Math.ceil(allData.value.length * 0.7) + '条';
    statsCards.value[3].value = allData.value.length + '条';
    // 表格数据
    updateTableData();
  } catch (e) {
    console.warn('预警数据加载失败', e);
  }
};

const updateTableData = () => {
  let filtered = allData.value;
  if (levelFilter.value) {
    filtered = filtered.filter((item: any) => item.warning?.includes(levelFilter.value));
  }
  if (searchText.value) {
    filtered = filtered.filter((item: any) => item.site?.includes(searchText.value));
  }
  tableConfig.data = filtered.map((item: any, idx: number) => [
    idx + 1,
    item.site || '--',
    item.warning || '--',
    item.value || '--',
    item.time || '--',
  ]);
};

// 监听筛选变化
import { watch } from 'vue';
watch([levelFilter, searchText], () => { updateTableData(); });

// 趋势图
let chartInstance: echarts.ECharts | null = null;
const initChart = () => {
  const dom = document.getElementById('warningTrend');
  if (!dom) return;
  chartInstance = echarts.init(dom);
  const option = {
    tooltip: { trigger: 'axis' },
    grid: { top: '15%', bottom: '10%', left: '10%', right: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['4/21', '4/22', '4/23', '4/24', '4/25', '4/26', '4/27'],
      axisLine: { lineStyle: { color: 'rgba(66, 192, 255, 0.3)' } },
      axisLabel: { color: '#5FBBEB', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(66, 192, 255, 0.1)' } },
      axisLabel: { color: '#5FBBEB', fontSize: 11 },
    },
    series: [{
      name: '预警数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      data: [5, 8, 3, 12, 7, 4, 6],
      lineStyle: { color: '#FF6B6B', width: 2 },
      itemStyle: { color: '#FF6B6B' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
          { offset: 1, color: 'rgba(255, 107, 107, 0.02)' },
        ]),
      },
    }],
  };
  chartInstance.setOption(option);
};

onMounted(() => {
  loadData();
  initChart();
});
onUnmounted(() => {
  chartInstance?.dispose();
});
</script>

<style lang="less" scoped>
.warning-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  flex-shrink: 0;
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
  &:hover { border-color: rgba(0, 180, 255, 0.35); }
  .stat-icon { font-size: 24px; flex-shrink: 0; }
  .stat-info {
    display: flex;
    flex-direction: column;
    .stat-value { font-size: 20px; font-weight: 700; line-height: 1.2; }
    .stat-label { font-size: 11px; color: rgba(255, 255, 255, 0.5); margin-top: 2px; }
  }
}
.main-content {
  flex: 1;
  display: flex;
  gap: 8px;
  min-height: 0;
}
.table-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  overflow: hidden;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 36px;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  background: linear-gradient(90deg, rgba(0, 180, 255, 0.1), transparent);
  flex-shrink: 0;
}
.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #00e5ff;
  letter-spacing: 1px;
}
.filter-bar {
  display: flex;
  gap: 8px;
}
.table-body {
  flex: 1;
  padding: 8px;
  overflow: hidden;
}
.chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  overflow: hidden;
  padding: 0 12px;
  box-sizing: border-box;
}
</style>

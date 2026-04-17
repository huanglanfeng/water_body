<template>
  <div class="water-identify">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="16" class="stat-cards">
      <el-col :span="4" v-for="(item, index) in statCards" :key="index">
        <el-card shadow="hover" class="stat-card" :body-style="{ padding: '20px' }">
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: item.color }">
              <el-icon :size="24"><component :is="item.icon" /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 水质分类识别结果表格 -->
    <el-card class="table-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="title">水质分类识别结果</span>
          <el-button type="primary" size="small" @click="refreshData">
            <el-icon><Refresh /></el-icon>
            刷新数据
          </el-button>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%" :border="true" stripe>
        <el-table-column prop="siteName" label="站点名称" width="120" />
        <el-table-column prop="identifyTime" label="识别时间" width="180" />
        <el-table-column prop="classifyResult" label="分类结果" width="120">
          <template #default="scope">
            <el-tag :type="getTagType(scope.row.classifyResult)" effect="dark">
              {{ scope.row.classifyResult }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="confidence" label="置信度" width="100">
          <template #default="scope">
            <span :style="{ color: getConfidenceColor(scope.row.confidence) }">
              {{ scope.row.confidence }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutants" label="主要污染物" width="150">
          <template #default="scope">
            <span>{{ scope.row.pollutants || '—' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="model" label="识别模型" width="120" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="showDetail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 识别趋势图和模型信息 -->
    <el-row :gutter="16" class="bottom-section">
      <el-col :span="16">
        <el-card class="trend-card" shadow="hover">
          <template #header>
            <span class="title">识别趋势图（近7天）</span>
          </template>
          <div id="trendChart" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="model-card" shadow="hover">
          <template #header>
            <span class="title">深度学习模型信息</span>
          </template>
          <div class="model-info">
            <div class="model-item">
              <el-icon :size="20" color="#409EFF"><Cpu /></el-icon>
              <div class="model-detail">
                <div class="model-label">模型名称</div>
                <div class="model-value">{{ modelInfo.name }}</div>
              </div>
            </div>
            <div class="model-item">
              <el-icon :size="20" color="#67C23A"><Document /></el-icon>
              <div class="model-detail">
                <div class="model-label">模型版本</div>
                <div class="model-value">{{ modelInfo.version }}</div>
              </div>
            </div>
            <div class="model-item">
              <el-icon :size="20" color="#E6A23C"><DataLine /></el-icon>
              <div class="model-detail">
                <div class="model-label">训练数据量</div>
                <div class="model-value">{{ modelInfo.trainingData }}</div>
              </div>
            </div>
            <div class="model-item">
              <el-icon :size="20" color="#F56C6C"><TrendCharts /></el-icon>
              <div class="model-detail">
                <div class="model-label">验证准确率</div>
                <div class="model-value highlight">{{ modelInfo.accuracy }}</div>
              </div>
            </div>
            <div class="model-item">
              <el-icon :size="20" color="#909399"><Clock /></el-icon>
              <div class="model-detail">
                <div class="model-label">最后更新时间</div>
                <div class="model-value">{{ modelInfo.updateTime }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 详情弹窗 -->
    <el-dialog v-model="dialogVisible" title="水质识别详情" width="600px">
      <el-descriptions :column="2" border v-if="currentDetail">
        <el-descriptions-item label="站点名称">{{ currentDetail.siteName }}</el-descriptions-item>
        <el-descriptions-item label="识别时间">{{ currentDetail.identifyTime }}</el-descriptions-item>
        <el-descriptions-item label="分类结果">
          <el-tag :type="getTagType(currentDetail.classifyResult)" effect="dark">
            {{ currentDetail.classifyResult }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="置信度">{{ currentDetail.confidence }}%</el-descriptions-item>
        <el-descriptions-item label="主要污染物">{{ currentDetail.pollutants || '—' }}</el-descriptions-item>
        <el-descriptions-item label="识别模型">{{ currentDetail.model }}</el-descriptions-item>
        <el-descriptions-item label="监测指标" :span="2">
          <div class="indicator-list">
            <el-tag v-for="(value, key) in currentDetail.indicators" :key="key" class="indicator-tag">
              {{ key }}: {{ value }}
            </el-tag>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';
import { Refresh, Cpu, Document, DataLine, TrendCharts, Clock, Location, Warning, CircleCheck } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计卡片数据
const statCards = ref([
  { label: '监测站点总数', value: 6, color: '#409EFF', icon: 'Location' },
  { label: '正常水体', value: 3, color: '#67C23A', icon: 'CircleCheck' },
  { label: '轻度污染', value: 1, color: '#409EFF', icon: 'Warning' },
  { label: '中度污染', value: 1, color: '#E6A23C', icon: 'Warning' },
  { label: '黑臭水体', value: 1, color: '#F56C6C', icon: 'Warning' },
]);

// 表格数据
interface IdentifyResult {
  siteName: string;
  identifyTime: string;
  classifyResult: string;
  confidence: number;
  pollutants: string;
  model: string;
  indicators?: Record<string, string>;
}

const tableData = ref<IdentifyResult[]>([
  {
    siteName: '瑶湖',
    identifyTime: '2026-04-17 10:30:00',
    classifyResult: '正常水体',
    confidence: 96.5,
    pollutants: '',
    model: 'CNN-LSTM',
    indicators: { pH: '7.2', 溶解氧: '8.5mg/L', 浊度: '12NTU', 氨氮: '0.3mg/L' }
  },
  {
    siteName: '青山湖',
    identifyTime: '2026-04-17 10:29:55',
    classifyResult: '黑臭水体',
    confidence: 92.3,
    pollutants: '氨氮、总磷',
    model: 'CNN-LSTM',
    indicators: { pH: '6.8', 溶解氧: '2.1mg/L', 浊度: '85NTU', 氨氮: '4.5mg/L', 总磷: '0.8mg/L' }
  },
  {
    siteName: '赣江',
    identifyTime: '2026-04-17 10:29:50',
    classifyResult: '轻度污染',
    confidence: 88.7,
    pollutants: '浊度',
    model: 'CNN-LSTM',
    indicators: { pH: '7.0', 溶解氧: '6.8mg/L', 浊度: '45NTU', 氨氮: '0.8mg/L' }
  },
  {
    siteName: '艾溪湖',
    identifyTime: '2026-04-17 10:29:45',
    classifyResult: '正常水体',
    confidence: 95.2,
    pollutants: '',
    model: 'CNN-LSTM',
    indicators: { pH: '7.1', 溶解氧: '8.2mg/L', 浊度: '15NTU', 氨氮: '0.4mg/L' }
  },
  {
    siteName: '抚河',
    identifyTime: '2026-04-17 10:29:40',
    classifyResult: '中度污染',
    confidence: 91.1,
    pollutants: 'pH、溶解氧',
    model: 'CNN-LSTM',
    indicators: { pH: '6.2', 溶解氧: '4.5mg/L', 浊度: '38NTU', 氨氮: '1.2mg/L' }
  },
  {
    siteName: '鄱阳湖',
    identifyTime: '2026-04-17 10:29:35',
    classifyResult: '正常水体',
    confidence: 97.8,
    pollutants: '',
    model: 'CNN-LSTM',
    indicators: { pH: '7.3', 溶解氧: '9.0mg/L', 浊度: '10NTU', 氨氮: '0.2mg/L' }
  },
]);

// 模型信息
const modelInfo = ref({
  name: 'CNN-LSTM混合神经网络',
  version: 'v2.1.0',
  trainingData: '50,000条水质样本',
  accuracy: '95.3%',
  updateTime: '2026-03-15'
});

// 详情弹窗
const dialogVisible = ref(false);
const currentDetail = ref<IdentifyResult | null>(null);

// 获取标签类型
const getTagType = (result: string): string => {
  const typeMap: Record<string, string> = {
    '正常水体': 'success',
    '轻度污染': '',
    '中度污染': 'warning',
    '重度污染': 'danger',
    '黑臭水体': 'danger'
  };
  return typeMap[result] || '';
};

// 获取置信度颜色
const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 95) return '#67C23A';
  if (confidence >= 90) return '#409EFF';
  if (confidence >= 85) return '#E6A23C';
  return '#F56C6C';
};

// 显示详情
const showDetail = (row: IdentifyResult) => {
  currentDetail.value = row;
  dialogVisible.value = true;
};

// 刷新数据
const refreshData = () => {
  ElMessage.success('数据已刷新');
};

// 初始化趋势图
const initTrendChart = () => {
  const chartDom = document.getElementById('trendChart');
  if (!chartDom) return;
  
  const myChart = echarts.init(chartDom);
  
  const dates = ['04-11', '04-12', '04-13', '04-14', '04-15', '04-16', '04-17'];
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['瑶湖', '青山湖', '赣江', '艾溪湖', '抚河', '鄱阳湖'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates
    },
    yAxis: {
      type: 'value',
      name: '水质等级',
      min: 0,
      max: 5,
      interval: 1,
      axisLabel: {
        formatter: (value: number) => {
          const labels = ['', '正常', '轻度', '中度', '重度', '黑臭'];
          return labels[value] || '';
        }
      }
    },
    series: [
      {
        name: '瑶湖',
        type: 'line',
        smooth: true,
        data: [1, 1, 1, 1, 1, 1, 1],
        lineStyle: { color: '#67C23A' },
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '青山湖',
        type: 'line',
        smooth: true,
        data: [3, 4, 4, 5, 5, 5, 5],
        lineStyle: { color: '#F56C6C' },
        itemStyle: { color: '#F56C6C' }
      },
      {
        name: '赣江',
        type: 'line',
        smooth: true,
        data: [1, 2, 2, 2, 2, 2, 2],
        lineStyle: { color: '#409EFF' },
        itemStyle: { color: '#409EFF' }
      },
      {
        name: '艾溪湖',
        type: 'line',
        smooth: true,
        data: [1, 1, 1, 1, 1, 1, 1],
        lineStyle: { color: '#67C23A' },
        itemStyle: { color: '#67C23A' }
      },
      {
        name: '抚河',
        type: 'line',
        smooth: true,
        data: [2, 2, 3, 3, 3, 3, 3],
        lineStyle: { color: '#E6A23C' },
        itemStyle: { color: '#E6A23C' }
      },
      {
        name: '鄱阳湖',
        type: 'line',
        smooth: true,
        data: [1, 1, 1, 1, 1, 1, 1],
        lineStyle: { color: '#67C23A' },
        itemStyle: { color: '#67C23A' }
      }
    ]
  };
  
  myChart.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

onMounted(() => {
  initTrendChart();
});
</script>

<style lang="less" scoped>
.water-identify {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);

  .stat-cards {
    margin-bottom: 20px;
  }

  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .stat-info {
      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }

      .stat-label {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }

  .table-card {
    margin-bottom: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
    }
  }

  .bottom-section {
    .trend-card,
    .model-card {
      height: 400px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
    }

    .chart-container {
      width: 100%;
      height: 320px;
    }
  }

  .model-card {
    .model-info {
      padding: 10px 0;
    }

    .model-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid #EBEEF5;

      &:last-child {
        border-bottom: none;
      }

      .model-detail {
        flex: 1;

        .model-label {
          font-size: 12px;
          color: #909399;
          margin-bottom: 4px;
        }

        .model-value {
          font-size: 14px;
          color: #303133;
          font-weight: 500;

          &.highlight {
            color: #67C23A;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .indicator-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .indicator-tag {
      margin: 0;
    }
  }
}
</style>

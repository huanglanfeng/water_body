<template>
  <div class="edge-compute">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon total">
              <el-icon size="32"><Monitor /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.totalNodes }}</div>
              <div class="stat-label">边缘节点总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon online">
              <el-icon size="32"><CircleCheck /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.onlineNodes }}</div>
              <div class="stat-label">在线节点</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon offline">
              <el-icon size="32"><CircleClose /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.offlineNodes }}</div>
              <div class="stat-label">离线节点</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon rate">
              <el-icon size="32"><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ statistics.reportRate }}%</div>
              <div class="stat-label">数据上报率</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 边缘节点列表表格 -->
    <el-card class="node-table-card">
      <template #header>
        <div class="card-header">
          <span class="title">边缘节点列表</span>
          <el-button type="primary" size="small" @click="refreshNodes">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>
      </template>
      <el-table :data="edgeNodes" style="width: 100%" :border="true" stripe>
        <el-table-column prop="id" label="节点ID" width="100" />
        <el-table-column prop="name" label="节点名称" width="160" />
        <el-table-column prop="station" label="所属站点" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '在线' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP地址" width="150" />
        <el-table-column prop="lastReport" label="最后上报时间" width="180" />
        <el-table-column prop="frequency" label="数据上报频率" width="120" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" type="primary" link @click="showDetail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 数据采集状态区域 -->
    <el-card class="data-collection-card">
      <template #header>
        <div class="card-header">
          <span class="title">数据采集状态</span>
          <span class="update-time">最后更新: {{ lastUpdateTime }}</span>
        </div>
      </template>
      <el-row :gutter="16">
        <el-col :span="4" v-for="node in onlineNodes" :key="node.id">
          <div class="collection-item">
            <div class="node-name">{{ node.name }}</div>
            <div class="params">
              <div class="param">
                <span class="label">温度:</span>
                <span class="value">{{ node.data.temperature }}C</span>
              </div>
              <div class="param">
                <span class="label">pH:</span>
                <span class="value">{{ node.data.pH }}</span>
              </div>
              <div class="param">
                <span class="label">溶解氧:</span>
                <span class="value">{{ node.data.dissolvedOxygen }} mg/L</span>
              </div>
              <div class="param">
                <span class="label">浊度:</span>
                <span class="value">{{ node.data.turbidity }} NTU</span>
              </div>
            </div>
            <div class="report-time">{{ node.data.reportTime }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 边缘计算任务列表 -->
    <el-card class="task-table-card">
      <template #header>
        <div class="card-header">
          <span class="title">边缘计算任务列表</span>
        </div>
      </template>
      <el-table :data="edgeTasks" style="width: 100%" :border="true" stripe>
        <el-table-column prop="name" label="任务名称" width="180" />
        <el-table-column prop="nodes" label="执行节点" width="150" />
        <el-table-column prop="type" label="任务类型" width="120">
          <template #default="scope">
            <el-tag :type="getTaskTypeTag(scope.row.type)">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="frequency" label="执行频率" width="150" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag type="success">
              <el-icon class="is-loading" style="margin-right: 4px;"><Loading /></el-icon>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="任务描述" />
      </el-table>
    </el-card>

    <!-- 节点详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="节点详情" width="600px">
      <div class="detail-content" v-if="currentNode">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="节点ID">{{ currentNode.id }}</el-descriptions-item>
          <el-descriptions-item label="节点名称">{{ currentNode.name }}</el-descriptions-item>
          <el-descriptions-item label="所属站点">{{ currentNode.station }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="currentNode.status === '在线' ? 'success' : 'danger'">
              {{ currentNode.status }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="IP地址">{{ currentNode.ip }}</el-descriptions-item>
          <el-descriptions-item label="数据上报频率">{{ currentNode.frequency }}</el-descriptions-item>
          <el-descriptions-item label="最后上报时间">{{ currentNode.lastReport }}</el-descriptions-item>
          <el-descriptions-item label="运行时长">{{ currentNode.runtime }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <div class="detail-stats">
          <h4>节点性能指标</h4>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="stat-item">
                <el-progress type="circle" :percentage="currentNode.cpu" :width="80" />
                <div class="stat-label">CPU使用率</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stat-item">
                <el-progress type="circle" :percentage="currentNode.memory" :width="80" color="#67c23a" />
                <div class="stat-label">内存使用率</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stat-item">
                <el-progress type="circle" :percentage="currentNode.disk" :width="80" color="#e6a23c" />
                <div class="stat-label">磁盘使用率</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { 
  Monitor, 
  CircleCheck, 
  CircleClose, 
  TrendCharts, 
  Refresh, 
  Loading 
} from '@element-plus/icons-vue';
import { getEdgeNodes, getEdgeTasks, getEdgeNodeDetail } from '@/api/backstage/EdgeCompute';

// 统计数据
const statistics = ref({
  totalNodes: 6,
  onlineNodes: 5,
  offlineNodes: 1,
  reportRate: 98.5
});

// 边缘节点数据
const edgeNodes = ref([
  {
    id: 'E001',
    name: '瑶湖监测节点',
    station: '瑶湖',
    status: '在线',
    ip: '192.168.1.101',
    lastReport: '2026-04-17 10:30:00',
    frequency: '5秒/次',
    runtime: '15天6小时',
    cpu: 45,
    memory: 62,
    disk: 38,
    data: {
      temperature: 23.5,
      pH: 7.2,
      dissolvedOxygen: 8.3,
      turbidity: 12.5,
      reportTime: '10:30:00'
    }
  },
  {
    id: 'E002',
    name: '青山湖监测节点',
    station: '青山湖',
    status: '在线',
    ip: '192.168.1.102',
    lastReport: '2026-04-17 10:29:55',
    frequency: '5秒/次',
    runtime: '12天3小时',
    cpu: 38,
    memory: 55,
    disk: 42,
    data: {
      temperature: 22.8,
      pH: 7.0,
      dissolvedOxygen: 7.8,
      turbidity: 15.2,
      reportTime: '10:29:55'
    }
  },
  {
    id: 'E003',
    name: '赣江监测节点',
    station: '赣江',
    status: '在线',
    ip: '192.168.1.103',
    lastReport: '2026-04-17 10:29:50',
    frequency: '10秒/次',
    runtime: '20天12小时',
    cpu: 52,
    memory: 68,
    disk: 55,
    data: {
      temperature: 21.2,
      pH: 6.8,
      dissolvedOxygen: 9.1,
      turbidity: 8.6,
      reportTime: '10:29:50'
    }
  },
  {
    id: 'E004',
    name: '艾溪湖监测节点',
    station: '艾溪湖',
    status: '在线',
    ip: '192.168.1.104',
    lastReport: '2026-04-17 10:29:45',
    frequency: '5秒/次',
    runtime: '8天18小时',
    cpu: 35,
    memory: 48,
    disk: 30,
    data: {
      temperature: 24.1,
      pH: 7.4,
      dissolvedOxygen: 7.5,
      turbidity: 18.3,
      reportTime: '10:29:45'
    }
  },
  {
    id: 'E005',
    name: '抚河监测节点',
    station: '抚河',
    status: '在线',
    ip: '192.168.1.105',
    lastReport: '2026-04-17 10:29:40',
    frequency: '5秒/次',
    runtime: '5天9小时',
    cpu: 42,
    memory: 58,
    disk: 35,
    data: {
      temperature: 22.5,
      pH: 7.1,
      dissolvedOxygen: 8.0,
      turbidity: 10.8,
      reportTime: '10:29:40'
    }
  },
  {
    id: 'E006',
    name: '鄱阳湖监测节点',
    station: '鄱阳湖',
    status: '离线',
    ip: '192.168.1.106',
    lastReport: '2026-04-17 09:15:00',
    frequency: '10秒/次',
    runtime: '-',
    cpu: 0,
    memory: 0,
    disk: 0,
    data: {
      temperature: '-',
      pH: '-',
      dissolvedOxygen: '-',
      turbidity: '-',
      reportTime: '-'
    }
  }
]);

// 边缘计算任务数据
const edgeTasks = ref([
  {
    name: '数据清洗',
    nodes: 'E001-E006',
    type: '预处理',
    frequency: '实时',
    status: '运行中',
    description: '对采集的水质数据进行去噪、异常值过滤等预处理操作'
  },
  {
    name: '特征提取',
    nodes: 'E001-E006',
    type: '分析',
    frequency: '1分钟/次',
    status: '运行中',
    description: '从原始数据中提取水质变化趋势、周期性特征等关键指标'
  },
  {
    name: '异常检测',
    nodes: 'E001-E006',
    type: '检测',
    frequency: '实时',
    status: '运行中',
    description: '实时检测水质参数异常，触发预警机制'
  },
  {
    name: '数据压缩',
    nodes: 'E001-E006',
    type: '优化',
    frequency: '5分钟/次',
    status: '运行中',
    description: '对历史数据进行压缩存储，减少传输带宽占用'
  }
]);

// 最后更新时间
const lastUpdateTime = ref('2026-04-17 10:30:00');

// 详情对话框
const detailDialogVisible = ref(false);
const currentNode = ref<any>(null);

// 在线节点列表
const onlineNodes = computed(() => {
  return edgeNodes.value.filter(node => node.status === '在线');
});

// 刷新节点数据
const refreshNodes = () => {
  // 模拟刷新
  lastUpdateTime.value = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-');
};

// 显示节点详情
const showDetail = (node: any) => {
  currentNode.value = node;
  detailDialogVisible.value = true;
};

// 获取任务类型标签颜色
const getTaskTypeTag = (type: string) => {
  const typeMap: Record<string, string> = {
    '预处理': 'primary',
    '分析': 'success',
    '检测': 'warning',
    '优化': 'info'
  };
  return typeMap[type] || 'info';
};

// 定时刷新数据
let refreshTimer: any = null;

onMounted(() => {
  // 每5秒刷新一次数据
  refreshTimer = setInterval(() => {
    // 模拟数据更新
    edgeNodes.value.forEach(node => {
      if (node.status === '在线') {
        // 随机波动数据
        node.data.temperature = +(node.data.temperature + (Math.random() - 0.5) * 0.2).toFixed(1);
        node.data.pH = +(node.data.pH + (Math.random() - 0.5) * 0.1).toFixed(1);
        node.data.dissolvedOxygen = +(node.data.dissolvedOxygen + (Math.random() - 0.5) * 0.3).toFixed(1);
        node.data.turbidity = +(node.data.turbidity + (Math.random() - 0.5) * 0.5).toFixed(1);
        node.data.reportTime = new Date().toLocaleTimeString('zh-CN');
        node.lastReport = new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(/\//g, '-');
      }
    });
    lastUpdateTime.value = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-');
  }, 5000);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style lang="less" scoped>
.edge-compute {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 100px);

  .stat-cards {
    margin-bottom: 20px;

    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        padding: 10px;

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: white;

          &.total {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          &.online {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          }

          &.offline {
            background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
          }

          &.rate {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
        }

        .stat-info {
          .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: #303133;
          }

          .stat-label {
            font-size: 14px;
            color: #909399;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .node-table-card,
  .data-collection-card,
  .task-table-card {
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

      .update-time {
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .data-collection-card {
    .collection-item {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      padding: 12px;
      color: white;
      margin-bottom: 10px;

      .node-name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 8px;
        text-align: center;
      }

      .params {
        .param {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 4px;

          .label {
            opacity: 0.8;
          }

          .value {
            font-weight: bold;
          }
        }
      }

      .report-time {
        font-size: 10px;
        text-align: right;
        opacity: 0.7;
        margin-top: 8px;
      }
    }
  }

  .detail-content {
    .detail-stats {
      h4 {
        margin-bottom: 16px;
        color: #303133;
      }

      .stat-item {
        text-align: center;

        .stat-label {
          margin-top: 8px;
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}
</style>

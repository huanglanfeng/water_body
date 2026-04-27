<template>
  <div class="shebei">
    <!-- 设备状态统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card online-card">
          <div class="stat-content">
            <div class="stat-icon online">
              <el-icon size="32"><CircleCheck /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ deviceStats.online }}</div>
              <div class="stat-label">在线设备</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card offline-card">
          <div class="stat-content">
            <div class="stat-icon offline">
              <el-icon size="32"><CircleClose /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ deviceStats.offline }}</div>
              <div class="stat-label">离线设备</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card maintenance-card">
          <div class="stat-content">
            <div class="stat-icon maintenance">
              <el-icon size="32"><SetUp /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ deviceStats.maintenance }}</div>
              <div class="stat-label">维护中</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <map_tableVue></map_tableVue>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { CircleCheck, CircleClose, SetUp } from '@element-plus/icons-vue';
import map_tableVue from "@/components/backstage/shebei/map_table.vue";

// 设备状态统计数据
const deviceStats = ref({
  online: 0,
  offline: 0,
  maintenance: 0
});

// 模拟从API获取设备统计数据
const fetchDeviceStats = async () => {
  try {
    // TODO: 替换为实际API调用
    // const res = await getDeviceStats();
    // deviceStats.value = res.data;
    // 模拟数据
    deviceStats.value = {
      online: 12,
      offline: 3,
      maintenance: 2
    };
  } catch (error) {
    // 接口异常时使用默认值
    deviceStats.value = {
      online: 12,
      offline: 3,
      maintenance: 2
    };
  }
};

onMounted(() => {
  fetchDeviceStats();
});
</script>

<style lang="less" scoped>
.shebei {
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

          &.online {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          }

          &.offline {
            background: linear-gradient(135deg, #a8a8a8 0%, #8e8e8e 100%);
          }

          &.maintenance {
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
}
</style>

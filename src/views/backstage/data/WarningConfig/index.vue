<template>
  <div class="warning-config">
    <el-card shadow="hover" class="config-card">
      <template #header>
        <div class="card-header">
          <span class="title">预警阈值配置</span>
          <el-tag type="info">水质参数预警阈值设置</el-tag>
        </div>
      </template>
      
      <el-form
        ref="thresholdFormRef"
        :model="configData"
        label-width="120px"
        v-loading="loading"
      >
        <!-- 预警阈值配置表格 -->
        <el-table
          :data="configData.thresholds"
          border
          style="width: 100%"
          class="threshold-table"
        >
          <el-table-column prop="name" label="参数名称" min-width="120" align="center" />
          <el-table-column label="正常范围" min-width="150" align="center">
            <template #default="{ row }">
              <span v-if="row.normalMin !== null && row.normalMax !== null">
                {{ row.normalMin }} - {{ row.normalMax }}
              </span>
              <span v-else-if="row.normalMin !== null">
                >= {{ row.normalMin }}
              </span>
              <span v-else-if="row.normalMax !== null">
                <= {{ row.normalMax }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="预警阈值下限" min-width="150" align="center">
            <template #default="{ row }">
              <el-form-item
                :prop="`thresholds.${$index}.warningMin`"
                :rules="getNumberRules(row)"
                v-for="($item, $index) in configData.thresholds"
                :key="$index"
                style="margin-bottom: 0"
                v-show="$index === configData.thresholds.indexOf(row)"
              >
                <el-input-number
                  v-model="row.warningMin"
                  :precision="1"
                  :min="0"
                  :max="100"
                  controls-position="right"
                  placeholder="无下限"
                  style="width: 100%"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="预警阈值上限" min-width="150" align="center">
            <template #default="{ row }">
              <el-form-item
                :prop="`thresholds.${$index}.warningMax`"
                :rules="getNumberRules(row)"
                v-for="($item, $index) in configData.thresholds"
                :key="$index"
                style="margin-bottom: 0"
                v-show="$index === configData.thresholds.indexOf(row)"
              >
                <el-input-number
                  v-model="row.warningMax"
                  :precision="1"
                  :min="0"
                  :max="2000"
                  controls-position="right"
                  placeholder="无上限"
                  style="width: 100%"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" min-width="100" align="center" />
          <el-table-column label="状态" min-width="100" align="center">
            <template #default="{ row }">
              <el-switch
                v-model="row.enabled"
                active-text="启用"
                inactive-text="禁用"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>

    <!-- 预警等级配置 -->
    <el-card shadow="hover" class="config-card">
      <template #header>
        <div class="card-header">
          <span class="title">预警等级配置</span>
          <el-tag type="warning">根据超出正常范围的参数数量判定</el-tag>
        </div>
      </template>
      
      <el-table
        :data="configData.levels"
        border
        style="width: 100%"
        class="level-table"
      >
        <el-table-column prop="id" label="等级" min-width="80" align="center">
          <template #default="{ row }">
            <el-tag :color="row.color" effect="dark" style="border: none">
              {{ row.id }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="120" align="center">
          <template #default="{ row }">
            <span :style="{ color: row.color, fontWeight: 'bold' }">
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="triggerCondition" label="触发条件" align="center" />
        <el-table-column label="颜色标识" min-width="120" align="center">
          <template #default="{ row }">
            <div class="color-block" :style="{ backgroundColor: row.color }"></div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 预警通知配置 -->
    <el-card shadow="hover" class="config-card">
      <template #header>
        <div class="card-header">
          <span class="title">预警通知配置</span>
          <el-tag type="success">设置预警通知方式</el-tag>
        </div>
      </template>
      
      <el-form
        ref="notificationFormRef"
        :model="configData.notification"
        label-width="120px"
        :rules="notificationRules"
      >
        <el-form-item label="系统通知">
          <div class="notify-item">
            <el-switch
              v-model="configData.notification.systemNotify"
              active-text="开启"
              inactive-text="关闭"
            />
            <span class="notify-desc">在系统内显示预警通知消息</span>
          </div>
        </el-form-item>
        
        <el-form-item label="邮件通知" prop="emailAddress">
          <div class="notify-item">
            <el-switch
              v-model="configData.notification.emailNotify"
              active-text="开启"
              inactive-text="关闭"
            />
            <el-input
              v-model="configData.notification.emailAddress"
              placeholder="请输入邮箱地址"
              style="width: 250px; margin-left: 15px"
              :disabled="!configData.notification.emailNotify"
            />
          </div>
        </el-form-item>
        
        <el-form-item label="短信通知" prop="phoneNumber">
          <div class="notify-item">
            <el-switch
              v-model="configData.notification.smsNotify"
              active-text="开启"
              inactive-text="关闭"
            />
            <el-input
              v-model="configData.notification.phoneNumber"
              placeholder="请输入手机号码"
              style="width: 250px; margin-left: 15px"
              :disabled="!configData.notification.smsNotify"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="handleSave" :loading="saving">
        <el-icon style="margin-right: 5px"><Check /></el-icon>
        保存配置
      </el-button>
      <el-button @click="handleReset" :loading="resetting">
        <el-icon style="margin-right: 5px"><RefreshRight /></el-icon>
        重置为默认值
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { Check, RefreshRight } from "@element-plus/icons-vue";
import {
  getWarningConfig,
  saveWarningConfig,
  resetWarningConfig,
  type WarningConfigData,
  type WarningThresholdItem,
} from "@/api/backstage/WarningConfig";

// 表单引用
const thresholdFormRef = ref<FormInstance>();
const notificationFormRef = ref<FormInstance>();

// 加载状态
const loading = ref(false);
const saving = ref(false);
const resetting = ref(false);

// 默认配置数据
const defaultThresholds: WarningThresholdItem[] = [
  { id: "ph", name: "pH值", normalMin: 6.5, normalMax: 8.5, warningMin: 6.0, warningMax: 9.0, unit: "—", enabled: true },
  { id: "do", name: "溶解氧", normalMin: 5.0, normalMax: null, warningMin: 3.0, warningMax: null, unit: "mg/L", enabled: true },
  { id: "turbidity", name: "浊度", normalMin: null, normalMax: 10, warningMin: null, warningMax: 15, unit: "TU", enabled: true },
  { id: "nh3n", name: "氨氮", normalMin: null, normalMax: 1.0, warningMin: null, warningMax: 1.5, unit: "mg/L", enabled: true },
  { id: "tp", name: "总磷", normalMin: null, normalMax: 0.2, warningMin: null, warningMax: 0.3, unit: "mg/L", enabled: true },
  { id: "temp", name: "水温", normalMin: 15, normalMax: 30, warningMin: 10, warningMax: 35, unit: "℃", enabled: true },
  { id: "conductivity", name: "电导率", normalMin: 200, normalMax: 800, warningMin: 100, warningMax: 1000, unit: "μS/cm", enabled: true },
];

const defaultLevels = [
  { id: 1, name: "正常", triggerCondition: "所有参数在正常范围内", color: "#67C23A" },
  { id: 2, name: "轻度预警", triggerCondition: "1个参数超出正常范围", color: "#409EFF" },
  { id: 3, name: "中度预警", triggerCondition: "2个参数超出正常范围", color: "#E6A23C" },
  { id: 4, name: "重度预警", triggerCondition: "3个及以上参数超出正常范围", color: "#F56C6C" },
];

const defaultNotification = {
  systemNotify: true,
  emailNotify: false,
  emailAddress: "",
  smsNotify: false,
  phoneNumber: "",
};

// 配置数据
const configData = reactive<WarningConfigData>({
  thresholds: JSON.parse(JSON.stringify(defaultThresholds)),
  levels: JSON.parse(JSON.stringify(defaultLevels)),
  notification: { ...defaultNotification },
});

// 邮箱验证规则
const validateEmail = (rule: any, value: string, callback: any) => {
  if (configData.notification.emailNotify && !value) {
    callback(new Error("请输入邮箱地址"));
  } else if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback(new Error("请输入有效的邮箱地址"));
  } else {
    callback();
  }
};

// 手机号验证规则
const validatePhone = (rule: any, value: string, callback: any) => {
  if (configData.notification.smsNotify && !value) {
    callback(new Error("请输入手机号码"));
  } else if (value && !/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error("请输入有效的手机号码"));
  } else {
    callback();
  }
};

// 通知配置验证规则
const notificationRules: FormRules = {
  emailAddress: [{ validator: validateEmail, trigger: "blur" }],
  phoneNumber: [{ validator: validatePhone, trigger: "blur" }],
};

// 获取数字输入验证规则
const getNumberRules = (row: WarningThresholdItem) => {
  return [
    {
      validator: (rule: any, value: number, callback: any) => {
        if (row.warningMin !== null && row.warningMax !== null) {
          if (row.warningMin >= row.warningMax) {
            callback(new Error("下限必须小于上限"));
            return;
          }
        }
        callback();
      },
      trigger: "change",
    },
  ];
};

// 获取配置数据
const fetchConfig = async () => {
  loading.value = true;
  try {
    const res = await getWarningConfig();
    if (res && res.data) {
      configData.thresholds = res.data.thresholds || JSON.parse(JSON.stringify(defaultThresholds));
      configData.levels = res.data.levels || JSON.parse(JSON.stringify(defaultLevels));
      configData.notification = res.data.notification || { ...defaultNotification };
    }
  } catch (error) {
    console.error("获取配置失败:", error);
    // 使用默认配置
    configData.thresholds = JSON.parse(JSON.stringify(defaultThresholds));
    configData.levels = JSON.parse(JSON.stringify(defaultLevels));
    configData.notification = { ...defaultNotification };
  } finally {
    loading.value = false;
  }
};

// 保存配置
const handleSave = async () => {
  // 验证表单
  const thresholdValid = await thresholdFormRef.value?.validate().catch(() => false);
  const notificationValid = await notificationFormRef.value?.validate().catch(() => false);
  
  if (!thresholdValid || !notificationValid) {
    ElMessage.warning("请检查表单填写是否正确");
    return;
  }
  
  saving.value = true;
  try {
    await saveWarningConfig(configData);
    ElMessage.success("配置保存成功");
  } catch (error) {
    console.error("保存配置失败:", error);
    ElMessage.error("配置保存失败，请重试");
  } finally {
    saving.value = false;
  }
};

// 重置为默认配置
const handleReset = () => {
  ElMessageBox.confirm(
    "确定要重置为默认配置吗？当前配置将被覆盖。",
    "确认重置",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    resetting.value = true;
    try {
      await resetWarningConfig();
      // 重置本地数据
      configData.thresholds = JSON.parse(JSON.stringify(defaultThresholds));
      configData.levels = JSON.parse(JSON.stringify(defaultLevels));
      configData.notification = { ...defaultNotification };
      ElMessage.success("已重置为默认配置");
    } catch (error) {
      console.error("重置配置失败:", error);
      // 即使接口失败也重置本地数据
      configData.thresholds = JSON.parse(JSON.stringify(defaultThresholds));
      configData.levels = JSON.parse(JSON.stringify(defaultLevels));
      configData.notification = { ...defaultNotification };
      ElMessage.success("已重置为默认配置");
    } finally {
      resetting.value = false;
    }
  }).catch(() => {
    // 用户取消
  });
};

// 页面加载时获取配置
onMounted(() => {
  fetchConfig();
});
</script>

<style lang="less" scoped>
.warning-config {
  padding: 20px;
  
  .config-card {
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
      }
    }
  }
  
  .threshold-table {
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
    
    :deep(.el-form-item__error) {
      position: relative;
      top: 0;
      left: 0;
      padding-top: 4px;
    }
  }
  
  .level-table {
    .color-block {
      width: 40px;
      height: 20px;
      border-radius: 4px;
      margin: 0 auto;
    }
  }
  
  .notify-item {
    display: flex;
    align-items: center;
    
    .notify-desc {
      margin-left: 15px;
      color: #909399;
      font-size: 13px;
    }
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
    
    .el-button {
      min-width: 140px;
    }
  }
}
</style>

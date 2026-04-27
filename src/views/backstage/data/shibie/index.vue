<template>
  <div class="shibie">
    <!-- 回放控制栏 -->
    <div class="replay-bar">
      <el-date-picker
        v-model="replayTimeRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="defaultTime"
        style="width: 420px;"
      />
      <el-button type="primary" @click="handleReplay" :icon="VideoPlay">
        回放
      </el-button>
      <el-button v-if="isReplaying" type="danger" @click="stopReplay" :icon="VideoPause">
        停止回放
      </el-button>
    </div>

    <!-- 视频网格 -->
    <gridVue></gridVue>

    <!-- 回放时间轴 -->
    <transition name="slide-fade">
      <div v-if="isReplaying" class="replay-timeline">
        <div class="timeline-header">
          <span class="timeline-label">回放进度</span>
          <span class="timeline-time">{{ currentTimeDisplay }}</span>
        </div>
        <div class="timeline-slider-wrapper">
          <el-slider
            v-model="replayProgress"
            :min="0"
            :max="100"
            :step="0.1"
            :format-tooltip="formatTooltip"
            @change="onProgressChange"
            class="timeline-slider"
          />
        </div>
        <div class="timeline-controls">
          <el-button-group>
            <el-button :icon="DArrowLeft" size="small" @click="fastBackward">快退</el-button>
            <el-button :icon="isPlaying ? VideoPause : VideoPlay" size="small" @click="togglePlay">
              {{ isPlaying ? '暂停' : '播放' }}
            </el-button>
            <el-button :icon="DArrowRight" size="small" @click="fastForward">快进</el-button>
          </el-button-group>
          <div class="speed-selector">
            <span>倍速：</span>
            <el-select v-model="playSpeed" size="small" style="width: 80px;">
              <el-option label="0.5x" :value="0.5" />
              <el-option label="1x" :value="1" />
              <el-option label="2x" :value="2" />
              <el-option label="4x" :value="4" />
              <el-option label="8x" :value="8" />
            </el-select>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { VideoPlay, VideoPause, DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import gridVue from "@/components/backstage/shibie/grid.vue";

// 回放时间范围
const replayTimeRange = ref<[string, string] | null>(null);
const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 1, 1, 23, 59, 59),
];

// 回放状态
const isReplaying = ref(false);
const isPlaying = ref(false);
const replayProgress = ref(0);
const playSpeed = ref(1);
let playTimer: ReturnType<typeof setInterval> | null = null;

// 计算当前回放显示时间
const currentTimeDisplay = computed(() => {
  if (!replayTimeRange.value) return "--:--:--";
  const start = new Date(replayTimeRange.value[0]).getTime();
  const end = new Date(replayTimeRange.value[1]).getTime();
  const totalMs = end - start;
  if (totalMs <= 0) return "--:--:--";
  const currentMs = start + totalMs * (replayProgress.value / 100);
  const date = new Date(currentMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
});

// 格式化滑块提示
const formatTooltip = (val: number) => {
  if (!replayTimeRange.value) return "";
  const start = new Date(replayTimeRange.value[0]).getTime();
  const end = new Date(replayTimeRange.value[1]).getTime();
  const totalMs = end - start;
  if (totalMs <= 0) return "";
  const currentMs = start + totalMs * (val / 100);
  const date = new Date(currentMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

// 点击回放
const handleReplay = () => {
  if (!replayTimeRange.value) {
    ElMessage.warning("请先选择回放时间范围");
    return;
  }
  const start = new Date(replayTimeRange.value[0]).getTime();
  const end = new Date(replayTimeRange.value[1]).getTime();
  if (start >= end) {
    ElMessage.warning("开始时间必须早于结束时间");
    return;
  }
  isReplaying.value = true;
  isPlaying.value = true;
  replayProgress.value = 0;
  startPlayTimer();
  ElMessage.success("开始回放");
};

// 停止回放
const stopReplay = () => {
  isReplaying.value = false;
  isPlaying.value = false;
  replayProgress.value = 0;
  clearPlayTimer();
};

// 切换播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    isPlaying.value = false;
    clearPlayTimer();
  } else {
    isPlaying.value = true;
    startPlayTimer();
  }
};

// 快退
const fastBackward = () => {
  replayProgress.value = Math.max(0, replayProgress.value - 5);
};

// 快进
const fastForward = () => {
  replayProgress.value = Math.min(100, replayProgress.value + 5);
};

// 进度变化
const onProgressChange = (val: number) => {
  replayProgress.value = val;
};

// 启动播放定时器
const startPlayTimer = () => {
  clearPlayTimer();
  playTimer = setInterval(() => {
    if (replayProgress.value >= 100) {
      replayProgress.value = 100;
      isPlaying.value = false;
      clearPlayTimer();
      ElMessage.info("回放结束");
      return;
    }
    replayProgress.value = Math.min(100, replayProgress.value + 0.1 * playSpeed.value);
  }, 100);
};

// 清除定时器
const clearPlayTimer = () => {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
  }
};

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  clearPlayTimer();
});
</script>

<style lang="less" scoped>
.shibie {
  padding: 10px;
}

.replay-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
}

.replay-timeline {
  margin-top: 12px;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(64, 158, 255, 0.3);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.timeline-label {
  font-size: 13px;
  color: #909399;
}

.timeline-time {
  font-size: 16px;
  font-weight: bold;
  color: #409eff;
  font-family: "Courier New", monospace;
}

.timeline-slider-wrapper {
  padding: 0 8px;
}

.timeline-slider {
  :deep(.el-slider__runway) {
    background-color: rgba(255, 255, 255, 0.15);
  }
  :deep(.el-slider__bar) {
    background-color: #409eff;
  }
  :deep(.el-slider__button) {
    border-color: #409eff;
    width: 14px;
    height: 14px;
  }
}

.timeline-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.speed-selector {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #909399;
  font-size: 13px;
}

/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>

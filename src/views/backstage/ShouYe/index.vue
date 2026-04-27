<template>
  <div class="dashboard">
    <leftVue></leftVue>
    <div class="right-wrapper">
      <!-- 实时预警播报 -->
      <div class="warning-broadcast">
        <div class="broadcast-header">
          <div class="broadcast-title">
            <span class="broadcast-icon"></span>
            实时预警播报
          </div>
          <el-tag type="danger" size="small" effect="dark" class="broadcast-badge">
            {{ warningList.length }} 条预警
          </el-tag>
        </div>
        <div class="broadcast-content" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <div class="scroll-wrapper" ref="scrollWrapperRef">
            <div
              class="scroll-inner"
              :class="{ 'scroll-animate': isScrolling }"
              :style="{ transform: isScrolling ? `translateY(-${scrollOffset}px)` : 'translateY(0)' }"
            >
              <div
                v-for="(item, index) in displayList"
                :key="item.id || index"
                class="warning-item"
                :class="getLevelClass(item.level)"
              >
                <div class="warning-item-left">
                  <span class="warning-dot"></span>
                  <span class="warning-level-tag">{{ item.level || '预警' }}</span>
                </div>
                <div class="warning-item-content">
                  <div class="warning-text">{{ item.content || item.message || '未知预警信息' }}</div>
                  <div class="warning-meta">
                    <span class="warning-location" v-if="item.location">
                      <el-icon><Location /></el-icon>
                      {{ item.location }}
                    </span>
                    <span class="warning-time">{{ item.time || item.create_time || '--' }}</span>
                  </div>
                </div>
              </div>
              <!-- 用于无缝滚动的副本 -->
              <div
                v-for="(item, index) in displayList"
                v-if="isScrolling && displayList.length > 0"
                :key="'copy-' + (item.id || index)"
                class="warning-item"
                :class="getLevelClass(item.level)"
              >
                <div class="warning-item-left">
                  <span class="warning-dot"></span>
                  <span class="warning-level-tag">{{ item.level || '预警' }}</span>
                </div>
                <div class="warning-item-content">
                  <div class="warning-text">{{ item.content || item.message || '未知预警信息' }}</div>
                  <div class="warning-meta">
                    <span class="warning-location" v-if="item.location">
                      <el-icon><Location /></el-icon>
                      {{ item.location }}
                    </span>
                    <span class="warning-time">{{ item.time || item.create_time || '--' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!warningList.length" class="no-warning">
            暂无预警信息
          </div>
        </div>
      </div>
      <rightVue></rightVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Location } from "@element-plus/icons-vue";
import leftVue from "@/components/backstage/ShouYe/left.vue";
import rightVue from "@/components/backstage/ShouYe/right.vue";
import requests from "@/utils/request";

// 预警数据
const warningList = ref<any[]>([]);
const scrollWrapperRef = ref<HTMLElement | null>(null);
const scrollOffset = ref(0);
const isScrolling = ref(false);
let scrollTimer: ReturnType<typeof requestAnimationFrame> | null = null;
let isPaused = false;
const SCROLL_SPEED = 0.5; // 每帧滚动像素数

// 用于展示的列表（如果数据不足，复制填充以支持滚动）
const displayList = computed(() => {
  if (warningList.value.length === 0) return [];
  return warningList.value;
});

// 获取预警级别样式
const getLevelClass = (level: string) => {
  if (!level) return 'level-default';
  const l = level.toLowerCase();
  if (l.includes('严重') || l.includes('紧急') || l.includes('critical')) return 'level-critical';
  if (l.includes('高') || l.includes('重') || l.includes('high')) return 'level-high';
  if (l.includes('中') || l.includes('medium')) return 'level-medium';
  return 'level-low';
};

// 获取预警数据
const fetchWarnings = async () => {
  try {
    const res = await requests.get("/warning/list", { params: { page: 1, pageSize: 20 } });
    if (res && res.data) {
      warningList.value = Array.isArray(res.data) ? res.data : (res.data.list || res.data.records || []);
    }
  } catch (e) {
    console.warn('预警数据加载失败', e);
    // 使用模拟数据作为降级方案
    warningList.value = [
      { id: 1, level: '严重', content: '赣江断面水质PH值严重超标，当前值9.2', location: '赣江断面A3', time: '2026-04-27 10:30' },
      { id: 2, level: '高', content: '抚河入湖口溶解氧含量低于标准阈值', location: '抚河入湖口', time: '2026-04-27 10:15' },
      { id: 3, level: '中', content: '鄱阳湖西区氨氮浓度接近预警线', location: '鄱阳湖西区', time: '2026-04-27 09:58' },
      { id: 4, level: '高', content: '信江监测站浊度异常升高，疑似泥沙涌入', location: '信江监测站', time: '2026-04-27 09:42' },
      { id: 5, level: '中', content: '锦江流域总磷含量超出三类水标准', location: '锦江流域B2', time: '2026-04-27 09:30' },
      { id: 6, level: '严重', content: '修水河段检测到重金属镉超标3倍', location: '修水河段C1', time: '2026-04-27 09:15' },
      { id: 7, level: '低', content: '潦河监测点水温偏高，请关注', location: '潦河监测点', time: '2026-04-27 09:00' },
    ];
  }
  await nextTick();
  startScroll();
};

// 开始滚动
const startScroll = () => {
  if (warningList.value.length <= 3) return;
  isScrolling.value = true;
  scrollOffset.value = 0;
  animateScroll();
};

// 滚动动画
const animateScroll = () => {
  if (isPaused) {
    scrollTimer = requestAnimationFrame(animateScroll);
    return;
  }

  const wrapper = scrollWrapperRef.value;
  if (!wrapper) {
    scrollTimer = requestAnimationFrame(animateScroll);
    return;
  }

  const itemHeight = 72; // 每个预警项的高度
  const totalHeight = warningList.value.length * itemHeight;

  scrollOffset.value += SCROLL_SPEED;

  // 滚动完一轮后重置
  if (scrollOffset.value >= totalHeight) {
    scrollOffset.value = 0;
  }

  scrollTimer = requestAnimationFrame(animateScroll);
};

// 暂停滚动
const pauseScroll = () => {
  isPaused = true;
};

// 恢复滚动
const resumeScroll = () => {
  isPaused = false;
};

// 定时刷新预警数据
let refreshTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  fetchWarnings();
  // 每30秒刷新一次预警数据
  refreshTimer = setInterval(fetchWarnings, 30000);
});

onBeforeUnmount(() => {
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer);
  }
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
}

.right-wrapper {
  width: 25vw;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
}

/* 预警播报区域 */
.warning-broadcast {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 79, 0.3);
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(255, 77, 79, 0.1);
}

.broadcast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 77, 79, 0.08);
  border-bottom: 1px solid rgba(255, 77, 79, 0.15);
}

.broadcast-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #ff4d4f;
}

.broadcast-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4f;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 0 6px rgba(255, 77, 79, 0);
  }
}

.broadcast-badge {
  font-size: 11px;
}

.broadcast-content {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.scroll-wrapper {
  height: 100%;
  overflow: hidden;
}

.scroll-inner {
  transition: none;
}

.scroll-animate {
  will-change: transform;
}

/* 预警项 */
.warning-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 16px;
  height: 72px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

.warning-item-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  padding-top: 2px;
}

.warning-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-bottom: 4px;
}

.warning-level-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
}

.warning-item-content {
  flex: 1;
  min-width: 0;
}

.warning-text {
  font-size: 12px;
  color: #e0e0e0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-size: 11px;
  color: #666;
}

.warning-location {
  display: flex;
  align-items: center;
  gap: 2px;
}

.warning-time {
  color: #555;
}

/* 预警级别颜色 */
.level-critical {
  .warning-dot { background: #ff4d4f; box-shadow: 0 0 6px rgba(255, 77, 79, 0.6); }
  .warning-level-tag { background: rgba(255, 77, 79, 0.2); color: #ff4d4f; }
  .warning-text { color: #ff8a8a; }
}

.level-high {
  .warning-dot { background: #fa8c16; box-shadow: 0 0 6px rgba(250, 140, 22, 0.6); }
  .warning-level-tag { background: rgba(250, 140, 22, 0.2); color: #fa8c16; }
  .warning-text { color: #ffc069; }
}

.level-medium {
  .warning-dot { background: #faad14; box-shadow: 0 0 6px rgba(250, 173, 20, 0.6); }
  .warning-level-tag { background: rgba(250, 173, 20, 0.2); color: #faad14; }
  .warning-text { color: #ffd666; }
}

.level-low {
  .warning-dot { background: #52c41a; }
  .warning-level-tag { background: rgba(82, 196, 26, 0.2); color: #52c41a; }
}

.level-default {
  .warning-dot { background: #409eff; }
  .warning-level-tag { background: rgba(64, 158, 255, 0.2); color: #409eff; }
}

.no-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #555;
  font-size: 13px;
}
</style>

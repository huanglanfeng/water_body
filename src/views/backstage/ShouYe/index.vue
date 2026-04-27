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

    <!-- 主内容区 -->
    <div class="content-row">
      <!-- 左侧 -->
      <div class="left-wrapper">
        <leftVue></leftVue>
      </div>
      <!-- 右侧 -->
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Location } from "@element-plus/icons-vue";
import leftVue from "@/components/backstage/ShouYe/left.vue";
import rightVue from "@/components/backstage/ShouYe/right.vue";
import requests from "@/utils/request";

// 统计卡片数据
const statsCards = ref([
  { label: '监测站点', value: '15', icon: '📍', color: '#409eff', bg: 'rgba(64,158,255,0.1)' },
  { label: '今日预警', value: '3', icon: '⚠️', color: '#ff4d4f', bg: 'rgba(255,77,79,0.1)' },
  { label: '设备在线率', value: '92%', icon: '📡', color: '#52c41a', bg: 'rgba(82,196,26,0.1)' },
  { label: '水质达标率', value: '86%', icon: '💧', color: '#13c2c2', bg: 'rgba(19,194,194,0.1)' },
]);

// 预警数据
const warningList = ref<any[]>([]);
const scrollWrapperRef = ref<HTMLElement | null>(null);
const scrollOffset = ref(0);
const isScrolling = ref(false);
let scrollTimer: ReturnType<typeof requestAnimationFrame> | null = null;
let isPaused = false;
const SCROLL_SPEED = 0.5;

const displayList = computed(() => {
  if (warningList.value.length === 0) return [];
  return warningList.value;
});

const getLevelClass = (level: string) => {
  if (!level) return 'level-default';
  const l = level.toLowerCase();
  if (l.includes('严重') || l.includes('紧急') || l.includes('critical')) return 'level-critical';
  if (l.includes('高') || l.includes('重') || l.includes('high')) return 'level-high';
  if (l.includes('中') || l.includes('medium')) return 'level-medium';
  return 'level-low';
};

const fetchWarnings = async () => {
  try {
    const res = await requests.get("/warning/list", { params: { page: 1, pageSize: 20 } });
    if (res && res.data) {
      warningList.value = Array.isArray(res.data) ? res.data : (res.data.list || res.data.records || []);
    }
  } catch (e) {
    console.warn('预警数据加载失败', e);
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

const startScroll = () => {
  if (warningList.value.length <= 3) return;
  isScrolling.value = true;
  scrollOffset.value = 0;
  animateScroll();
};

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
  const itemHeight = 72;
  const totalHeight = warningList.value.length * itemHeight;
  scrollOffset.value += SCROLL_SPEED;
  if (scrollOffset.value >= totalHeight) {
    scrollOffset.value = 0;
  }
  scrollTimer = requestAnimationFrame(animateScroll);
};

const pauseScroll = () => { isPaused = true; };
const resumeScroll = () => { isPaused = false; };

let refreshTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  fetchWarnings();
  refreshTimer = setInterval(fetchWarnings, 30000);
});

onBeforeUnmount(() => {
  if (scrollTimer) cancelAnimationFrame(scrollTimer);
  if (refreshTimer) clearInterval(refreshTimer);
});
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;
  overflow: auto;
}

/* 顶部统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex-shrink: 0;
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

/* 主内容区 */
.content-row {
  flex: 1;
  display: flex;
  gap: 16px;
  min-height: 0;
}
.left-wrapper {
  flex: 3;
  min-width: 0;
}
.right-wrapper {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

/* 预警播报区域 */
.warning-broadcast {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 79, 0.3);
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(255, 77, 79, 0.1);
  flex-shrink: 0;
}
.broadcast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: rgba(255, 77, 79, 0.08);
  border-bottom: 1px solid rgba(255, 77, 79, 0.15);
}
.broadcast-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
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
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7); }
  50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(255, 77, 79, 0); }
}
.broadcast-badge { font-size: 11px; }
.broadcast-content {
  height: 200px;
  overflow: hidden;
  position: relative;
}
.scroll-wrapper { height: 100%; overflow: hidden; }
.scroll-inner { transition: none; }
.scroll-animate { will-change: transform; }

/* 预警项 */
.warning-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 14px;
  height: 66px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s;
  &:hover { background-color: rgba(255, 255, 255, 0.05); }
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
.warning-item-content { flex: 1; min-width: 0; }
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
.warning-location { display: flex; align-items: center; gap: 2px; }
.warning-time { color: #555; }

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

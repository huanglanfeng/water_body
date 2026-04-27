<template>
  <div class="info-content">
    <div class="info-grid">
      <div class="info-item" v-for="item in infoList" :key="item.label">
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, watch } from "vue";
import { warning } from "@/api/index";

const infoList = ref([
    { label: "水域名称", value: "瑶湖" },
    { label: "水域面积", value: "15.5 km²" },
    { label: "监测站点", value: "15 个" },
    { label: "水质等级", value: "Ⅲ类" },
    { label: "最近更新", value: "加载中..." },
]);

const loadLatestTime = async () => {
    try {
        const res = await warning({});
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            // 按时间排序取最新
            const sorted = res.data
                .filter((item: any) => item.time)
                .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
            if (sorted.length > 0) {
                infoList.value[4].value = sorted[0].time;
            }
        }
    } catch (e) {
        infoList.value[4].value = "--";
    }
};

// 监听刷新
const refreshKey = inject<ReturnType<typeof ref<number>>>('refreshKey');
if (refreshKey) {
    watch(refreshKey, () => { loadLatestTime(); });
}

onMounted(() => {
    loadLatestTime();
});
</script>

<style lang="less" scoped>
.info-content {
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  height: 100%;
  align-content: center;
}
.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border: 1px solid rgba(0, 180, 255, 0.08);
  border-radius: 4px;
  background: rgba(0, 30, 60, 0.3);
}
.info-item:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}
.info-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}
.info-value {
  font-size: 13px;
  color: #00e5ff;
  font-weight: 600;
  text-align: right;
}
</style>

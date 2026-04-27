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
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
let timer: ReturnType<typeof setInterval> | null = null;

const formatTime = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    currentTime.value = `${y}-${m}-${d} ${h}:${min}:${s}`;
};

const infoList = ref([
    { label: "水域名称", value: "瑶湖" },
    { label: "水域面积", value: "15.5 km²" },
    { label: "监测站点", value: "6 个" },
    { label: "水质等级", value: "Ⅲ类" },
    { label: "最近更新", value: "" },
]);

onMounted(() => {
    formatTime();
    infoList.value[4].value = currentTime.value;
    timer = setInterval(() => {
        formatTime();
        infoList.value[4].value = currentTime.value;
    }, 1000);
});

onUnmounted(() => {
    if (timer) { clearInterval(timer); }
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
  gap: 10px;
  height: 100%;
  align-content: center;
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.info-item:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}
.info-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}
.info-value {
  font-size: 14px;
  color: #00e5ff;
  font-weight: 600;
}
</style>

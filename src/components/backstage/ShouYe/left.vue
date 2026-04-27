<template>
  <div class="left">
    <div class="top">
      <carouselVue></carouselVue>
    </div>
    <div class="mid">
      <midVue></midVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import midVue from "@/components/backstage/ShouYe/src/left/mid.vue";
import carouselVue from "./src/left/top/carousel.vue";
import { onMounted, onUnmounted, ref, provide } from 'vue';

const refreshKey = ref(0);
const REFRESH_INTERVAL = 60000;
let refreshTimer: number | null = null;

const triggerRefresh = () => { refreshKey.value++; };
const startAutoRefresh = () => { refreshTimer = window.setInterval(triggerRefresh, REFRESH_INTERVAL); };
const stopAutoRefresh = () => { if (refreshTimer) { clearInterval(refreshTimer); refreshTimer = null; } };
provide('refreshKey', refreshKey);

onMounted(() => { startAutoRefresh(); });
onUnmounted(() => { stopAutoRefresh(); });
</script>

<style lang="less" scoped>
.left {
  width: 100%;
  min-width: 0;
  overflow: auto;
  .mid {
    margin: 10px;
  }
}
</style>

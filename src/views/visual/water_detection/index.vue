<template>
  <div class="water-detection">
    <div class="chart-card">
      <div class="card-title">水体温度</div>
      <waterTPVue></waterTPVue>
    </div>
    <div class="chart-card">
      <div class="card-title">水体pH值</div>
      <waterPHVue></waterPHVue>
    </div>
    <div class="chart-card">
      <div class="card-title">元素检测</div>
      <elementVue></elementVue>
    </div>
    <div class="chart-card">
      <div class="card-title">水体浊度</div>
      <waterTUVue></waterTUVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import waterPHVue from "@/components/visual/waterEcology/charts/waterPH.vue";
import waterTPVue from "@/components/visual/waterEcology/charts/waterTP.vue";
import elementVue from "@/components/visual/waterEcology/charts/element.vue";
import waterTUVue from "@/components/visual/waterEcology/charts/waterTU.vue";
</script>

<style lang="less" scoped>
.water-detection {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.chart-card {
  border: 1px solid rgba(0, 180, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 20, 50, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.card-title {
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #00e5ff;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  background: linear-gradient(90deg, rgba(0, 180, 255, 0.1), transparent);
  letter-spacing: 1px;
  flex-shrink: 0;
}
</style>

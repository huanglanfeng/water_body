<template>
  <div class="content">
    <div class="charts">
      <chartsTitleVue title="元素检测"></chartsTitleVue>
      <elementVue></elementVue>
    </div>
    <div class="chart">
        <chartsTitleVue title="声音监测数据"></chartsTitleVue>
        <soundVue></soundVue>
      </div>
  </div>
</template>

<script lang="ts" setup>
import elementVue from "../charts/element.vue";
import chartsTitleVue from "../charts/chartsTitle.vue";
import waterTUVue from "../charts/waterTU.vue";
import waterO2Vue from "../charts/waterO2.vue";
import soundVue from "@/components/visual/supervisor/charts/sound.vue";
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  .charts{
  margin-bottom:10px;
  background: url("@/assets/image/visual-border3.png");
  background-size: 100% 100%;
  }
}
</style>

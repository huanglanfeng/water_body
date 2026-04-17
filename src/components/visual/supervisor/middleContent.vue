<template>
  <div class="content">
    <div class="chart">
      <chartsTitleVue title="气体监测数据"></chartsTitleVue>
      <gasVue></gasVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import chartsTitleVue from "../waterEcology/charts/chartsTitle.vue";
import gasVue from "./charts/gas.vue";
import focewarnVue from "./charts/focewarn.vue";
import soundVue from "./charts/sound.vue";
</script>

<style lang="less" scoped>
.content {
  flex-direction: column;
  .chart{
    height: 180px;
    width: 400px;
    margin-bottom:10px;
    background: url("@/assets/image/visual-border3.png");
    background-size: 100% 100%;
  }
}
</style>

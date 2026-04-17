<template>
  <div class="rightContent">
    <div class="chart">
      <chartsTitleVue title="预警"></chartsTitleVue>
      <!-- <feedBack></feedBack> -->
    </div>
    <div class="chart">
      <chartsTitleVue title="设备"></chartsTitleVue>
      <!-- <equitmentVue></equitmentVue> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import equitmentVue from "./charts/equitment.vue";
import chartsTitleVue from "../waterEcology/charts/chartsTitle.vue";
import feedBack from "@/components/visual/supervisor/leftContent/feedBack.vue"
</script>

<style lang="less" scoped>
.rightContent {
  flex-direction: column;
  .chart{
    margin-bottom:10px;
    background: url("@/assets/image/visual-border3.png");
    background-size: 100% 100%;
  }
  .decoration{
    display: flex;
    flex-direction: row;
    padding: 0 40px ;
  }
}
</style>

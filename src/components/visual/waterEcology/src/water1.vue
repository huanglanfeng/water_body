<template>
  <div class="content">
    <div class="charts">
      <chartsTitleVue title="水体温度"></chartsTitleVue>
      <waterTPVue></waterTPVue>
    </div>
    <div class="charts">
      <chartsTitleVue title="水体pH值"></chartsTitleVue>
      <waterPHVue></waterPHVue>
    </div>
    <div class="charts">
        <chartsTitleVue title="元素检测"></chartsTitleVue>
        <elementVue></elementVue>
      </div>
    <div class="charts">
          <chartsTitleVue title="水体浊度"></chartsTitleVue>
          <waterTUVue></waterTUVue>
        </div>
  </div>
  
</template>

<script lang="ts" setup>
import chartsTitleVue from "../charts/chartsTitle.vue";
import waterPHVue from "../charts/waterPH.vue";
import waterTPVue from "../charts/waterTP.vue";
import elementVue from "../charts/element.vue";
import waterTUVue from "@/components/visual/waterEcology/charts/waterTU.vue";
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .charts{
    width: 550px;
    height: 280px;
    margin: 5px 10px;
  }
}
</style>

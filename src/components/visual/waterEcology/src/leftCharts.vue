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
        <chartsTitleVue title="气体监测数据"></chartsTitleVue>
        <gasVue></gasVue>
      </div>
    <div class="charts">
        <chartsTitleVue title="元素检测"></chartsTitleVue>
        <elementVue></elementVue>
      </div>
    <div class="charts">
          <chartsTitleVue title="声音监测数据"></chartsTitleVue>
          <soundVue></soundVue>
        </div>
    <div class="charts">
          <chartsTitleVue title="声音监测数据"></chartsTitleVue>
          <waterTUVue></waterTUVue>
        </div>
  </div>
  
</template>

<script lang="ts" setup>
import chartsTitleVue from "../charts/chartsTitle.vue";
import waterPHVue from "../charts/waterPH.vue";
import waterTPVue from "../charts/waterTP.vue";
import gasVue from "../../supervisor/charts/gas.vue";
import elementVue from "../charts/element.vue";
import soundVue from "../../supervisor/charts/sound.vue";
import waterTUVue from "@/components/visual/waterEcology/charts/waterTU.vue";
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 700px;
  /*background: url("@/assets/image/visual-border3.png");
  background-size: 100% 100%;*/
}
.charts{
  width: 350px;
  height: 200px;
  margin:20px 0 25px 0;
}
</style>

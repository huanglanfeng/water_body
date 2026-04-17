<template>
  <div class="warning">
    <div class="bar_worning">
      <el-row :gutter="12">
        <el-col :span="23">
          <el-card shadow="hover"> 
          <developTendVue></developTendVue>
          </el-card>
        </el-col>
        <el-col :span="23">
          <el-card shadow="hover">
            <HistoryVue></HistoryVue>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="wornings">
      <el-divider content-position="left" border-style="dashed">水生态数据统计</el-divider>
      <tab_Vue></tab_Vue>
      <el-divider content-position="left" border-style="dashed">预警详情</el-divider>
      <tabVue></tabVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tabVue from "@/components/backstage/EarlyWarning/tab.vue";
import developTendVue from "./src/developTend.vue";
import HistoryVue from "./src/history.vue";
import tab_Vue from "@/components/backstage/Shui_ShengTai/tab.vue";
</script>

<style lang="less" scoped>
.warning {
  display: flex;
  flex-direction: row;
  .bar_worning{
    width: 35vw;
    height: 100vh;
  }
  .wornings{
    width: 65vw;
    height: 100vh;
  }
}
</style>

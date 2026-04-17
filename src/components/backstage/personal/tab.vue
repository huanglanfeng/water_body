<template>
  <el-tabs tab-position="left" class="demo-tabs">
    <el-tab-pane label="个人信息">
      <infoVue></infoVue>
    </el-tab-pane>
    <el-tab-pane label="账号安全">
      <safetyVue></safetyVue>
    </el-tab-pane>
    <el-tab-pane label="消息">
      <informationVue></informationVue>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import infoVue from "./src/info.vue";
import safetyVue from "./src/safety.vue";
import informationVue from "./src/information.vue";
</script>


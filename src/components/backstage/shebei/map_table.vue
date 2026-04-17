<template>
  <div class="content">
    <div class="right">
      <rightTableVue></rightTableVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import rightTableVue from "./src/rightTable.vue";
</script>

<style lang="less" scoped>
.content {
  // display: flex;
}
</style>

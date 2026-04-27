<template>
  <div class="right">
    <upVue></upVue>
    <downVue></downVue>
  </div>
</template>

<script lang="ts" setup>
import upVue from "./src/right/up.vue";
import downVue from "./src/right/down.vue";
</script>

<style lang="less" scoped>
.right {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

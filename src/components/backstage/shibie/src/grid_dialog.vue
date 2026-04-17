<template>
  <div class="grid_dialog">
    <div class="left">
      <dialog_leftVue></dialog_leftVue>
    </div>

    <div class="right">
      <dialog_rightVue></dialog_rightVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dialog_leftVue from "./dialog_left.vue";
import dialog_rightVue from "./dialog_right.vue";
</script>

<style lang="less" scoped>
.grid_dialog {
  display: flex;

  .left {
    margin-right: 10px;
  }
}
</style>

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
  width: 25vw;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;

  .right-card {
    border-radius: 1%;
    height: 100vh;
  }
}
</style>

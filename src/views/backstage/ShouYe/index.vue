<template>
  <div class="dashboard">
    <leftVue></leftVue>
    <rightVue></rightVue>
  </div>
</template>

<script lang="ts" setup>
import leftVue from "@/components/backstage/ShouYe/left.vue";
import rightVue from "@/components/backstage/ShouYe/right.vue";
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  justify-content: flex-start;
  width: 100vw;;
  height: 100vh;
}
</style>

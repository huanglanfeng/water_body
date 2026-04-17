<template>
  <!-- <div class="middle">
      <amapVue></amapVue>
    </div>
    <div class="select">
      <span>当前地区：江西省</span>
    </div> -->
    <div class="middle">
      <videoVue></videoVue>
    </div>
</template>

<script lang="ts" setup>
import selectVue from "../amap/select.vue";
import amapVue from "../amap/amap.vue";
import rankVue from "../charts/rank.vue";
import videoVue from './video.vue'
</script>

<style lang="less" scoped>
.middle {
  width: 52vw;
  height: 100%;
  
}
</style>

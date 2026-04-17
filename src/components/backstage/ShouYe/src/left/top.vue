<template>
  <div id="content">
    <div>
      <water01Vue></water01Vue>
    </div>
    <div>
      <water02Vue></water02Vue>
    </div>
    <div>
      <water03Vue></water03Vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import water01Vue from "./top/water01.vue"
import water02Vue from "./top/water02.vue"
import water03Vue from "./top/water03.vue"
</script>

<style lang="less" scoped>
 #content {
  width: auto;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);
   height: 180px;
   margin: 10px;
 }
 </style>
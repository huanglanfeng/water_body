<template>
  <dv-full-screen-container class="container">
    <indexHeaderVue class="header"></indexHeaderVue>
    <indexMainVue class="main"></indexMainVue>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
import indexHeaderVue from "@/components/visual/index_header/index.vue";
import indexMainVue from "@/components/visual/index_main/index.vue";
</script>


<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
 /* background: url("@/assets/image/background/R-c.jpg");
  background-size: 100% 100%;*/
  margin: 0;
}
</style>

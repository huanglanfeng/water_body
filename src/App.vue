<script setup lang="ts">
import { RouterView } from "vue-router";

import { assRouter } from "@/utils/assembleRouter";
import { useMenuStore } from "@/stores/backstage/menu.js";

const store = useMenuStore();

assRouter(store.asyncMenu);
</script>

<template>
  <RouterView />
</template>

<style lang="less">
  html,body,p{
    margin: 0;
    padding: 0;
  }
  @font-face {
  font-family: "UnidreamLED";
  src: url(@/assets/font/UnidreamLED.woff);
}
</style>

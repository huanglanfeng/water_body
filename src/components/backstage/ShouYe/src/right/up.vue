<template>
  <div class="up-section">
    <up_headerVue></up_headerVue>
    <div style="margin-top: 10px;">
      <up_cardVue></up_cardVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import up_headerVue from "./up_header.vue";
import up_cardVue from "./up_card.vue";
</script>

<style lang="less" scoped>
.up-section {
  flex-shrink: 0;
}
</style>

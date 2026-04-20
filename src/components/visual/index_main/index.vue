<template>
  <div class="bg-animation"></div>
  <div class="content">
    <KeepAlive>
      <RouterView></RouterView>
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.bg-animation {
  width: 100%;
  height: 110%;
  position: absolute;
  top: -10vh;
  z-index: -1;
  background: linear-gradient(180deg, #0a0e27 0%, #0d1b3e 30%, #0f2847 60%, #0a1628 100%);
}
.content {
  width: 100vw;
  height: 90vh;
  background: transparent;
}
</style>

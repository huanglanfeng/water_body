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
  background: linear-gradient(135deg, #0c1445 0%, #1a237e 25%, #0d47a1 50%, #01579b 75%, #0c1445 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.content {
  width: 100vw;
  height: 90vh;
  background: transparent;
}
</style>

<template>
  <div class="chartsTitle">
    <span>
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface prop {
  title?: string;
}
const props = withDefaults(defineProps<prop>(), {
  title: "test",
});
</script>

<style lang="less" scoped>
.chartsTitle {
  width: 150px;
  height: 40px;
  position: relative;
  left: 5px;
  top: 5px;
  background:url('@/assets/image/head.png');
  background-size: 100% 100%;
  span {
    font-size: 17px;
    color: white;
    position: relative;
    top: 8px;
    left: 40px;
  }
}
</style>

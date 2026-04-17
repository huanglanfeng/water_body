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
  display: flex;
  margin-left: 10px;
  position: relative;
  width: 150px;
  height: 40px;
  top: 6px;
  left: -19px;
  background:url('@/assets/image/head.png');
  background-size: 100% 100%;
  span {
    font-size: 18px;
    color: white;
    position: relative;
    top: 8px;
    left: 40px;
  }
}
</style>

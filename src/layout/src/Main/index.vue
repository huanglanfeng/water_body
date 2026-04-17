<template>
  <KeepAlive class="main" :include="cachedViews">
    <RouterView></RouterView>
  </KeepAlive>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const cachedViews = ref<string[]>(['ShouYe', 'UserAdmin', 'EarlyWarning'])
</script>

<style lang="less" scoped>
</style>
<template>
  <div class="content">
    <div class="item">
      <label for="">下载/Mbps</label>
      <span style="color: aqua">{{ downloadValue }}</span>
    </div>

    <div class="item">
      <label for="">上传/Mbps</label>
      <span style="color: aquamarine">{{ uploadValue }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const downloadValue = ref();
const uploadValue = ref();

setInterval(() => {
  downloadValue.value = (Math.random() * 20 + 110).toFixed(2);
  uploadValue.value = (Math.random() * 10 + 35).toFixed(2);
}, 1000);
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
}

.item {
  display: flex;
  flex-direction: column;
  margin: auto 10px;

  label {
    font-size: 14px;
    color: white;
  }

  span {
    font-size: 20px;
    margin-top: 10px;
  }
}
</style>

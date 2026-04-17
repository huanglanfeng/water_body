<template>
  <div class="content">
    <div
      style="
        height: 25px;
        line-height: 35px;
        font-size: 16px;
        color: white;
        margin-right: 20px;
      "
    >
      时延/ms
    </div>
    <div class="item">
      <img :src="delay" alt="" />
      <span>25</span>
    </div>

    <div class="item">
      <img :src="upload" alt="" />
      <span>319</span>
    </div>

    <div class="item">
      <img :src="download" alt="" />
      <span>542</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import delay from "@/assets/image/video/delay.png";
import upload from "@/assets/image/video/upload.png";
import download from "@/assets/image/video/download.png";
</script>

<style lang="less" scoped>
.content {
  display: flex;
}

img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin: 5px;
}

span {
  font-size: 20px;
  margin: auto 5px;
  color: rgb(197, 191, 183);
}
</style>

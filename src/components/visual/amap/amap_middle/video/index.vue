<template>
  <div class="content">
    <div class="asider">
      <li>1号摄像区</li>
      <li>1号摄像区</li>
    </div>

    <div class="main">
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video1" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video2" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video3" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video5" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video6" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
      <VideoPlayer width="320px" height="200px" color="transparent" :src="video8" :control="false" :autoPlay="true" :loop="true" :poster="video1" @play="" @pause="" @timeupdate="" @canplay="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import video1 from "@/assets/video/WeChat_20230418210232.mp4";
import video2 from "@/assets/video/WeChat_20230418210259.mp4";
import video3 from "@/assets/video/WeChat_20230418210311.mp4";
import video5 from "@/assets/video/sequence01.mp4";
import video6 from "@/assets/video/WeChat_20230428201855.mp4";
import video8 from "@/assets/video/sequence01_3.mp4";
</script>

<style lang="less" scoped>
.content {
  display: flex;

  color: white;

  .asider {
    height: 400px;
    width: 100px;
    // background-color: aqua;
    display: flex;
    flex-direction: column;
    color: aqua;
    list-style: none;

    li {
      margin: 5px auto;
    }
  }

  .main {
    width: 1200px;
    overflow: hidden;
    display: flex;
    margin-left: 10px;
    flex-wrap: wrap;
  }
}
</style>

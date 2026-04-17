<template>
  <div class="grid">
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="white"
      :src="video1"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="transparent"
      :src="video2"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="transparent"
      :src="video3"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="transparent"
      :src="video4"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="transparent"
      :src="video5"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
    <VideoPlayer
      width="100%"
      height="300px"
      title=""
      color="transparent"
      :src="video6"
      :control="false"
      :autoPlay="true"
      :loop="true"
      :poster="video1"
      @play=""
      @pause="fun"
      @timeupdate=""
      @canplay=""
    />
  </div>

  <el-dialog v-model="dialogTableVisible" @closed="">
    <grid_dialogVue></grid_dialogVue>
  </el-dialog>
</template>

<script lang="ts" setup>
import video1 from "@/assets/video/WeChat_20230418210232.mp4";
import video2 from "@/assets/video/sequence01_3.mp4";
import video3 from "@/assets/video/WeChat_20230418210311.mp4";
import video4 from "@/assets/video/WeChat_20230418210337.mp4";
import video5 from "@/assets/video/WeChat_20230428201855.mp4";
import video6 from "@/assets/video/sequence01.mp4";

import { provide, ref } from "vue";
import grid_dialogVue from "./src/grid_dialog.vue";
import { videoUrl } from "./src/key";


const dialogTableVisible = ref(false);

const Url = ref("");
provide(videoUrl, Url); // 依赖注入

const fun = (e: { target: { src: any } }) => {
  dialogTableVisible.value = true;
  Url.value = e.target.src;
};

const closed = () => {};
</script>

<style lang="less" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 10px; //行间距
  column-gap: 10px; //列间距
  justify-items: center;
  align-items: center;
}
</style>

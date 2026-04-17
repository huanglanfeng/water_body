<template>
      <div class="video">
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="true" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
        <div class="v">
          <VideoPlayer width="100%" height="100%" title="" color="white" :src="video1" :control="false" :autoPlay="true"
            :loop="true" :poster="video4" @play="" @pause="fun" @timeupdate="" @canplay="" />
        </div>
     </div>
</template>

<script lang="ts" setup>
import video1 from "@/assets/video/WeChat_20230418210232.mp4";
import video2 from "@/assets/video/sequence01_3.mp4";
import video3 from "@/assets/video/WeChat_20230418210311.mp4";
import video4 from "@/assets/video/WeChat_20230418210337.mp4";
import { provide, ref } from "vue";
import { videoUrl } from "@/components/backstage/shibie/src/key";



const dialogTableVisible = ref(false);

const Url = ref("");
provide(videoUrl, Url); // 依赖注入

const fun = (e: { target: { src: any } }) => {
    dialogTableVisible.value = true;
    Url.value = e.target.src;
};

</script>
<style lang="less" scoped>
.video{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .v{
    width: 24.5vw;
    height: 26vh;
    margin: 10px 3px 0px 4px;
  }
}
</style>
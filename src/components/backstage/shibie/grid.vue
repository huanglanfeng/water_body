<template>
  <div class="grid">
    <div class="video-item" v-for="(camera, index) in cameraList" :key="index">
      <div class="video-wrapper">
        <VideoPlayer
          width="100%"
          height="300px"
          :title="camera.name"
          color="white"
          :src="camera.src"
          :control="false"
          :autoPlay="true"
          :loop="true"
          :poster="camera.poster"
          @play=""
          @pause="fun"
          @timeupdate=""
          @canplay=""
        />
        <div class="camera-label">
          <span class="camera-name">{{ camera.name }}</span>
          <span class="camera-status" :class="camera.status === '在线' ? 'online' : 'offline'">{{ camera.status }}</span>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" title="监控录像详情" width="900px" @closed="closed">
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
import { videoUrl, cameraInfoKey, type CameraInfo } from "./src/key";

const dialogTableVisible = ref(false);

const Url = ref("");
provide(videoUrl, Url);

const currentCameraInfo = ref<CameraInfo>({
  name: "",
  location: "",
  status: "",
  ip: "",
  resolution: "",
});
provide(cameraInfoKey, currentCameraInfo);

const cameraList = ref([
  {
    name: "摄像头1 - 瑶湖东岸",
    src: video1,
    poster: video1,
    status: "在线",
    location: "瑶湖东岸监测点",
    ip: "192.168.1.101",
    resolution: "1920x1080",
  },
  {
    name: "摄像头2 - 瑶湖西岸",
    src: video2,
    poster: video1,
    status: "在线",
    location: "瑶湖西岸监测点",
    ip: "192.168.1.102",
    resolution: "1920x1080",
  },
  {
    name: "摄像头3 - 瑶湖南岸",
    src: video3,
    poster: video1,
    status: "在线",
    location: "瑶湖南岸监测点",
    ip: "192.168.1.103",
    resolution: "1280x720",
  },
  {
    name: "摄像头4 - 瑶湖北岸",
    src: video4,
    poster: video1,
    status: "离线",
    location: "瑶湖北岸监测点",
    ip: "192.168.1.104",
    resolution: "1920x1080",
  },
  {
    name: "摄像头5 - 入水口",
    src: video5,
    poster: video1,
    status: "在线",
    location: "瑶湖入水口监测点",
    ip: "192.168.1.105",
    resolution: "1280x720",
  },
  {
    name: "摄像头6 - 出水口",
    src: video6,
    poster: video1,
    status: "在线",
    location: "瑶湖出水口监测点",
    ip: "192.168.1.106",
    resolution: "1920x1080",
  },
]);

const fun = (e: { target: { src: any } }) => {
  dialogTableVisible.value = true;
  Url.value = e.target.src;
  // 根据视频源匹配摄像头信息
  const matched = cameraList.value.find((cam) => cam.src === e.target.src);
  if (matched) {
    currentCameraInfo.value = {
      name: matched.name,
      location: matched.location,
      status: matched.status,
      ip: matched.ip,
      resolution: matched.resolution,
    };
  }
};

const closed = () => {};
</script>

<style lang="less" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  justify-items: center;
  align-items: center;
}

.video-item {
  width: 100%;
  position: relative;
}

.video-wrapper {
  position: relative;
  width: 100%;
}

.camera-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 13px;
}

.camera-name {
  font-weight: bold;
}

.camera-status {
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 3px;
}

.camera-status.online {
  background-color: #67c23a;
  color: #fff;
}

.camera-status.offline {
  background-color: #f56c6c;
  color: #fff;
}
</style>

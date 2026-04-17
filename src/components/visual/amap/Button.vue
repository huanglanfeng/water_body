<template>
  <div class="button">
    <div class="left">
      <span @click="water_detection">水质检测</span>
      <span @click="video">视频监控</span>
    </div>
    <div class="right">
      <span @click="worning_detection">预警详情</span>
      <span @click="water_identify">水质识别</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router"

const video=()=>{
    router.push('/index/video')
}
const water_detection=()=>{
    router.push('/index/water_detection')
}
const worning_detection=()=>{
  router.push('/index/worning_detection')
}
const water_identify=()=>{
  router.push('/index/water_detection')
}
</script>

<style lang="less" scoped>
.button{
    width: 100vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .left,.right{
      width: 25vw;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    span{
      width: 150px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 800;
      color: rgb(225, 224, 199);
      background: url('@/assets/image/imgbg.png');
      background-size: 100% 100%;
    }
}
</style>
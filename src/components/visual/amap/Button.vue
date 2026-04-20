<template>
  <div class="button">
    <div class="left">
      <span :class="{ active: currentPath === '/index/water_detection' }" @click="water_detection">水质检测</span>
      <span :class="{ active: currentPath === '/index/video' }" @click="video">视频监控</span>
    </div>
    <div class="right">
      <span :class="{ active: currentPath === '/index/worning_detection' }" @click="worning_detection">预警详情</span>
      <span :class="{ active: currentPath === '/index/water_detection' }" @click="water_identify">水质识别</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const currentPath = computed(() => route.path)

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
      cursor: pointer;
      &.active{
        color: #00ffff;
        text-shadow: 0 0 10px rgba(0,255,255,0.8);
        border-bottom: 2px solid #00ffff;
      }
    }
}
</style>
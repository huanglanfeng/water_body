<template>
  <button class="BackIndex" @click="back">
    <el-icon style="color:aqua" size="26px"><CaretLeft /></el-icon>
    <span>返回</span>
  </button>
  <div class="img">
    <div class="Div">
      <dv-decoration6 style="width:300px;height:30px" />
      <dv-decoration7 style="width:200px;height:40px">
    <span>图像检测</span>
  </dv-decoration7>
    </div>
        <imgAndv></imgAndv>
    </div>
    <el-divider border-style="dashed" />
  <div class="video">
    <div class="Div">
    <dv-decoration6 style="width:300px;height:30px" />
    <dv-decoration7 style="width:200px;height:40px">
    <span>视频监控</span>
  </dv-decoration7>
  </div>
    <videoVue></videoVue>
  </div>
</template>

<script lang="ts" setup>
import videoVue from "@/components/visual/waterEcology/src/video.vue";
import imgAndv from "@/components/visual/supervisor/imgAndv.vue";
import router from "@/router";

const back=()=>{
  router.push('/index')
}
</script>

<style lang="less" scoped>
.BackIndex{
  width: 20vw;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0vh;
  border: none;
  z-index: 999;
  background: transparent;
  span{
    color: rgb(44, 255, 255);
    font: italic bold 24px/30px arial, sans-serif;
  }
}
.Div{
  display: flex;
  flex-direction: row;
  align-items: center;
  span{
    color: antiquewhite;
    font-size: 20px;
  }
}
</style>

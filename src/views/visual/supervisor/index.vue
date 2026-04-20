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
    <div class="img-placeholder">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="rgba(0,229,255,0.3)" stroke-width="1">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <p>图像检测功能开发中</p>
    </div>
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
import videoVue from "@/components/visual/amap/amap_middle/video/index.vue";
import router from "@/router";

const back = () => {
  router.push('/index')
}
</script>

<style lang="less" scoped>
.BackIndex {
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
  span {
    color: rgb(44, 255, 255);
    font: italic bold 24px/30px arial, sans-serif;
  }
}
.Div {
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    color: antiquewhite;
    font-size: 20px;
  }
}
.img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  p {
    margin-top: 12px;
  }
}
</style>

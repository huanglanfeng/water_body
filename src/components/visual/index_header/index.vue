<template>
  <div class="content">
    <div class="time">
      <!-- <tabButtonVue label="水体数据" path="waterecology"></tabButtonVue> -->
      <!-- <timeVue></timeVue> -->

    </div>
    <div class="title">
        <headerTitleVue></headerTitleVue>
    </div>
    <div class="back">
      <tabButtonVue label="后台管理" path="/"></tabButtonVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tabButtonVue from "./tabButton.vue";
import headerTitleVue from "./headerTitle.vue";
import router from "@/router";
import { ElLoading } from "element-plus";
import timeVue from "@/views/visual/supervisor/time.vue";
// const clickFunction = () => {
//   router.push("/");
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.5)',
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 1500)
// };
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url("@/assets/image/title.png");
  background-size: 100% 100%;
  position: relative;
  z-index: 1;

  .time{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
  }
  .title {
    width: 60vw;

  }
  .back{
    width: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

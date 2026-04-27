<template>
  <div class="top">
    <div class="top_up">
      <div class="top_left">
        <div  @click="router.push('/index')" class="view">
          <img src="@/assets/image/view.png" style="width:40px;height:30px;padding-left:15px">
          <span>城市水体监管平台</span>
        </div>
      </div>
      <div class="top_right">
        <el-badge :value="messageCount" :max="10" class="item">
      <el-button size="big" icon="ChatDotRound" circle @click="handleChat" />
    </el-badge>
        <el-button size="big" icon="Refresh" circle @click="handleRefresh" />
        <el-button size="big" icon="FullScreen" circle @click="handleFullScreen"/>
          <el-dropdown>
            <img :src="jsonObjImage?.photo" alt="" class="dropdown">
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
      </div>
    </div>
    <div class="top_down">
      <div class="top_middle">
        <Asider></Asider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDashBoardStore } from "@/stores/backstage/ShouYe";
import { storeToRefs } from "pinia";
import { computed, nextTick, ref } from 'vue';
import router from "@/router";
import Asider from '../Asider/index.vue';

const isRefreshing = ref(false);

// 消息角标动态化
const messageCount = ref(5);

const handleChat=()=>{
  router.push('/personal')
}

const handleRefresh = () => {
  if (isRefreshing.value) {
    return;
  }
  isRefreshing.value = true;
  //  console.log('点击了');
  window.location.reload();
};

const handleFullScreen = () => {
  // console.log('全屏按钮被点击了');
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  }
};
// const asyncMenu =computed(()=>{
//   return mapStores.asyncMenu;
// })
const dashboardStore = useDashBoardStore();

const { isCollapse } = storeToRefs(dashboardStore);

const exit=()=> {
  router.push('/login');
}

const form = ref({
  id: 0,
  name: "",
  account: "",
  password: "",
  gender: "",
  mail: "",
  code: "",
  photo: "",
  role: ""
});
//读取本地的字符串数据
const getImage = localStorage.getItem('image');
let jsonObjImage = ref([form]);
//将字符串类转换为json格式
if (getImage !== null) {
  try {
    jsonObjImage.value = JSON.parse(getImage);
  } catch (e) {
    console.error('解析本地存储的图片数据失败', e);
  }
  //从jsonObj中提取我们想要的数据
}

</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 80px;
  background-color: rgb(29, 38, 48);
  display: flex;
  flex-direction: column;
  .top_up{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    flex-shrink: 0;
    .top_left {
      width: 82%;
      .view{
        height: 40px;
        width: 280px;
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
          color: white;
          font-size: 18px;
          font-weight: 600;
          padding-left: 20px;
        }
      }
    }
    .top_right {
    width: 18%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(29, 38, 48);
    position: relative;
    top: 0;
    .dropdown {
      padding: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  }
  .top_down{
    flex: 1;
    width: 100%;
    border-top: 1px solid rgba(104, 104, 104, 0.45);
    .top_middle{
      width: 60%;
      height: 100%;
      position: relative;
      left: 1%;
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoOne" alt="" style="width:200px;height:150px;padding:10px 10px" @click="drawerleft = true">
        <el-drawer v-model="drawerleft" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoOne" alt="" style="width: 600px;">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoTwo" alt="" style="width:200px;height:150px;padding:10px 10px;" @click="drawer = true">
        <el-drawer v-model="drawer" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoTwo" alt="" style="width: 600px;height:100%">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoThree" alt="" style="width:200px;height:150px;padding:10px 10px;" @click="drawerright = true">
        <el-drawer v-model="drawerright" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoThree" alt="" style="width: 600px;">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoOne" alt="" style="width:200px;height:150px;padding:10px 10px" @click="drawerleft = true">
        <el-drawer v-model="drawerleft" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoOne" alt="" style="width: 600px;">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoTwo" alt="" style="width:200px;height:150px;padding:10px 10px;" @click="drawer = true">
        <el-drawer v-model="drawer" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoTwo" alt="" style="width: 600px;height:100%">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
    <div class="img">
      <dv-borderBox2>
        <img :src="jsonObj?.photoThree" alt="" style="width:200px;height:150px;padding:10px 10px;" @click="drawerright = true">
        <el-drawer v-model="drawerright" title=" 详情：" size="60%" :direction="direction" :before-close="handleClose" style="background:rgba(75, 122, 166, 0.286)">
          <div class="out">
            <img :src="jsonObj?.photoThree" alt="" style="width: 600px;">
            <imgDataVue></imgDataVue>
          </div>
      </el-drawer>
      </dv-borderBox2>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import { videoUrl } from "./key";
import { ElMessageBox } from 'element-plus';
import imgDataVue from "./imgData.vue";

const formData = ref<any>({
  alertLevel: 0,
  alertNumber: 0,
  photoOne: "",
  photoTwo: "",
  photoThree: "",
  site: "",
  waterQualityParameters: 0,
  siteId: ""
});

//读取本地的字符串数据
const getLocalData = localStorage.getItem('address');
//显示类型 这个时候是字符串类型
console.log(typeof (getLocalData));
var jsonObj = ref([formData]);
//将字符串类转换为json格式
if (getLocalData !== null) {
  jsonObj = JSON.parse(getLocalData);
  //从jsonObj中提取我们想要的数据
  // console.log(jsonObj.value?.name, 11111111111);
}

const drawerleft = ref(false)
const drawer = ref(false)
const drawerright = ref(false)
const direction = ref('ttb')
const handleClose = (done: () => void) => {
  // ElMessageBox.confirm('确定要退出吗？',{
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  // })
    // .then(() => {
    //   done()
    // })
    // .catch(() => {
    //   // catch error
    // })
    done()
}

</script>

<style lang="less" scoped>
.contant {
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .img{
    width: 220px;
    height: 170px;
    .out{
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
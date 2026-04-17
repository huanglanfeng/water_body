<template>
  <div class="content">
    <el-avatar :size="60" :src="jsonObjImage?.photo" />
    <div class="info">
      <label>您好，{{jsonObj}}</label>
      <li>欢迎回来*^____^*</li>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import url from "@/assets/image/actorTest.png";
import { ref } from "vue";

const form = ref({
  id:0,
  name:"",
  account: "",
  password: "",
  gender: "",
  mail: "",
  code: "",
  photo:"",
  role:""
});

//读取本地的字符串数据
const getLocalData = localStorage.getItem('localData');
const getImage = localStorage.getItem('image');
var jsonObj=ref([form]);
var jsonObjImage=ref([form]);
//将字符串类转换为json格式
if (getLocalData !== null) {
   jsonObj = JSON.parse(getLocalData);
  //从jsonObj中提取我们想要的数据
}
if (getImage !== null) {
   jsonObjImage = JSON.parse(getImage);
  //从jsonObj中提取我们想要的数据
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  width: 100%;
  background-color: rgba(230, 238, 246, 0.01);
   box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
   border-radius: 30px;

  .info {
    margin-top:5px;
    margin-left: 30px;
    list-style: none;
    label {
      font-size: 23px;
      font-weight: 5px;
      color: rgba(66, 65, 65, 0.7);
    }
    li {
      margin-top: 10px;
      color: #666;
      span {
        color: aqua;
        font-size: 20px;
      }
    }
  }
}
</style>

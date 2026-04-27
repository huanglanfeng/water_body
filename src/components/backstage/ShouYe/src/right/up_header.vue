<template>
  <div class="content">
    <el-avatar :size="50" :src="jsonObjImage?.photo" />
    <div class="info">
      <label>您好，{{jsonObj}}</label>
      <li>欢迎回来</li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const form = ref({
  id:0, name:"", account: "", password: "",
  gender: "", mail: "", code: "", photo:"", role:""
});

const getLocalData = localStorage.getItem('localData');
const getImage = localStorage.getItem('image');
var jsonObj=ref([form]);
var jsonObjImage=ref([form]);
if (getLocalData !== null) { jsonObj = JSON.parse(getLocalData); }
if (getImage !== null) { jsonObjImage = JSON.parse(getImage); }
</script>

<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  background-color: #f8fafc;
  border-radius: 8px;

  .info {
    margin-left: 16px;
    list-style: none;
    label {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      display: block;
    }
    li {
      margin-top: 4px;
      color: #999;
      font-size: 13px;
    }
  }
}
</style>

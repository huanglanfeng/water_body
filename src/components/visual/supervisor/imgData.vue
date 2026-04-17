<template>
    <div class="warning-details">
        <span class="title">预警信息详情</span>
        <div class="warning-info">
            <p>地点
                <span style="color: #fff;font-size: 18px;margin-left: 250px;">{{jsonObj?.site}}</span>
            </p>
            <p>时间
                <span style="color: #fff;font-size: 18px;margin-left: 250px;">{{jsonObj?.time}}</span>
            </p>
            <p>污染源
                <span style="color: #fff;font-size: 18px;margin-left: 225px;">{{jsonObj?.pollutant}}</span>
            </p>
            <p style="display: flex;align-items:center">
                详细内容
                <textarea name="" id="" cols="50" rows="8" disabled style="margin-left:210px;background:rgba(0, 179, 255, 0.066);border:2px solid lightblue;color:#fff;font-size:16px">{{jsonObj?.content}}</textarea>
            </p>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
const formData = ref<any>({
    // alertLevel: 0,
    // alertNumber: 0,
    // photoOne: "",
    // photoTwo: "",
    // photoThree: "",
    site: "",
    // waterQualityParameters: 0,
    // siteId: ""
    time:"",
    pollutant:"",
    content:""
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
</script>
  
<style lang="less" scoped>
.warning-details {
    width:80vw ;
    margin-left:10vw;
    .title {
        font-size: 40px;
        font-weight: 1000;
        color: #fff;
        display: flex;
        justify-content: center;
    }
    .warning-info {
        font-size: 25px;
        color: aqua;
        p{
            margin-top: 30px;
        }
    }
}

</style>
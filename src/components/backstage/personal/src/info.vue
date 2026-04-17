<template>
  <div class="info">
    <div class="header">
    <el-upload
      class="avatar-uploader"
      action="http://localhost:5173/api/user/update/photo"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      >
      <img :src="information?.photo" style="width:100px;height:100px;border-radius:50%"/>
    </el-upload>

      <div class="head-info">
        <label>{{ information?.name }}
          <component is="EditPen" style="width:20px" @click="open">
            </component></label>

        <li>使用：<span>212</span> 天</li>
      </div>
    </div>
    <el-divider />
    <div class="data">
      <div class="left">
        <ul>
          <h1>详细资料</h1>
          <li>姓名：{{information?.name}}</li>
          <li>性别：{{ information?.gender }}</li>
          <li>职位：{{ information?.role }}</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <h1>联系信息</h1>
          <li>邮箱：{{information?.mail}}</li>
          <li>手机：{{information?.account}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import type { UploadProps } from 'element-plus'
import {changeUserName, imgGet, personGet} from '@/api/index'
import type {form} from "./type"

const information = ref<Array<form>>([]);
const getData = async () => {
  let res = await personGet({});
  information.value = res.data;
  //将后端返回来的json格式的数据转换为String格式
  var str_jsonData = JSON.stringify(res.data)
  //通过localStorage保存到本地中,命名为localData
  localStorage.setItem('image', str_jsonData);
}

const handleAvatarSuccess=()=>{
  getData()
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const open = () => {
  ElMessageBox.prompt("请输入新的用户名",  {
    confirmButtonText: "保存",
    cancelButtonText: "取消",
    inputErrorMessage: "新用户名不能为空",
  })
    .then(async ({ value }) => {
      await changeUserName({
          name:value
      })
      if (!value) {
        ElMessage.error("新用户名不能为空");
      } else {
        getData();
        ElMessage.success(`保存成功`);
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
    });
};

onMounted(async()=>{
  getData()
})
</script>

<style lang="less" scoped>
.info {
  .header {
    margin-left: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;

    .head-info {
      margin-left: 20px;
      margin-top: 20px;

      label {
        font-size: 25px;
      }

      li {
        list-style: none;
        margin-top: 10px;
      }

      span {
        color: rgb(78, 28, 185);
      }
    }
  }

  .data {
    display: flex;
    justify-content: space-between;
    margin-left: 40px;

    h1 {
      font-weight: bolder;
      font-size: 20px;
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      li {
        margin-top: 20px;
        color: #666;
      }
    }

    .left {
      flex: 1;
    }

    .right {
      flex: 1;
    }
  }
}
</style>

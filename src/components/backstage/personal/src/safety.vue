<template>
  <div class="safety">
    <ul>
      <li style="margin-bottom: 60px">
        <h1>账户</h1>
      </li>

      <li>
        <div class="data">
          <div>
            <label class="label">手机&#12288;&#12288;</label>
            {{ information?.account }}
            <el-divider />
          </div>
          <div>
            <label class="label">邮箱&#12288;&#12288;</label>
            {{ information?.mail }}
            <span>修改</span>
            <span>解绑</span>
            <span>验证</span>
            <el-divider />
          </div>
          <div>
            <label class="label">密码&#12288;&#12288;&#12288;</label>
            <!--  eslint-disable-next-line vue/require-component-is -->
            <component is="Lock" style="width: 20px;"></component>
            {{ information?.password }}
            <el-divider />
          </div>
          <div>
            <label class="label">账号绑定</label>
            <span style="color: #666"> 微信 </span>
            <span style="color: #666">QQ </span>

            <span> 绑定 </span>
            <el-divider />
          </div>
          <div>
            <label class="label">账户注销</label>
            <span style="color: red"> 注销 </span>
            <el-divider />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { personGet } from "@/api";
import { onMounted, ref } from "vue";
import type { form } from "./type";

const information = ref<Array<form>>([]);
const getData = async () => {
  let res = await personGet({});
  information.value = res.data;
}
onMounted(async () => {
  getData()
})
</script>

<style lang="less" scoped>
.safety {
  margin-left: 40px;
  h1 {
    font-size: 20px;
    font-weight: bolder;
  }

  ul {
    list-style: none;
    margin-top: 20px;

    .data {
      .label {
        color: #666;
        margin-right: 100px;
      }

      span {
        color: rgb(43, 176, 224);
        margin-right: 5px;
        margin-left: 5px;
      }
    }
  }
}
</style>

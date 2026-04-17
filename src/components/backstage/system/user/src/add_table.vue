<template>
  <div ref="testRef">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="formData.uname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.sex" placeholder="">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import type { expose, form } from "./type";

const formData = ref<form>({
  id: 0,
  uname: "",
  sex: "",
  email: "",
  password: "",
});
const dialogTableVisible = ref(true);

const testRef = ref(null);

defineExpose({
  formData,
  dialogTableVisible,
  testRef,
});

interface prop {
  close: Function;
  add: Function;
}

const props = defineProps<prop>();
</script>

<style lang="less" scoped></style>

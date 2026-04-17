<template>
  <el-form :model="formData" label-width="120px">

    <el-form-item label="id">
      <el-input v-model="formData.id" :disabled="isDisabled" />
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="formData.uname" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="formData.sex" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formData.email" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isDisabled = ref(false);

const formData = ref<any>({
  id: 0,
  uname: "",
  sex: "",
  email: "",
  password: "",
});

interface prop {
  close: Function;
  submit: Function;
}

const props = defineProps<prop>();

defineExpose<any>({
  formData,
  isDisabled,
});
</script>

<style lang="less" scoped></style>

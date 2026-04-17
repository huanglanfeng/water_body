<template>
  <el-form :model="formData" label-width="120px">

    <el-form-item label="id">
      <el-input v-model="formData.id" :disabled="isDisabled" />
    </el-form-item>
    <el-form-item label="注册时间">
      <el-input v-model="formData.createtime" />
    </el-form-item>
    <el-form-item label="编号">
      <el-input v-model="formData.rolecode" />
    </el-form-item>
    <el-form-item label="角色名">
      <el-input v-model="formData.rolename" />
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
  id: "",
  createtime: "",
  rolecode: "",
  rolename: "",
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

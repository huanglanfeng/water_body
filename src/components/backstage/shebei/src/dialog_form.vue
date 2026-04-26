<template>
  <el-form :model="formData" label-width="120px">
    <el-form-item label="设备类型">
      <el-input v-model="formData.type" :disabled="isDisabled" />
    </el-form-item>
    <el-form-item label="编号">
      <el-input v-model="formData.facilitycode" />
    </el-form-item>
    <el-form-item label="设备状态">
      <el-input v-model="formData.status" />
    </el-form-item>
    <el-form-item label="数据更新时间">
      <el-input v-model="formData.newtime" />
    </el-form-item>
    <el-form-item label="数据间隔">
      <el-input v-model="formData.intervaltime" />
    </el-form-item>
    <el-form-item label="告警内容">
      <el-input v-model="formData.content" />
    </el-form-item>
    <el-form-item label="采区">
      <el-input v-model="formData.area" />
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
  type: "",
  facilitycode: "",
  status: "",
  newtime: "",
  intervaltime: "",
  content: "",
  area: "",
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

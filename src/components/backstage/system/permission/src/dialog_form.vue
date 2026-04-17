<template>
  <el-form :model="formData" label-width="120px">
    <!-- <el-form-item label="采砂船类型">
            <el-select v-model="formData.shiptype" placeholder="">
              <el-option label="链条挖斗式" value="链条挖斗式" />
              <el-option label="抽砂泵式" value="抽砂泵式" />
            </el-select>
          </el-form-item> -->

    <el-form-item label="id">
      <el-input v-model="formData.id" :disabled="isDisabled" />
    </el-form-item>
    <el-form-item label="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="role">
      <el-input v-model="formData.role" />
    </el-form-item>
    <!-- <el-form-item label="数据更新时间">
            <el-input v-model="formData.newtime" />
          </el-form-item>
          <el-form-item label="数据间隔">
            <el-input v-model="formData.intervaltime" />
          </el-form-item>
          <el-form-item label="告警内容">
            <el-input v-model="formData.content" />
          </el-form-item>
          <el-form-item label="采区" >
            <el-input v-model="formData.area" />
          </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// import type { expose, form } from './type';

const isDisabled = ref(false);

const formData = ref<any>({
  // shiptype: '',
  id: 0,
  name: "",
  role: "",
  // newtime: '',
  // intervaltime: '',
  // content: '',
  // area: ''
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

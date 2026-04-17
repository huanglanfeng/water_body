<template>
  <div ref="testRef">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="通告内容">
        <el-input v-model="formData.content" />
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

const formData = ref<any>({
  title: "",
  name: "",
  content: "",
});
const dialogAddTableVisible = ref(true);

const testRef = ref(null);

defineExpose({
  formData,
  dialogAddTableVisible,
  testRef,
});

interface prop {
  close: Function;
  add: Function;
}

const props = defineProps<prop>();
</script>

<style lang="less" scoped></style>

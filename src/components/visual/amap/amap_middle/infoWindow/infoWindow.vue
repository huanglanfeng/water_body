<template>
  <div class="info" ref="infoRef">
    <div class="left">
      <el-tabs v-model="activeName" type="card" @tab-click="">
        <el-tab-pane label="流域信息" name="first">
          <shipInfoVue></shipInfoVue>
        </el-tab-pane>
        <el-tab-pane label="设备状态" name="second">
          <equInfoVue></equInfoVue>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top: 10px; margin-left: 40px">
      <imgInfoVue></imgInfoVue>
    </div>
    <el-icon @click="close" style="color: red">
      <Close />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import shipInfoVue from "./src/first/shipInfo.vue";
import equInfoVue from "./src/second/equInfo.vue";
import imgInfoVue from "./src/images/imgInfo.vue"; //图像

const infoRef = ref(null);

const activeName = ref("first");

interface prop {
  close: Function;
}

const props = defineProps<prop>();

defineExpose({
  infoRef,
});
</script>

<style lang="less" scoped>
.info {
  background-color: rgba(8, 72, 104, 0.6);
  width: 455px;
  display: flex;
}
</style>

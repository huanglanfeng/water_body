<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
  >
    <testVue></testVue>
  </el-menu>
</template>

<script lang="ts" setup>
import testVue from "./src/test.vue";
import { useDashBoardStore } from "@/stores/backstage/ShouYe";
import { storeToRefs } from "pinia";
const dashboardStore = useDashBoardStore();
const { isCollapse } = storeToRefs(dashboardStore);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 100%;
  background-color: rgb(29, 38, 48);
}
.el-menu{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-right: 0;
  margin: 0;
  padding: 0;
}
</style>

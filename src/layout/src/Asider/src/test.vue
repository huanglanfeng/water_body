<template>
  <el-menu-item v-for="item in NCMenu" :index="item.path" @click="clickFunction(item.path)">
    <svg-icon :name="item.meta.icon" class="icon" color="white"></svg-icon>
    {{ item.meta.label }}
  </el-menu-item>

  <el-sub-menu v-for="item in CMenu" :index="item.path">
    <template #title>
      <svg-icon :name="item.meta.icon" class="icon" color="white"></svg-icon>
      {{ item.meta.label }}
    </template>
    <el-menu-item
      v-for="subitem in item.children"
      :index="subitem.path"
      @click="clickFunction(subitem.path)"
      class="item"
    >
      <template #title>
        <svg-icon :name="item.meta.icon" class="icon" color="white"></svg-icon>
        {{ subitem.meta.label }}
      </template>
    </el-menu-item>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { useMenuStore } from "@/stores/backstage/menu.js";
import { useRouter } from "vue-router";
const menuStore = useMenuStore();
const router = useRouter();
const clickFunction = (path: string) => {
  router.push(path);
};
const { asyncMenu } = menuStore;
const NCMenu = asyncMenu.filter((item) => {
  return item.meta.type === "1";
});
const CMenu = asyncMenu.filter((item) => {
  return item.meta.type === "2";
});
</script>

<style lang="less" scoped>
.el-menu-item {
  height: 40px;
  color: #888;
  &:hover {
    color: white;
    background-color: rgba(192, 221, 255, 0.247);
  }
}
.is-active {
  background-color: rgba(113, 158, 230, 0.242)
}

:deep(.el-sub-menu__title) {
  color: #888;
  height: 40px;
  &:hover {
   color: white;
    background-color: rgba(192, 221, 255, 0.247);
  }
}
.item{
  background-color: rgb(29, 38, 48);
}
.icon{
  width: 35px;
  height: 35px;
}
</style>

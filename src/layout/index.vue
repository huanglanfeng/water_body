<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!-- <tab-bar></tab-bar> -->
        <Main></Main>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from "./src/Header/index.vue";
import Main from "./src/Main/index.vue"
</script>

<style lang="less" scoped>
/*.common-layout{
  background: url("@/assets/image/water/water01.gif");
  background-size: 100% 100%;
}*/
.el-header {
  --el-header-padding: 0 0px;
  --el-header-height: 80px;
}
  .el-main {
      height: calc(100vh - 80px); //80px为顶部header盒子高度
    overflow-y: auto;
  }
</style>

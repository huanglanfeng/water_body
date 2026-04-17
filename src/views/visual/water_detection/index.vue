<template>
  <div class="main">
    <button class="BackIndex" @click="back">
      <el-icon style="color:aqua" size="26px">
        <CaretLeft />
      </el-icon>
      <span>返回</span>
    </button>
    <dv-borderBox2>
      <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick" style="height: 100%;"
        class="demo-tabs">
        <el-tab-pane label="水域基础信息" name="first">
          <water1Vue></water1Vue>
        </el-tab-pane>
        <el-tab-pane label="外部影响因素" name="second">
          <water2Vue></water2Vue>
        </el-tab-pane>
        <!-- <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
      </el-tabs>
    </dv-borderBox2>
  </div>
</template>

<script lang="ts" setup>
import water1Vue from "@/components/visual/waterEcology/src/water1.vue";
import water2Vue from "@/components/visual/waterEcology/src/water2.vue"
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from "@/router";

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const back=()=>{
  router.push('/index')
}
</script>

<style lang="less" scoped>
.main{
    width: 90vw;
    height: 80vh;
    margin: 2vh 5vw;
    background: #9999994b;
    .BackIndex{
        width: 20vw;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0vh;
        left: 0vw;
        border: none;
        z-index: 999;
        background: transparent;
        span{
            color: rgb(44, 255, 255);
            font: italic bold 24px/30px arial, sans-serif;
        }
        }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
  :deep(.el-tabs__content) {
    overflow: visible;
    margin: 20px 0 0px 0;
  }  
  :deep(.el-tabs__item) {
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
  }
  :deep(.el-tabs__item.is-active) {
    color: #09faee;
  }
  :deep(.el-icon-arrow-left) {
    color: white;
  }
  :deep(.el-icon-arrow-right) {
    color: white;
  }
  :deep(.el-tabs__nav-wrap::after) {
    height: 0;
  }
  :deep(.el-tabs__active-bar) {
    background-color: #11fff3;
  }
</style>

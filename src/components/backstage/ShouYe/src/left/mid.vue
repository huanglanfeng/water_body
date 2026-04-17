<template>
  <div class="content">
    <el-card class="box-card">
      <!-- eslint-disable-next-line vue/valid-v-on -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="">
        <el-tab-pane label="用户反馈" name="first">
          <mid_barVue></mid_barVue>
        </el-tab-pane>
        <el-tab-pane label="本周在线时长" name="second">
          <mid_lineVue></mid_lineVue>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import mid_barVue from "./mid_bar.vue";
import mid_lineVue from "./mid_line.vue";

const activeName = ref("first");
</script>

<style lang="less" scoped>
.box-card {
  // background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
}
</style>

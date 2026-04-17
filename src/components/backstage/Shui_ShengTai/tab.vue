<template>
  <div class="content">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="">
        <el-tab-pane label="溶解盐" name="first">
          <first_tableVue></first_tableVue>
        </el-tab-pane>
        <el-tab-pane label="水溶物" name="second">
          <second_tableVue></second_tableVue>
        </el-tab-pane>
        <el-tab-pane label="放射元素" name="third">
          <third_tableVue></third_tableVue>
        </el-tab-pane>
        <el-tab-pane label="微生物" name="four">
          <four_tableVue></four_tableVue>
        </el-tab-pane>
        <el-tab-pane label="重金属" name="seven">
          <five_tableVue></five_tableVue>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import first_tableVue from "./src/first_table.vue";
import second_tableVue from "./src/second_table.vue";
import third_tableVue from "./src/third_table.vue";
import four_tableVue from "./src/four_table.vue";
import five_tableVue from "./src/five_table.vue";

const activeName = ref("first");
</script>

<style lang="less" scoped>
.content{
  height: auto;
}
</style>

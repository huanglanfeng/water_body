<template>
  <el-card>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="">
      <el-tab-pane label="重金属超标" name="tingkao">
        <tingkao_tableVue></tingkao_tableVue>
      </el-tab-pane>
      <el-tab-pane label="酸碱度异常" name="duisha">
        <duisha_tableVue></duisha_tableVue>
      </el-tab-pane>
      <el-tab-pane label="垃圾堆积" name="chaoliang">
        <chaoliang_tableVue></chaoliang_tableVue>
      </el-tab-pane>
      <el-tab-pane label="微生物超标" name="chaoshi">
        <chaoshi_tableVue></chaoshi_tableVue>
      </el-tab-pane>
      <el-tab-pane label="放射性元素过量" name="kuayu">
        <kuayu_tableVue></kuayu_tableVue>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import chaoliang_tableVue from "./src/chaoliang_table.vue";
import chaoshi_tableVue from "./src/chaoshi_table.vue";
import duisha_tableVue from "./src/duisha_table.vue";
import kuayu_tableVue from "./src/kuayu_table.vue";
import tingkao_tableVue from "./src/tingkao_table.vue";

const activeName = ref("tingkao");
</script>

<style lang="less" scoped></style>

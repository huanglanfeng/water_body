<template>
    <div class="rightCharts">
        <div class="btn">
            <optionButtonVue label="视频监控" @click="dialogVisible = !dialogVisible"></optionButtonVue>
          </div>
          <el-dialog v-model="dialogVisible" custom-class="video-dialog" :close-on-click-modal="false" :modal="false">
            <template #header>
              <div style=" width: 100%; text-align: center; display: flex; justify-content: space-between;">
                <rateVue></rateVue>
                <delayVue></delayVue>
              </div>
            </template>
            <videoVue></videoVue>
          </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed} from "vue";
import optionButtonVue from "./optionButton.vue";
import rateVue from "@/components/visual/amap/amap_middle/video/src/rate.vue";
import delayVue from "../amap_middle/video/src/delay.vue";
import videoVue from "../amap_middle/video/index.vue";
import { ArrowDown } from '@element-plus/icons-vue'

const dialogVisible = ref(false);
</script>
<style lang="less" scoped>
.rightCharts{
    width: 45vw;
    height: 25vh;
    .btn{
        display: flex;
        position: absolute;
        left: 65vw;
        top: 75vh;
    }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
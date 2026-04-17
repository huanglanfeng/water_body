<template>
  <el-row>
    <el-col :span="12">
      <el-statistic :value="268" :value-style="{ color: 'aqua',font: 'italic bold 50px/30px arial, sans-serif' }">
        <template #title>
          <div style="color:#fff;font-size:18px">
            工业总数
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="12">
      <el-statistic :value="138" :value-style="{ color: 'greenyellow',font: 'italic bold 50px/30px arial, sans-serif' }">
        <template #title>
          <div style="display: inline-flex; align-items: center;color:#fff;font-size:18px;">
            正常工业数
            <el-icon style="margin-left: 4px" :size="18">
              <Select />
            </el-icon>
          </div>
        </template>
        <template #suffix>
          <span style="color:red">/100</span>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="12">
      <el-statistic :value="outputValue" :value-style="{ color: 'red',font: 'italic bold 50px/30px arial, sans-serif' }">
        <template #title>
          <div style="color:#fff;font-size:18px">
            异常工业数
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="12">
      <el-statistic title="反馈数量" :value="562" :value-style="{ color: 'yellow',font: 'italic bold 50px/30px arial, sans-serif' }">
        <template #title>
          <div style="color:#fff;font-size:18px">
            反馈数量
          </div>
        </template>
        <template #suffix>
          <el-icon style="vertical-align: -0.125em;color:aquamarine">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 1720
</script>

<style lang="less" scoped>
 /*@font-face{font-family:electronicFont;src:url(../../assets/font/DS-DIGIT.TTF)}*/
.el-col {
  text-align: center;
  line-height: 20px;
  margin-bottom: 8px;
}

</style>

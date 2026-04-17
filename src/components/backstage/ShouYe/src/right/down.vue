<template>
  <div class="down">
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <span>公告</span>
            </span>
          </template>
          <down_noticeVue></down_noticeVue>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import down_noticeVue from "./down_notice.vue";
</script>

<style lang="less" scoped>
.down {
  margin-top: 10px;
  .custom-tabs-label {
    margin-right: 10px;
    text-align: center;

    color: black;
    font-weight: 3px;
    font-size: 15px;
  }
}
</style>

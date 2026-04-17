<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.not-found h1 {
  font-size: 120px;
  color: #409eff;
  margin-bottom: 10px;
}
.not-found p {
  font-size: 20px;
  color: #909399;
  margin-bottom: 30px;
}
</style>

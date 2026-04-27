<template>
  <div class="content">
    <div class="online-card">
      <div class="online-icon">⏱️</div>
      <div class="online-info">
        <div class="online-label">累计在线时长</div>
        <div class="online-value"><span class="number">125</span> 小时</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.content {
  width: 100%;
}
.online-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: #fff;
}
.online-icon {
  font-size: 28px;
}
.online-info {
  display: flex;
  flex-direction: column;
}
.online-label {
  font-size: 12px;
  opacity: 0.8;
}
.online-value {
  font-size: 20px;
  font-weight: 700;
  .number {
    font-size: 26px;
    color: #ffd700;
  }
}
</style>

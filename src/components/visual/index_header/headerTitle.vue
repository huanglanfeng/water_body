<template>
  <div class="title-wrapper">
    <div class="title-icon">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#00e5ff" opacity="0.3"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="url(#titleGrad)" stroke-width="2"/>
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#00e5ff" stroke-width="1.5" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="#00e5ff"/>
        <path d="M2 12h4M18 12h4M12 2v4M12 18v4" stroke="#00e5ff" stroke-width="1" opacity="0.4"/>
        <defs>
          <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00e5ff"/>
            <stop offset="100%" style="stop-color:#0088ff"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="title-text">城市水体监管平台</div>
    <div class="title-deco">
      <span class="deco-line"></span>
      <span class="deco-dot"></span>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}
.title-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-text {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 3px;
  white-space: nowrap;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
}
.title-deco {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
}
.deco-line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #00e5ff, transparent);
  border-radius: 1px;
}
.deco-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00e5ff;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
</style>

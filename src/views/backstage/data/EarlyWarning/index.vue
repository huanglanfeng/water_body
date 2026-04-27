<template>
  <div class="warning">
    <div class="bar_worning">
      <el-row :gutter="12">
        <el-col :span="23">
          <el-card shadow="hover">
            <div class="map-container">
              <div class="map-title">南昌水域预警点位分布</div>
              <svg viewBox="0 0 400 300" class="water-map" xmlns="http://www.w3.org/2000/svg">
                <!-- 背景水域 -->
                <defs>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e0f2fe;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#bae6fd;stop-opacity:1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <!-- 地图底图轮廓 - 南昌简化 -->
                <rect x="0" y="0" width="400" height="300" rx="8" fill="#f0f9ff" stroke="#cbd5e1" stroke-width="1"/>
                <!-- 赣江主干 -->
                <path d="M160,0 Q155,40 150,80 Q145,120 140,160 Q138,200 142,240 Q145,270 148,300" fill="none" stroke="#7dd3fc" stroke-width="18" stroke-linecap="round" opacity="0.5"/>
                <!-- 抚河支流 -->
                <path d="M400,60 Q350,70 300,85 Q250,95 200,100 Q170,102 150,100" fill="none" stroke="#7dd3fc" stroke-width="10" stroke-linecap="round" opacity="0.4"/>
                <!-- 青山湖 -->
                <ellipse cx="230" cy="110" rx="35" ry="20" fill="url(#waterGrad)" stroke="#93c5fd" stroke-width="1" opacity="0.7"/>
                <!-- 艾溪湖 -->
                <ellipse cx="280" cy="80" rx="28" ry="18" fill="url(#waterGrad)" stroke="#93c5fd" stroke-width="1" opacity="0.7"/>
                <!-- 象湖 -->
                <ellipse cx="120" cy="170" rx="30" ry="22" fill="url(#waterGrad)" stroke="#93c5fd" stroke-width="1" opacity="0.7"/>
                <!-- 瑶湖 -->
                <ellipse cx="340" cy="130" rx="32" ry="24" fill="url(#waterGrad)" stroke="#93c5fd" stroke-width="1" opacity="0.7"/>
                <!-- 军山湖 -->
                <ellipse cx="350" cy="240" rx="38" ry="20" fill="url(#waterGrad)" stroke="#93c5fd" stroke-width="1" opacity="0.6"/>
                <!-- 鄱阳湖（部分） -->
                <path d="M80,280 Q120,260 180,265 Q240,270 300,275 Q340,278 400,290" fill="none" stroke="#7dd3fc" stroke-width="14" stroke-linecap="round" opacity="0.35"/>

                <!-- 预警点位 - 红色脉冲标记 -->
                <!-- 点位1: 赣江中段 -->
                <circle cx="148" cy="140" r="5" fill="#ef4444" filter="url(#glow)">
                  <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="148" cy="140" r="3" fill="#fff"/>
                <!-- 点位2: 青山湖 -->
                <circle cx="225" cy="108" r="5" fill="#f97316" filter="url(#glow)">
                  <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="225" cy="108" r="3" fill="#fff"/>
                <!-- 点位3: 象湖 -->
                <circle cx="118" cy="168" r="5" fill="#ef4444" filter="url(#glow)">
                  <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="118" cy="168" r="3" fill="#fff"/>
                <!-- 点位4: 抚河入口 -->
                <circle cx="195" cy="98" r="5" fill="#eab308" filter="url(#glow)">
                  <animate attributeName="r" values="4;7;4" dur="2.2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2.2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="195" cy="98" r="3" fill="#fff"/>
                <!-- 点位5: 瑶湖 -->
                <circle cx="338" cy="128" r="5" fill="#f97316" filter="url(#glow)">
                  <animate attributeName="r" values="4;7;4" dur="2.3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2.3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="338" cy="128" r="3" fill="#fff"/>

                <!-- 水域名称标注 -->
                <text x="148" y="155" font-size="9" fill="#475569" text-anchor="middle">赣江</text>
                <text x="230" y="118" font-size="8" fill="#475569" text-anchor="middle">青山湖</text>
                <text x="280" y="88" font-size="8" fill="#475569" text-anchor="middle">艾溪湖</text>
                <text x="120" y="178" font-size="8" fill="#475569" text-anchor="middle">象湖</text>
                <text x="340" y="138" font-size="8" fill="#475569" text-anchor="middle">瑶湖</text>
                <text x="350" y="248" font-size="8" fill="#475569" text-anchor="middle">军山湖</text>
                <text x="240" y="288" font-size="8" fill="#64748b" text-anchor="middle">鄱阳湖</text>

                <!-- 图例 -->
                <rect x="10" y="260" width="120" height="35" rx="4" fill="rgba(255,255,255,0.85)" stroke="#e2e8f0" stroke-width="0.5"/>
                <circle cx="22" cy="272" r="4" fill="#ef4444"/>
                <text x="30" y="275" font-size="8" fill="#475569">严重预警</text>
                <circle cx="72" cy="272" r="4" fill="#f97316"/>
                <text x="80" y="275" font-size="8" fill="#475569">中度预警</text>
                <circle cx="22" cy="286" r="4" fill="#eab308"/>
                <text x="30" y="289" font-size="8" fill="#475569">轻度预警</text>
              </svg>
            </div>
          </el-card>
        </el-col>
        <el-col :span="23">
          <el-card shadow="hover"> 
          <developTendVue></developTendVue>
          </el-card>
        </el-col>
        <el-col :span="23">
          <el-card shadow="hover">
            <HistoryVue></HistoryVue>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="wornings">
      <el-divider content-position="left" border-style="dashed">水生态数据统计</el-divider>
      <tab_Vue></tab_Vue>
      <el-divider content-position="left" border-style="dashed">预警详情</el-divider>
      <tabVue></tabVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tabVue from "@/components/backstage/EarlyWarning/tab.vue";
import developTendVue from "./src/developTend.vue";
import HistoryVue from "./src/history.vue";
import tab_Vue from "@/components/backstage/Shui_ShengTai/tab.vue";
</script>

<style lang="less" scoped>
.warning {
  display: flex;
  flex-direction: row;
  .bar_worning{
    width: 35vw;
    height: 100vh;
  }
  .wornings{
    width: 65vw;
    height: 100vh;
  }
}
.map-container {
  padding: 0;
  .map-title {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 8px;
    padding-left: 4px;
  }
  .water-map {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
}
</style>

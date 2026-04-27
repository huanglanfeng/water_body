<template>
  <div class="dialog_right">
    <div class="title">报警信息</div>

    <!-- 摄像头基本信息 -->
    <div class="camera-info" v-if="cameraInfo && cameraInfo.name">
      <div class="info-section">
        <div class="section-title">摄像头信息</div>
        <ul>
          <li>
            <span class="label">摄像头名称：</span>
            <span class="value">{{ cameraInfo.name }}</span>
          </li>
          <li>
            <span class="label">安装位置：</span>
            <span class="value">{{ cameraInfo.location }}</span>
          </li>
          <li>
            <span class="label">运行状态：</span>
            <el-tag :type="cameraInfo.status === '在线' ? 'success' : 'danger'" size="small">
              {{ cameraInfo.status }}
            </el-tag>
          </li>
          <li>
            <span class="label">IP 地址：</span>
            <span class="value">{{ cameraInfo.ip }}</span>
          </li>
          <li>
            <span class="label">分辨率：</span>
            <span class="value">{{ cameraInfo.resolution }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 报警详细信息 -->
    <div class="data">
      <div class="info-section">
        <div class="section-title">报警详情</div>
        <ul>
          <li>报警源：编码设备11</li>
          <li>联动监控点：监控点2-11</li>
          <li>报警类型：异常监测报警</li>
          <li>报警时间：2023.04.19</li>
          <li>
            报警细节：
            <p>
              联动监控点:监控点2_11 <br />
              时间:2023-4-23 13:45:08 <br />
              异常地区:瑶湖地区 <br />
              报警类型:微生物含量超标，铜元素含量超标
              <br />
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { cameraInfoKey } from "./key";

const cameraInfo = inject(cameraInfoKey);
</script>

<style lang="less" scoped>
.dialog_right {
  .title {
    font-size: 25px;
    border-bottom: 1px #666 solid;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

  .info-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 10px;
    padding-left: 8px;
    border-left: 3px solid #409eff;
  }

  li {
    list-style: none;
    margin: 10px;
    line-height: 1.6;
  }

  .label {
    color: #909399;
    font-size: 14px;
  }

  .value {
    color: #303133;
    font-size: 14px;
    font-weight: 500;
  }

  .data {
    font-size: 15px;

    p {
      display: inline-block;
      margin-top: 0;
    }
  }
}
</style>

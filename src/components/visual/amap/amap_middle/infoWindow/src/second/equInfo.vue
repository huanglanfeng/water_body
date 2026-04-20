<template>
  <div class="content">
    <h3>传感器装置 01</h3>
    <ul v-if="sensorData && sensorData.length > 0">
      <li>
        <span>设备编号： {{sensorData[0]?.id}}</span>
      </li>
      <li>
        <span>设备状态： {{sensorData[0]?.status}}</span>
      </li>
      <li>
        <span>更新时间： {{sensorData[0]?.updateTime}}</span>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>

    <h3>传感器装置 02</h3>
    <ul v-if="sensorData && sensorData.length > 1">
      <li>
        <span>设备编号： {{sensorData[1]?.id}}</span>
      </li>
      <li>
        <span>设备状态：<a href="" style="color: red;">{{sensorData[1]?.status}}</a></span>
      </li>
      <li>
        <span>更新时间： {{sensorData[1]?.updateTime}}</span>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>

    <h3>摄像头</h3>
    <ul v-if="cameraData && cameraData.length > 0">
      <li>
        <span>设备编号： {{cameraData[0]?.id}}</span>
      </li>
      <li>
        <span>设备状态： {{cameraData[0]?.status}}</span>
      </li>
      <li>
        <span>更新时间： {{cameraData[0]?.updateTime}}</span>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script lang="ts" setup>
import { camera, sensor } from '@/api/index';
import type { form } from './type';
import { onMounted, ref } from 'vue';

const cameraData = ref<Array<form>>([]);
const sensorData = ref<Array<form>>([]);

const getData = async () => {
  try {
    let resC = await camera({});
    if (resC && resC.data != null) {
      cameraData.value = Array.isArray(resC.data) ? resC.data : [resC.data];
    } else {
      cameraData.value = [];
    }
  } catch (e) {
    console.warn('获取摄像头信息失败:', e);
    cameraData.value = [];
  }
  try {
    let resS = await sensor({});
    if (resS && resS.data != null) {
      sensorData.value = Array.isArray(resS.data) ? resS.data : [resS.data];
    } else {
      sensorData.value = [];
    }
  } catch (e) {
    console.warn('获取传感器信息失败:', e);
    sensorData.value = [];
  }
};

onMounted(async () => {
  await getData();
});
</script>

<style lang="less" scoped>
ul {
  border: 1px solid #666;
  padding: 10px;
  span {
    color: white;
  }
}

h3 {
  font-weight: bolder;
  color: rgb(246, 245, 204);
}
</style>

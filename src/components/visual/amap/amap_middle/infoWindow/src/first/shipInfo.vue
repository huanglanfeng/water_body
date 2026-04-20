<template>
  <div class="content">
    <h3>河流信息</h3>
    <ul v-if="tableData && tableData.length > 0">
      <li>
        <span>河流名称： {{tableData[0]?.river}}</span>
      </li>
      <li>
        <span>站点位置： {{tableData[0]?.site}}</span>
      </li>
      <li>
        <span>经度： {{ tableData[0]?.longitude}}</span>
      </li>
      <li>
        <span>维度： {{ tableData[0]?.latitude}}</span>
      </li>
      <li>
        <span>水质情况： {{ tableData[0]?.waterQuality}}</span>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>

    <h3>预警信息</h3>
    <ul v-if="tableData && tableData.length > 0">
      <li>
        <span style="">垃圾数量：<a href="" style="color: red">{{tableData[0]?.garbageNumber}}</a></span>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script lang="ts" setup>
import { zoneData } from '@/api/index';
import type  {form} from '@/components/visual/amap/amap_left/type';
import { onMounted, ref } from 'vue';

const tableData = ref<Array<form>>([]);
const getData=async()=>{
  try {
    let res=await zoneData({});
    if (res && res.data != null) {
      tableData.value = Array.isArray(res.data) ? res.data : [res.data];
    } else {
      tableData.value = [];
    }
  } catch (e) {
    console.warn('获取河流信息失败:', e);
    tableData.value = [];
  }
};

onMounted(async () => {
  await getData();
});
</script>

<style lang="less" scoped>
ul {
  border: 1px solid #666;
  padding: 20px;
  color: white;
  li{
    margin: 12px;
  }
}

h3 {
  font-weight: bolder;
  color: rgb(246, 245, 204);
}
</style>

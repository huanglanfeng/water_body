<template>
    <div class="leftArea">
      <div class="data">
          <span>当前地区
          <el-dropdown @command="handleCommand">
              <img src="@/assets/image/el-menu-icon/location-point5.png" style="width:20px;">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">{{options[0]}}</el-dropdown-item>
                <el-dropdown-item command="b">{{ options[1]}}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          </span>
          <span class="datas">{{ selectedData?.address ?? '--' }}</span>
        </div>
        <div class="data">
          <span>污染指数</span>
          <span class="datas">{{ selectedData?.pollutionIndex ?? '--' }}<span class="unit"> mg/L</span></span>
        </div>
        <div class="data">
            <span>预警次数</span>
            <span class="datas">{{ selectedData?.alertNumber ?? '--' }}<span class="unit"> 次</span></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed} from "vue";
import { zoneData } from "@/api/index";
import type { form } from "./type";

const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await zoneData({});
  tableData.value=res.data;
};

let value = ref('')
const options = ['江西师范大学','南昌工程学院',]

const handleCommand = (command: string) => {
  value.value=command;
}
const selectedData = computed(() => {
  if (value.value === 'a') {
    // 返回对应的数据
    return tableData.value[0];
  } else if (value.value === 'b') {
    // 返回对应的数据
    return tableData.value[1];
  } else {
    // 其他情况处理或返回默认数据
    return null;
  }
});

onMounted(async () => {
  await getData();
});
</script>

<style lang="less" scoped>
.leftArea {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 0;
  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 1px solid rgba(0, 180, 255, 0.15);
    border-radius: 2px;
    background: rgba(0, 30, 60, 0.5);
    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
    }
    .datas {
      color: #00e5ff;
      font-size: 18px;
      font-weight: 700;
      margin-top: 4px;
      .unit {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 229, 255, 0.5);
      }
    }
  }
}
</style>

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
          <span class="datas">{{ selectedData?.address }}</span>
        </div>
        <div class="data">
          <span>污染指数</span>
          <span class="datas">{{ selectedData?.pollutionIndex }}</span>
        </div>
        <div class="data">
            <span>预警等级</span>
            <span class="datas">{{ selectedData?.alertLevel }}</span>
        </div>
        <div class="data">
            <span>预警次数</span>
            <span class="datas">{{ selectedData?.alertNumber }}</span>
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
  width: 47vw;
  height: 15vh;
  display: flex;
  flex-direction:row;
  justify-content: space-around;
  .data{
    width: 11vw;
    height: 12vh;
    margin: 1vh 0.5vw 1vh 0.5vw;
    background-image: url('@/assets/image/select.png');
    background-size: 100% 100%;
    span{
      color: #f9ffdf;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      padding-top: 20px;
    }
    .datas{
      color: rgb(243, 248, 95);
      font: italic bold 24px/30px arial, sans-serif;
      padding-top: 8px;
    }
  }
}
</style>

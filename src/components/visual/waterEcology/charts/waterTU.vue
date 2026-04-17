<template>
  <div class="waterTU">
    <dv-scroll-board :config="config" style="width: 510px; height: 210px;"/>
  </div>
</template>
<script lang="ts" setup>
import { reactive,ref,onMounted } from "vue";
import type { form } from "../src/type.ts";
import { ditydata } from "@/api/index"

const config =  reactive({
  header: ["序号","点位/cm", "P/ml","S/ml","Ca/ml", "NTU"],
  data: [] as form[],
  index: false,
  columnWidth: [50],
  align:['center'],
});

const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await ditydata({});
  tableData.value = res.data;
  config.data = tableData.value;
  console.log(config.data);
  
};


onMounted(async() => {
  await getData();
  })

</script>
<style lang="less" scoped>
.waterTU {
    height: 250px;
    width: 550px;
    margin-left: 40px;
  :deep(.dv-scroll-board .header) {
    width: 100%;
    justify-content: space-around;
  }
  :deep(.dv-scroll-board .rows .row-item) {
    justify-content: space-around;
    width: 100%;
  }
}

</style>

<!-- <template>
  <div class="warn">
    <ul style="overflow: auto" autoplay="true">
       <li v-for="item in tableData" :key="item.id">
          <warnItemVue
            :chemical="item.warning"
            :value="item.value"
            :date="item.time"
            :id="item.id"
            :addr="item.site"
          ></warnItemVue>
        </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import warnItemVue from "./warnItem.vue";
import type { form } from "./type";
import { onMounted, ref } from "vue";
import { warning } from "@/api/index";

const count = ref(0)
const load = () => {
  count.value += 2
}
const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await warning({});
  tableData.value = res.data;
};
onMounted(async () => {
  await getData();
});
</script>

<style lang="less" scoped>
.warn {
  background-color: rgba(128, 128, 128, 0.2);
  width: 25vw;
  ul {
    height: 28vh;
    overflow:scroll;
    margin: 15px 5px 0px 0;
  }
  list-style: none;
}
</style> -->


<template>
  <div class="WornData">
    <dv-scroll-board :config="config" style="width: 1000px; height: 300px;"/>
  </div>
</template>

<script lang="ts" setup>
import {  warning } from '@/api/index';
import { onMounted, reactive, ref } from 'vue';
import type { form } from "./type";

const config=reactive({
  header: ['编号', '地点','警告内容', '监测值', '时间'],
  data:  [] as form[],
  // ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3','<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3']
  index: false,
  columnWidth: [110,150,150,150,150],
  align: ['center']
})

const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await warning({});
  tableData.value = res.data;
  console.log(res.data);
  
  config.data=tableData.value;
  console.log(config.data);
  
};
onMounted(async () => {
  await getData();
});
</script>

<style lang="less" scoped>
.WornData {
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
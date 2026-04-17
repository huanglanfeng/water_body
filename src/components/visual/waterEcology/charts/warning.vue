<template>
  <div class="warn">
    <ul>
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
  background-color: rgba(128, 128, 128, 0.1);
  width: 400px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  ul {
    height: 200px;
    overflow:scroll;
    box-shadow: 1px rgb(255, 255, 255);
    border-radius: 1%;
    animation: scroll 10s infinite;
  }
  list-style: none;
}
</style>

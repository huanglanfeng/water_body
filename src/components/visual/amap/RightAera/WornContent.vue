<template>
    <div class="WornData">
        <dv-scroll-board :config="config" style="width: 24vw; height: 30vh;margin:0 10px 0 10px" />
    </div>
</template>

<script lang="ts" setup>
import { warning } from '@/api/index';
import { onMounted, reactive, ref, inject, watch } from 'vue';
import type { form } from "./type";
const tableData = ref<Array<form>>([]);
const config = reactive({
    header: ['编号', '地点', '警告内容', '时间'],
    data: [] as form[],
    // data: [tableData.value[0]?.id],
    index: false,
    columnWidth: [110, 150, 150,150],
    align: ['center']
})

const getData = async () => {
    let res = await warning({});
    tableData.value = res.data;
    config.data = tableData.value;
    console.log(config.data);

};

// 监听刷新key变化
const refreshKey = inject<ReturnType<typeof ref<number>>>('refreshKey');
if (refreshKey) {
  watch(refreshKey, () => {
    getData();
  });
}

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
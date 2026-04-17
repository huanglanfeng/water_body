<template>
    <div class="content">
        <div class="charts">
            <chartsTitleVue title="气体监测数据"></chartsTitleVue>
            <gasVue></gasVue>
        </div>
        <div class="charts">
            <chartsTitleVue title="元素检测"></chartsTitleVue>
            <elementVue></elementVue>
        </div>
        <div class="charts">
            <chartsTitleVue title="声音监测数据"></chartsTitleVue>
            <soundVue></soundVue>
        </div>
    </div>
</template>

<script lang="ts" setup>
import chartsTitleVue from "../charts/chartsTitle.vue";
import gasVue from "../../supervisor/charts/gas.vue";
import elementVue from "../charts/element.vue";
import soundVue from "../../supervisor/charts/sound.vue";

</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.charts {
    width: 600px;
    height: 280px;
    margin: 5px 10px;
}
</style>

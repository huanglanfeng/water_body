<template>
    <div class="top">
        <dv-borderBox12>
            <chartsTitleVue title="基本信息"></chartsTitleVue>
            <statisticVue></statisticVue>
        </dv-borderBox12>
    </div>
    <div class="down">
        <dv-borderBox12>
            <chartsTitleVue title="设备信息"></chartsTitleVue>
            <equitmentVue></equitmentVue>
        </dv-borderBox12>
    </div>
</template>

<script lang="ts" setup>
import chartsTitleVue from "./chartsTitle.vue";
import equitmentVue from "@/components/visual/supervisor/charts/equitment.vue";
import statisticVue from "./statistic.vue";
</script>

<style lang="less" scoped>
.top{
    width: 25vw;
    height: 25vh;
    background: rgba(0, 0, 255, 0.1);
}
.down{
    width: 25vw;
    height: 30vh;
    background: rgba(0, 0, 255, 0.1);
}
.el-statistic {
    --el-statistic-content-font-size: 24px;
}

.statistic-card {
   color: rgb(255, 255, 255);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 15px;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>

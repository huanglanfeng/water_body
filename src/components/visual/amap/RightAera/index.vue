<template>
    <div class="contain">
        <div class="Today">
                <chartsTitleVue title="检测情况"></chartsTitleVue>
                <TodayDataVue></TodayDataVue>
        </div>
        <div class="Content">
                <chartsTitleVue title="预警详情"></chartsTitleVue>
                <WornContentVue></WornContentVue>
        </div>
        <div class="Worn">
                <chartsTitleVue title="预测报警"></chartsTitleVue>
                <WornTypeVue></WornTypeVue>
        </div>
    </div>
</template>
<script lang="ts" setup>
import WornContentVue from './WornContent.vue'
import WornTypeVue from './WornType.vue';
import TodayDataVue from './TodayData.vue';
import chartsTitleVue from "@/components/visual/amap/chartsTitle.vue";
</script>
<style lang="less" scoped>
.contain{
    width: 25vw;
    height: 87vh;
    overflow: hidden;
    .Today{
        width: 25vw;
        height: 28vh;
    }
    .Worn{
        width: 25vw;
        height:28vh ;
        margin-top: 1vh;
    }
    .Content{
        width: 25vw;
        height: 28vh;
        margin-top: 1vh;
    }
}
</style>
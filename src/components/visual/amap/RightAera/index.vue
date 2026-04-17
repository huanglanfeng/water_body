<template>
    <div class="contain">
        <div class="Today">
            <dv-borderBox10>
                <chartsTitleVue title="检测情况"></chartsTitleVue>
                <TodayDataVue></TodayDataVue>
            </dv-borderBox10>
        </div>
        <div class="Content">
            <dv-borderBox10>
                <chartsTitleVue title="预测报警"></chartsTitleVue>
                <WornContentVue></WornContentVue>
            </dv-borderBox10>
        </div>
        <div class="Worn">
            <dv-borderBox10>
                <chartsTitleVue title="预测报警"></chartsTitleVue>
                <WornTypeVue></WornTypeVue>
            </dv-borderBox10>
        </div>
    </div>
</template>
<script lang="ts" setup>
import WornContentVue from './WornContent.vue'
import WornTypeVue from './WornType.vue';
import TodayDataVue from './TodayData.vue';
import chartsTitleVue from "@/views/visual/waterEcology/chartsTitle.vue"
</script>
<style lang="less" scoped>
.contain{
    width: 25vw;
    height: 87vh;
    .Today{
        width: 25vw;
        height: 30vh;
    }
    .Worn{
        width: 25vw;
        height:29vh ;
        margin-top: 1vh;
    }
    .Content{
        width: 25vw;
        height: 26vh;
        margin-top: 1vh;
    }
}
</style>
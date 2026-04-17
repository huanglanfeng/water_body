<template>
    <div class="container">
        <div class="left_area">
            <leftAreaVue></leftAreaVue>
        </div>
        <div class="mid_area">
           <!-- <midCharts></midCharts>  -->
        </div>
        <!-- <div class="right_area">
            <rightCharts></rightCharts>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import leftAreaVue from './leftArea.vue';
import rightCharts from './rightCharts.vue';
import midCharts from './midCharts.vue';
</script>

<style lang="less" scoped>
.container{
    width: 75vw;
    height: 30vh;
    display: flex;
    flex-direction: row;
    .left_area{
        width: 25vw;
        height: 30vh;
    }
    .mid_area{
        width: 50vw;
        height: 30vh;
    }
}
</style>

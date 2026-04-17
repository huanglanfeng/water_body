<template>
    <div class="main">
        <button class="BackIndex" @click="back">
            <el-icon style="color:aqua" size="26px"><CaretLeft /></el-icon>
            <span>返回</span>
        </button>
        <dv-borderBox8 title="预警详情">
            <div>
                <rightVue></rightVue>
            </div>
        </dv-borderBox8>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import rightVue from "@/components/visual/amap/amap_right/rightArea.vue";
const back=()=>{
  router.push('/index')
}
</script>

<style lang="less" scoped>
.main{
    width: 90vw;
    height: 85vh;
    margin: 2vh 5vw;
    background: #9999992b;
    .BackIndex{
        width: 20vw;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0vh;
        left: 0vw;
        border: none;
        z-index: 999;
        background: transparent;
        span{
            color: rgb(44, 255, 255);
            font: italic bold 24px/30px arial, sans-serif;
        }
        }
}
</style>

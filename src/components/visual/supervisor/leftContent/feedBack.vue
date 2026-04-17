<template>
    <div class="contain">
        <div v-for="subItem in header" class="item">
            <div class="head">
                <span >{{ subItem.time }}</span>
                <span >{{ subItem.site }}</span>
                <span >{{ subItem.content }}</span>
                <span >{{ subItem.account }}</span>
            </div>
        </div>
        <vue3-seamless-scroll class="scroll" v-model="isScroll" :list="tableData" :step="0.1" :hover="true"
            :limit-scroll-num="3" :wheel="true">
            <div v-for="item in tableData" class="item">
                <div class="li">
                    <span>{{ item?.time }}</span>
                    <span>{{ item?.site }}</span>
                    <span>{{ item?.content }}</span>
                    <span>{{ item?.account }}</span>
                </div>
            </div>
        </vue3-seamless-scroll>
    </div>
</template>
<script lang="ts" setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { onMounted, ref } from 'vue'
import { feedback } from '@/api';
import type { form } from "../type";
//vue3导入组件是不需要用component注册的
//导入完成后如果项目本身是在运行的记得重新编译项目，不然会报错，如npm run dev

const header=ref([{ time: '时间', site: '地点', content: '事件',account:'用户'}])

const isScroll = ref(true)

const tableData = ref<Array<form>>([]);
const getData = async () => {
    let res = await feedback({});
    tableData.value = res.data;
};

onMounted(async () => {
    await getData();
})
</script>

<style lang="less" scoped>
.contain{
    height: 220px;
    width: 73vw;
    position: absolute;
    top:74%;
    background: #4a5f809f;
    .head{
    width: 100%;
    height: 35px;
    font-size: 20px;
    background-color: rgba(0, 115, 255, 0.286);
    color: aliceblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.scroll {
    /* 必需要设置合适的高,因为他的原理是往列表最后添加列表重复元素，所以这个组件高不要大于其内容原先的最大高度 */
    height: 250px;
    width: 100%;
    margin: 15px 0;
    overflow: hidden;
    .item{
        margin: 10px;
    }
.li{
    font-size: 15px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
}
}
</style>

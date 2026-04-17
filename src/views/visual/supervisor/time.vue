<template>
  <span class="showTime"> {{ formatDate() }}</span>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
        const date = ref(new Date()); // 使用ref来保存日期对象

        function formatDate() {
            let year = date.value.getFullYear();
            let month = (date.value.getMonth() + 1 < 10 ? "0" : "") + (date.value.getMonth() + 1);
            let day = (date.value.getDate() < 10 ? "0" : "") + date.value.getDate();
            let hours = (date.value.getHours() < 10 ? "0" : "") + date.value.getHours();
            let minutes = (date.value.getMinutes() < 10 ? "0" : "") + date.value.getMinutes();
            let seconds = (date.value.getSeconds() < 10 ? "0" : "") + date.value.getSeconds();

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        const timer = setInterval(() => { // 使用setInterval设置一个定时器，每1000毫秒（1秒）更新一次时间
            date.value = new Date(); // 更新日期对象以获取当前时间
        }, 1000);


        computed(() => formatDate()) // 返回一个计算属性，每次访问时都会调用formatDate函数获取格式化后的时间字符串
        
    function beforeUnmount() { // 在组件卸载之前清除定时器，防止内存泄漏
        clearInterval(timer);
    }
</script>

<style lang="less" scoped>
.showTime{
    font-size: 20px;
    font-family: "UnidreamLED";
    color: rgb(34, 255, 215);
}
</style>
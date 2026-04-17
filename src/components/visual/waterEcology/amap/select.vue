<template>
    <select v-model="value" filterable placeholder="Select">
        <option class="option" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>
<style lang="less" scoped>
select{
    width: 150px;
    height: 35px;
    border: 2px solid rgba(0, 51, 147);
    border-radius: 12px;
    background: rgba(0, 102, 255, 0.1);
    color: aliceblue;
    option{
        background: transparent;
        color:black
    }
}
</style>
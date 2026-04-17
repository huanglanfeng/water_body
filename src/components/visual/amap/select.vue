<template>
        <div class="select">
            <el-select @click="area" v-model="value" placeholder="鄱阳湖" size="small">
                <el-option v-for="item in options" :key="item.value" :value="item.value[0]?.siteId" @click="Select" />
                <el-option v-for="item in options" :key="item.value" :value="item.value[1]?.siteId" @click="Select" />
            </el-select>
        </div>
</template>

<script lang="ts" setup>
import { addressSelect, addressSelectGet } from "@/api/graph/index"
import { ref } from "vue";

const value = ref('')
const form = ref<any>({
    alertLevel: 0,
    alertNumber: 0,
    photoOne: "",
    photoTwo: "",
    photoThree: "",
    site: "",
    waterQualityParameters: 0,
    siteId: ""
});
const tableData = ref([form]);
const area = async () => {
    let res = await addressSelectGet({});
    tableData.value = res.data;
}

const options = [tableData]

const Select = async () => {
    const res = await addressSelect({
        params: {
            siteId: value.value
        }
    });
    //将后端返回来的json格式的数据转换为String格式
    var str_jsonData_address = JSON.stringify(res.data)
    //通过localStorage保存到本地中,命名为localData
    localStorage.setItem('address', str_jsonData_address);
}

</script>

<style lang="less" scoped>
    .select {
        width: 80px;
        position: absolute;
    top:28%;
    left: 74%;
    }
</style>

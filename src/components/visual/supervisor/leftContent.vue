<template>
  <div class="content">
        <!-- <div class="select">
        <el-select @click="area" v-model="value" placeholder="鄱阳湖" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value[0]?.siteId"
            @click="Select"

          />
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value[1]?.siteId"
            @click="Select"
          />
        </el-select>
      </div> -->
    <div class="echarts">
      <!-- <div class="echart">
          <amapVUe1></amapVUe1>
        </div>
      <div class="echart">
       <amapVUe2></amapVUe2>
     </div> -->
    </div>
    <!-- <div class="img">
      <imgAndv></imgAndv>
    </div> -->
    <!-- <div class="tab">
      <tabVue/>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import amapVUe1 from "./map/amap.vue";
import amapVUe2 from "./map/amap2.vue";
import imgAndv from "@/components/visual/supervisor/imgAndv.vue";
import tabVue from "./charts/tab.vue";
import {addressSelect, addressSelectGet} from "@/api/graph/index"
import { ref } from "vue";

const value = ref('')
const form = ref<any>({
  alertLevel:0,
  alertNumber:0,
  photoOne:"",
  photoTwo:"",
  photoThree:"",
  site:"",
  waterQualityParameters:0,
  siteId:""
});
const tableData=ref([form]);
const area=async ()=>{
  let res=await addressSelectGet({});
  tableData.value=res.data;  
}

const options = [tableData]

const Select = async () => {
     const res= await addressSelect({
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
.content {
  display: flex;
  flex-direction: column;
    .echarts{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tab{
      width: 600px;
      height: 300px;
      margin-top: 30px;
    }
    .select{
      width: 80px;
      display: flex;
      position:relative;
      left: 265px;
      top: 10px;
    }
}
.container {
  width: 600px;
  height: 300px;
}
</style>

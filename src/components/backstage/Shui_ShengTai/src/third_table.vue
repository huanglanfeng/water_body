<template>
  <el-table
    :data="
      tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
    stripe
    style="width: 100%"
  >
  <el-table-column prop="exceptionArea" label="地区" />
    <el-table-column prop="ray1" label="射线1" />
    <el-table-column prop="ray2" label="射线2" />
    <el-table-column prop="thorium" label="钍" />
    <el-table-column prop="radium" label="镭" />
    <el-table-column prop="uranium" label="铀" />
    <el-table-column prop="detectTime" label="检测时间" />
    <el-table-column label="Operations">
      <template #default="scope">
            <el-button size="middle" @click="deleteData(scope.$index, scope.row)" type="danger">
                <span style="color: white"> 删除 </span>
              </el-button>
          </template>
    </el-table-column>
  </el-table>

  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { elementGet,elementDeldte } from "@/api/index";
import type { form } from "./type";
import { ElMessage, ElMessageBox } from "element-plus";

const getData = async () => {
  let res = await elementGet({params:{id:5}});
  console.log(res.data, "sst_03");
  tableData.value = res.data;
};

getData();


const deleteData = async (index: number, row: form) => {
  ElMessageBox.confirm("确定要删除该条记录么？", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        let item = tableData.value.find((it) => {
          return it == row;
        });
        if (item) {
          await elementDeldte({ params: { site: item.exceptionArea, flag: "放射物" } });
        }

        else {
          ElMessage({
            message: "数据不存在",
            type: "error",
          });
        }
        await getData();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } catch (error: any) {
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
    });
};

const tableData = ref<Array<form>>([]);
const currentPage = ref<number>(1); //默认页码为1

const pagesize = ref<number>(10); //默认一页显示10条

const handleCurrentChange = (size: number) => {
  currentPage.value = size;
};

const handleSizeChange = (Page: number) => {
  currentPage.value = Page;
};
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  bottom: 10%;

  text-align: center;
}
</style>

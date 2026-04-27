<template>
  <el-table
    v-if="tableData.length > 0"
    :data="
      tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
    stripe
    style="width: 100%"
  >
  <el-table-column prop="exceptionArea" label="地区" />
    <el-table-column prop="germ" label="细菌" />
    <el-table-column prop="fungus" label="真菌" />
    <el-table-column prop="animal" label="原生动物" />
    <el-table-column prop="phage" label="噬菌体" />
    <el-table-column prop="detectTime" label="检测时间" />
    <el-table-column label="Operations">
      <template #default="scope">
            <el-button size="middle" @click="deleteData(scope.$index, scope.row)" type="danger">
                <span style="color: white"> 删除 </span>
              </el-button>
          </template>
    </el-table-column>
  </el-table>
  <el-empty v-else description="暂无数据" />

  <div class="page" v-if="tableData.length > 0">
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
import { organismGet,organismDeldte } from "@/api/index";
import type { form } from "./type"
import { ElMessage, ElMessageBox } from "element-plus";

const getData = async () => {
  let res = await organismGet({params:{id:4}});
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
          await organismDeldte({ params: { site: item.exceptionArea, flag: "微生物" } });
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

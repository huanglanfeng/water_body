<template>
  <el-table
    :data="
      tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
    stripe
    style="width: 100%"
  >
  <el-table-column prop="siteId" label="地区" />
    <el-table-column prop="sulfate" label="硫酸盐" />
    <el-table-column prop="nitrate" label="硝酸盐" />
    <el-table-column prop="permanganate" label="高锰酸盐" />
    <el-table-column prop="conductivity" label="电导率" />
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
import { saltGet,saltDelete } from "@/api/index";
import type { form } from "./type"
import { ElMessage, ElMessageBox } from "element-plus";

const getData = async () => {
  let res = await saltGet({params: {id: 1}});
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
          await saltDelete({ params: { site: item.siteId, flag: "溶解盐" } });
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

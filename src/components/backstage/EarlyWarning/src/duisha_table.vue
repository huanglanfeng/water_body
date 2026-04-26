<template>
  <div class="table-container">
    <!-- 搜索和导出区域 -->
    <div class="top-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入酸碱度/异常地点" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleExport">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="paginatedData" stripe style="width: 100%" empty-text="暂无预警数据">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="ph" label="酸碱度" />
      <el-table-column prop="exception" label="异常（偏）" />
      <el-table-column prop="exceptionArea" label="异常地点" />
      <el-table-column prop="warningTime" label="预警时间" />
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
        layout="total, prev, pager, next"
        :total="filteredData.length"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { phget, phdelete } from "@/api/index";
import { ref, computed, reactive } from "vue";
import type { form } from "./type";
import { ElMessage, ElMessageBox } from "element-plus";
import { exportToExcel } from "@/utils/exportExcel";

//获取数据
const tableData = ref<Array<form>>([]);
const getData = async () => {
  let res = await phget({});
  tableData.value = res.data;
};
getData();

//搜索功能
const searchForm = reactive({
  keyword: ""
});

const filteredData = computed(() => {
  if (!searchForm.keyword) {
    return tableData.value;
  }
  const keyword = searchForm.keyword.toLowerCase();
  return tableData.value.filter((item: form) => {
    return (
      (item.ph !== undefined && String(item.ph).toLowerCase().includes(keyword)) ||
      (item.exceptionArea && item.exceptionArea.toLowerCase().includes(keyword))
    );
  });
});

const handleSearch = () => {
  currentPage.value = 1;
};

//分页功能
const currentPage = ref<number>(1);
const pagesize = ref<number>(10);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pagesize.value;
  const end = start + pagesize.value;
  return filteredData.value.slice(start, end);
});

const handleCurrentChange = (size: number) => {
  currentPage.value = size;
};

//导出Excel
const handleExport = () => {
  if (filteredData.value.length === 0) {
    ElMessage({
      message: "暂无数据可导出",
      type: "warning",
    });
    return;
  }
  const exportData = filteredData.value.map((item) => ({
    序号: item.id,
    酸碱度: item.ph,
    异常: item.exception,
    异常地点: item.exceptionArea,
    预警时间: item.warningTime,
  }));
  exportToExcel(exportData, "酸碱度异常预警数据", "酸碱度异常");
  ElMessage({
    message: "导出成功",
    type: "success",
  });
};

//删除
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
          await phdelete({ params: { id: item.id, flag: "酸碱" } });
        } else {
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
</script>

<style lang="less" scoped>
.table-container {
  .top-bar {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
  }
}
.page {
  margin-top: 20px;
  text-align: center;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

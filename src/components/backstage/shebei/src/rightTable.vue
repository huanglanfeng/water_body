<template>
  <div class="shebei-content">
    <!-- 搜索和导出区域 -->
    <div class="top-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入设备类型/编号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleExport">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="paginatedData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="type" label="设备类型" />
      <el-table-column prop="id" label="设备编号" />
      <el-table-column prop="status" label="设备状态" />
      <el-table-column prop="updateTime" label="数据更新时间" />
      <el-table-column prop="interval" label="数据间隔" />
      <el-table-column prop="siteId" label="检测地区" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="filteredData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-model="dialogTableVisible" title="修改">
      <dialog_formVue :close="close" :submit="submit" ref="dialogRef"></dialog_formVue>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from "vue";
import { equipmentGet, sb_add01, equitmentDelete, sb_update01} from "@/api/index";
import { ElMessage, ElTable, ElTableColumn, ElButton, ElMessageBox} from "element-plus";
import dialog_formVue from "./dialog_form.vue";
import type{form} from "./type";
import { exportToExcel } from "@/utils/exportExcel";

//获取数据
const tableData = ref<Array<form>>([])
const loading = ref(false);
const getData = async () => {
  loading.value = true;
  try {
    let res = await equipmentGet({});
    tableData.value = res.data;
  } finally {
    loading.value = false;
  }
};

//搜索功能
const searchForm = reactive({
  keyword: ""
});

const filteredData = computed(() => {
  if (!searchForm.keyword) {
    return tableData.value;
  }
  const keyword = searchForm.keyword.toLowerCase();
  return tableData.value.filter((item: any) => {
    return (
      (item.type && item.type.toLowerCase().includes(keyword)) ||
      (item.id && String(item.id).toLowerCase().includes(keyword))
    );
  });
});

const handleSearch = () => {
  currentPage.value = 1;
};

//分页功能
const currentPage = ref(1);
const pageSize = ref(10);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
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
  const exportData = filteredData.value.map((item: any) => ({
    设备类型: item.type,
    设备编号: item.id,
    设备状态: item.status,
    数据更新时间: item.updateTime,
    数据间隔: item.interval,
    检测地区: item.siteId,
  }));
  exportToExcel(exportData, "设备管理数据", "设备列表");
  ElMessage({
    message: "导出成功",
    type: "success",
  });
};


const dialogTableVisible = ref(false);

const dialogRef = ref<InstanceType<typeof dialog_formVue>>();

//修改
const openDialog = (row: any) => {
  dialogTableVisible.value = true;
  let item: any = tableData.value.find((it: any) => {
    return it.facilitycode == row.facilitycode;
  });
  nextTick(() => {
    dialogRef.value!.formData.type = row.type;
    dialogRef.value!.formData.id = row.id;
    dialogRef.value!.formData.status = row.status;
    dialogRef.value!.formData.updateTime = row.updateTime;
    dialogRef.value!.formData.interval = row.interval;
    dialogRef.value!.formData.siteId = row.siteId;
    if (item) dialogRef.value!.formData.facilitycode = item.facilitycode;
    dialogRef.value!.isDisabled = true;
  });
};

const close = () => {
  dialogTableVisible.value = false;
};

const submit = async () => {
  let data = dialogRef.value?.formData;

  try {
    loading.value = true;
    await sb_update01(data);

    await getData();

    loading.value = false;

    ElMessage({
      message: "修改成功",
      type: "success",
    });
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: "error",
    });
  }

  close();
};

//删除
const deleteData = async (row: any) => {
  ElMessageBox.confirm("确定要删除该设备吗？删除后不可恢复。", "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        let item: any = tableData.value.find((it: any) => {
          return it.id == row.id;
        });
        if (item) {
          try {
            loading.value = true;
            await equitmentDelete({ params: { id: item.id } });

            await getData();

            loading.value = false;

            ElMessage({
              message: "删除成功",
              type: "success",
            });
          } catch (error: any) {
            ElMessage({
              message: error.message,
              type: "error",
            });
          }
        } else
          ElMessage({
            message: "数据为空",
            type: "error",
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
        message: "已取消删除",
      });
    });
};

getData();

</script>

<style lang="less" scoped>
.shebei-content {
  .top-bar {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
  }
  .pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

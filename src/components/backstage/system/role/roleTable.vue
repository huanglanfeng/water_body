<template>
  <div class="content">
    <el-card>
      <el-dialog v-model="dialogTableVisible" title="修改">
        <dialog_formVue
          :close="close"
          :submit="submit"
          ref="dialogRef"
        ></dialog_formVue>
      </el-dialog>

      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" />
        <el-table-column prop="createtime" label="注册时间" />
        <el-table-column prop="rolecode" label="编号" />
        <el-table-column prop="rolename" label="角色名" />

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="openDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deleteData(scope.$index, scope.row)"
              >删除</el-button
            >
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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import {
  // sys_delete02,
  // sys_get02,
  // sys_update02,
  // sys_update03,
} from "@/api/index";
import dialog_formVue from "./src/dialog_form.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([
  { id: 1, createtime: '2026-01-15', rolecode: 'R001', rolename: '系统管理员' },
  { id: 2, createtime: '2026-02-20', rolecode: 'R002', rolename: '水质检测员' },
  { id: 3, createtime: '2026-03-10', rolecode: 'R003', rolename: '设备管理员' },
  { id: 4, createtime: '2026-03-25', rolecode: 'R004', rolename: '数据分析员' },
  { id: 5, createtime: '2026-04-01', rolecode: 'R005', rolename: '普通用户' },
]);

const dialogTableVisible = ref(false);

const dialogRef = ref<InstanceType<typeof dialog_formVue>>();

const loading = ref(false);

const openDialog = (row: any) => {
  dialogTableVisible.value = true;
  let item: any = tableData.value.find((it: any) => {
    return it.rolecode == row.rolecode;
  });

  nextTick(() => {
    // dialogRef.value!.formData.area = row.area
    // dialogRef.value!.formData.facilitycode = row.facilitycode
    dialogRef.value!.formData.id = row.id;
    dialogRef.value!.formData.createtime = row.createtime;
    dialogRef.value!.formData.rolecode = row.rolecode;
    dialogRef.value!.formData.rolename = row.rolename;
    // dialogRef.value!.formData.intervaltime = row.intervaltime
    // dialogRef.value!.formData.content = row.content
    // dialogRef.value!.formData.area = row.area
    if (item) dialogRef.value!.formData.rolecode = item.rolecode;

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
    await sys_update02(data);

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

const deleteData = async (index: number, row: any) => {
  ElMessageBox.confirm("确定要删除该条记录么？", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        let item: any = tableData.value.find((it: any) => {
          return it.id == row.id;
          // console.log(it.approvalcode, '114514');
        });
        console.log(tableData.value);

        //console.log(row, 'row');

        console.log(item?.id, "id");

        if (item) await sys_delete02({ params: { id: item.id } });
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

const currentPage = ref<number>(1); //默认页码为1

const pagesize = ref<number>(10); //默认一页显示10条

const handleCurrentChange = (size: number) => {
  currentPage.value = size;
};

const handleSizeChange = (Page: number) => {
  currentPage.value = Page;
};

const getData = async () => {
  let res = await sys_get02({});
  console.log(res, "sys_02");
  tableData.value = res.data;
};

getData();
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  bottom: 10%;

  text-align: center;
}
</style>

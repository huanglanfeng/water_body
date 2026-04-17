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
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="name" label="admin" />
        <el-table-column prop="role" label="身份" />
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
import { nextTick, onMounted, ref } from "vue";
import {adminGet,adminAdd,adminDelete} from "@/api/index";
import dialog_formVue from "./src/dialog_form.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([]);


const dialogTableVisible = ref(false);

const dialogRef = ref<InstanceType<typeof dialog_formVue>>();

const loading = ref(false);

const openDialog = (row: any) => {
  dialogTableVisible.value = true;
  let item: any = tableData.value.find((it: any) => {
    return it.id == row.id;
  });

  nextTick(() => {
    dialogRef.value!.formData.id = row.id;
    dialogRef.value!.formData.name = row.name;
    dialogRef.value!.formData.role = row.role;
    if (item) dialogRef.value!.formData.id = item.id;

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
    await adminAdd(data);

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

        //console.log(row, 'row');

        console.log(item?.id, "id");

        if (item) await adminDelete({ params: { id: item.id } });
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

//获取数据
const getData = async () => {
  let res = await adminGet({});
  tableData.value = res.data;
};
onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  bottom: 10%;

  text-align: center;
}
</style>

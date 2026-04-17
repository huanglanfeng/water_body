<template>
  <div class="content">
    <!-- <el-card>
      <el-button
        type="primary"
        plain
        style="margin-bottom: 10px; width: 100px; height: 40px"
        @click="dialogTableVisible = true"
      >
        >
        <el-icon style="margin-right: 10px"> <Plus /> </el-icon>新增
      </el-button>

      <el-dialog v-model="dialogTableVisible" title="新增">
        <add_tableVue
          ref="addTableRef"
          :close="closeDialog"
          :add="addData"
        ></add_tableVue>
      </el-dialog>

      <el-dialog v-model="dialogTableVisibles" title="修改">
        <dialog_formVue
          :close="close"
          :submit="submit"
          ref="dialogRefs"
        ></dialog_formVue>
      </el-dialog>

      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" />
        <el-table-column prop="useraccount" label="账号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="usersex" label="性别" />
        <el-table-column prop="useremail" label="邮箱" />
        <el-table-column prop="userpassword" label="密码" />
        <el-table-column prop="userphone" label="电话" />

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
    </el-card> -->
  </div>
</template>

<!-- <script lang="ts" setup>
import { nextTick, ref , onMounted, reactive } from "vue";
import {
  // sys_delete01,
  // sys_get01,
  // sys_update01,
  // sys_add01,
} from "@/api/index";
import { ElMessage, ElMessageBox, ElNotification,
  type Action, } from "element-plus";
import type dialog_formVue from "./src/dialog_form.vue";
import type { expose, form } from "./src/type";
import add_tableVue from "./src/add_table.vue";

const closeDialog = () => {
  dialogTableVisible.value = false;
};

// const tableData = ref([]);
const tableData = ref<Array<form>>([]);

const dialogTableVisible = ref(false);
const dialogTableVisibles = ref(false);

const dialogRef = ref<InstanceType<typeof dialog_formVue>>();

  const addTableRef = ref<InstanceType<typeof add_tableVue>>();

const loading = ref(false);

const addData = async () => {
  let data = {
    id: addTableRef.value?.formData.id,
    uname: addTableRef.value?.formData.uname,
    sex: addTableRef.value?.formData.sex,
    email: addTableRef.value?.formData.email,
    password: addTableRef.value?.formData.password,
  };
  try {
    await sys_add01(data);
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    if (addTableRef.value) {
      addTableRef!.value.formData = {
        id: 0,
        uname: "",
        sex: "",
        email: "",
        password: "",
      };
    } else {
      ElNotification({
        title: "Error",
        message: "addTableRef is null!",
        type: "error",
      });
    }
    await getData();
    closeDialog();
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: "error",
    });
  }
};

const openDialog = (row: any) => {
  dialogTableVisibles.value = true;
  let item: any = tableData.value.find((it: any) => {
    return it.rolecode == row.rolecode;
  });

  nextTick(() => {
    dialogRef.value!.formData.id = row.id;
    dialogRef.value!.formData.useraccount = row.useraccount;
    dialogRef.value!.formData.username = row.username;
    dialogRef.value!.formData.usersex = row.usersex;
    dialogRef.value!.formData.useremail = row.useremail;
    dialogRef.value!.formData.userpassword = row.userpassword;
    dialogRef.value!.formData.userphone = row.userphone;
    if (item) dialogRef.value!.formData.id = item.id;

    dialogRef.value!.isDisabled = true;
  });
};

const close = () => {
  dialogTableVisibles.value = false;
};

const submit = async () => {
  let data = dialogRef.value?.formData;

  try {
    loading.value = true;
    await sys_update01(data);

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

        if (item) await sys_delete01({ params: { id: item.id } });
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
  let res = await sys_get01({});
  console.log(res, "sys_01");
  tableData.value = res.data;
};

getData();




</script> -->

<style lang="less" scoped>
.page {
  position: fixed;
  bottom: 10%;

  text-align: center;
}
</style>

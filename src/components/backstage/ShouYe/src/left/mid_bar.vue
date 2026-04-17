<template>
  <el-card>
      <el-button type="primary" plain style="margin-bottom: 10px; width: 100px; height: 40px" @click="dialogAddTableVisible = true">
        <el-icon style="margin-right: 10px"> <Plus /> </el-icon>新增
      </el-button>

      <el-dialog v-model="dialogAddTableVisible" title="新增">
        <add_tableVue ref="addTableRef" :close="closeDialog" :add="addData"></add_tableVue>
      </el-dialog>

    <el-table :data="tableData" height="260" style="width: 100%">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="account" label="反馈用户" />
      <el-table-column prop="site" label="反馈用户" />
      <el-table-column prop="content" label="反馈内容" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogTableVisible" title="反馈内容">
    <el-input v-model="feedback.content" height="200px" type="textarea">
    </el-input>

    <div class="noticeFooter">
      {{ feedback.account }}
      {{ feedback.time }}
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, inject, watch } from "vue";
import add_tableVue from "./add_table.vue";
import { feedbackGet,feedbackAdd,feedbackDelete } from "@/api/index";
import { ElMessage, ElMessageBox ,ElNotification} from "element-plus";

//加载数据
const dialogTableVisible = ref(false);
const feedback = ref({
  id: 0,
  account: "",
  site:"",
  time: "",
  content:"",
});

//获取数据
const tableData = ref([]);
const getData = async () => {
  let res = await feedbackGet({});
  tableData.value = res.data;
};

// 监听刷新key变化
const refreshKey = inject<ReturnType<typeof ref<number>>>('refreshKey');
if (refreshKey) {
  watch(refreshKey, () => {
    getData();
  });
}


const closeDialog = () => {
  dialogAddTableVisible.value = false;
};


//增加
const dialogAddTableVisible = ref(false);
const addTableRef = ref<InstanceType<typeof add_tableVue>>();
const addData = async () => {
  let data = {
    site: addTableRef.value?.formData.site,
    account: addTableRef.value?.formData.account,
    content: addTableRef.value?.formData.content,
  };
  try {
    await feedbackAdd(data);
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    if (addTableRef.value) {
      addTableRef!.value.formData = {
        id: 0,
        site: "",
        content: "",
        account: "",
        time: "",
      };
    } else {
      ElNotification({
        title: "Error",
        message: "addTableRef is null！",
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

//删除
const deleteData = async (index: number, row: any) => {
  ElMessageBox.confirm("确定要删除该条反馈么？", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        let item: any = tableData.value.find((it: any) => {
          return it.id == row.id;
        });
        if (item) await feedbackDelete({ params: { id: item.id } });
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

const openDialog = (row: any) => {
  let item: any = tableData.value.find((it: any) => {
    return it.id == row.id;
  });
  feedback.value.content = item.content;
  feedback.value.account = item.account;
  feedback.value.site = item.site;
  feedback.value.time = item.time;
  dialogTableVisible.value = true;
};

onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.noticeFooter {
  margin-left: 450px;
  margin-top: 20px;
}
</style>

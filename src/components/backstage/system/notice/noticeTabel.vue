<template>
  <el-card>
    <el-button type="primary" plain style="margin-bottom: 10px; width: 100px; height: 40px" @click="dialogAddTableVisible = true">
      <el-icon style="margin-right: 10px"> <Plus /> </el-icon>新增
    </el-button>

    <el-dialog v-model="dialogAddTableVisible" title="新增">
      <add_tableVue ref="addTableRef" :close="closeDialog" :add="addData"></add_tableVue>
    </el-dialog>

    <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="name" label="发布人" />
      <el-table-column prop="content" label="通告内容" />
      <el-table-column prop="release_time" label="发布时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="deleteData(scope.$index, scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="tableData.length" :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </el-card>

  <el-dialog v-model="dialogTableVisible" title="公告">
    <el-input v-model="noticeContent.title"> </el-input>
    <el-input v-model="noticeContent.content" height="200px" type="textarea"></el-input>
    <div class="noticeFooter">
      {{ noticeContent.name }}
      {{ noticeContent.release_time }}
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { noticeAdd,noticeDelete,noticeGet } from "@/api/index";
import add_tableVue from "./src/add_table.vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

const tableData = ref([]);

const dialogTableVisible = ref(false);

const noticeContent = ref({
  id:0,
  title: "",
  content: "",
  name: "",
  release_time: "",
});

const addTableRef = ref<InstanceType<typeof add_tableVue>>();

const dialogAddTableVisible = ref(false);

const closeDialog = () => {
  dialogAddTableVisible.value = false;
};

const addData = async () => {
  let data = {
    title: addTableRef.value?.formData.title,
    person: addTableRef.value?.formData.person,
    time: addTableRef.value?.formData.time,
    content: addTableRef.value?.formData.content,
  };
  try {
    await noticeAdd(data);
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    if (addTableRef.value) {
      addTableRef!.value.formData = {
        id:0,
        title: "",
        content: "",
        name: "",
        release_time: "",
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

const deleteData = async (index: number, row: any) => {
  ElMessageBox.confirm("确定要删除该公告吗？删除后不可恢复。", "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        let item: any = tableData.value.find((it: any) => {
          return it.id == row.id;

        });
        if (item) await noticeDelete({ params: { id: item.id } });
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
        message: "已取消删除",
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
  let res = await noticeGet({});
  tableData.value = res.data;
};

const openDialog = (row: any) => {
  let item: any = tableData.value.find((it: any) => {
    return it.id == row.id;
  });
  noticeContent.value.title = item?.title;
  noticeContent.value.content = item.content;
  noticeContent.value.name = item.name;
  noticeContent.value.release_time = item.time;
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

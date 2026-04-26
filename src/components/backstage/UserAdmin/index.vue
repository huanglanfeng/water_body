<template>
  <div class="content">
    <el-row :gutter="12">
      <el-col :span="10">
        <el-card shadow="always">
          <topVue></topVue>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover">
          <statisticVue></statisticVue>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover">
          <bar_userVue />
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card>
      <div class="top">
        <el-button type="primary" plain style="margin-bottom: 10px; width: 100px; height: 40px" @click="AddUser">
          <el-icon style="margin-right: 10px"> <Plus /> </el-icon>新增
        </el-button>
        <el-button type="success" style="margin-bottom: 10px; height: 40px" @click="handleExport">导出Excel</el-button>
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="请输入用户" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog v-model="dialogTableVisible" title="新增用户">
        <add_tableVue ref="addTableRef" :close="closeDialog" :add="addData"></add_tableVue>
      </el-dialog>
      
      <el-dialog v-model="modifyinfomation" title="信息修改">
        <dialog_formVue :close="close" :submit="submit" ref="dialogRef"></dialog_formVue>
      </el-dialog>

      <div class="body">
        <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%" :border="true" v-loading="loading">
          <el-table-column prop="id" label="序号" />
          <el-table-column prop="account" label="账号" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="gender" label="性别" />
          <el-table-column prop="mail" label="邮箱" />
          <el-table-column label="密码">
            <template #default="scope">
              <span style="letter-spacing: 2px;">******</span>
            </template>
          </el-table-column>
          <el-table-column prop="role" label="身份" />
          <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)" type="info">修改</el-button>
            <el-button size="small" @click="deleteData(scope.$index, scope.row)" type="danger">
                <span style="color: white"> 删除 </span>
              </el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      
      <div class="foot">
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref ,nextTick } from "vue";
import { addUser, userdelete, userAdmin ,modify, searchuser} from "@/api/index";
import { ElMessage, ElMessageBox, ElNotification, statisticProps } from "element-plus";
import add_tableVue from "./src/add_table.vue";
import type { form } from "./src/type";
import dialog_formVue from "./src/dialog_form.vue";
import topVue from "@/components/backstage/ShouYe/src/left/top.vue";
import statisticVue from "./src/statistic.vue";
import bar_userVue from "./src/bar_user.vue";
import { exportToExcel } from "@/utils/exportExcel";

//获取数据
const tableData = ref<Array<form>>([]);
const loading = ref(false);  
  const getData = async () => {
    loading.value = true;
    try {
      let res = await userAdmin({});
      tableData.value = res.data;
    } finally {
      loading.value = false;
    }
  };

  //加载页面  
  const dialogTableVisible = ref(false);
  const modifyinfomation = ref(false);

//增加数据
const addTableRef = ref<InstanceType<typeof add_tableVue>>();
const AddUser = () =>{
      dialogTableVisible.value = true;
    }
const closeDialog = () => {
      dialogTableVisible.value = false;
    };
const addData = async () => {
    let data = {
      account: addTableRef.value?.formData.account,
      gender: addTableRef.value?.formData.gender,
      mail: addTableRef.value?.formData.mail,
      password: addTableRef.value?.formData.password,
      role: addTableRef.value?.formData.role,
    };
    try {
      await addUser(data);
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      if (addTableRef.value) {
        addTableRef!.value.formData = { //！确定不为空
          id:0,
          account: "",
          name:"",
          gender: "",
          mail: "",
          password: "",
          role:"",
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
  
  //删除数据
  const deleteData = async (index: number, row: form) => {
    ElMessageBox.confirm("确定要删除该用户吗？删除后不可恢复。", "删除确认", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(async () => {
      try {
        let item = tableData.value.find((it) => {
          return it == row;
        });
        if (item) {   
          let data = {
            id: item.id,
          }                             
          await userdelete(data);            
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
        message: "已取消删除",
      });
    });
  };

  
const formInline = reactive({
  name: "",
});

const handleSearch=async()=>{
    if(formInline.name){
      let res = await searchuser({
      params: {
        condition: formInline.name
      }
    })
    tableData.value = res.data;
    }else{
    await  getData()
    }
}

//导出Excel
const handleExport = () => {
  if (tableData.value.length === 0) {
    ElMessage({
      message: "暂无数据可导出",
      type: "warning",
    });
    return;
  }
  const exportData = tableData.value.map((item) => ({
    序号: item.id,
    账号: item.account,
    用户名: item.name,
    性别: item.gender,
    邮箱: item.mail,
    身份: item.role,
  }));
  exportToExcel(exportData, "用户管理数据", "用户列表");
  ElMessage({
    message: "导出成功",
    type: "success",
  });
};

//页码
const currentPage = ref<number>(1); //默认页码为1
const pagesize = ref<number>(6); //默认一页显示10条
const handleCurrentChange = (size: number) => {
  currentPage.value = size;
};
const handleSizeChange = (Page: number) => {
  currentPage.value = Page;
};

//编辑
const dialogRef = ref<InstanceType<typeof dialog_formVue>>();
  const close = () => {
    modifyinfomation.value = false;
  };
  const handleEdit = (row: any) => {
    modifyinfomation.value = true;
    let item:any = tableData.value.find((it:any) => {
      return it.id == row.id;   
    });
    nextTick(() => {
              dialogRef.value!.formData.account = row.account;
              dialogRef.value!.formData.gender = row.gender;
              dialogRef.value!.formData.mail = row.mail;
              dialogRef.value!.formData.password = row.password;
              dialogRef.value!.formData.role = row.role;
              if (item) dialogRef.value!.formData.id = item.id;
    dialogRef.value!.isDisabled = true;
  });
};

const submit = async () => {
    let data = dialogRef.value?.formData;
    try {
        await modify(data);   
        await getData();
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
         
onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped>
.content{
   box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.3);
  .foot {
    margin-top: 20px;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
}
</style>

<template>
    <el-form :model="formData" label-width="120px">

        <el-form-item label="账户">
            <el-input v-model="formData.account" />
        </el-form-item>

        <el-form-item label="性别">
            <el-select v-model="formData.gender" placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
            </el-select>
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input v-model="formData.mail" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="formData.password" />
        </el-form-item>

        <el-form-item label="身份" prop="role">
              <el-select v-model="formData.role" placeholder="请选择身份">
                <el-option label="用户" value="用户" />
                <el-option label="管理员" value="管理员" />
              </el-select>
            </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isDisabled = ref(false);

const formData = ref<any>({
    id:0,
    account: "",
    name:"",
    gender: "",
    mail: "",
    password: "",
});

interface prop {
    close: Function;
    submit: Function;
}

const props = defineProps<prop>();

defineExpose<any>({
    formData,
    isDisabled,
});
</script>

<style lang="less" scoped></style>

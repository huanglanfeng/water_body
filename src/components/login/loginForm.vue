<template>
  <div class="loginForm">
    <div class="title">基于边缘计算的城市污染水体智能监管平台</div>
    <div class="main">
      <div v-show="currentPage === 'page1'">
        <div>
        <ul>
          <li>
            <input type="text" v-model="form.login_account" placeholder="请输入账号" />
          </li>
          <li>
            <input type="password" v-model="form.login_password" placeholder="请输入密码" />
          </li>
          <li>
            <input type="text" v-model="form.login_code" placeholder="请输入验证码" style="width: 150px;">
            <img :src="codeUrl" style="width: 100px;" @click="refreshCode">
          </li>
          <li>
            <button @click="login" class="footer">
              <span>登录</span>
            </button>
          </li>
          <li class="foots">
            <a @click="switchPage('page4')">注册</a>
            <a @click="switchPage('page3')">找回密码</a>
          </li>
        </ul>
        </div>
      </div>

      <div v-show="currentPage === 'page3'">
        <div>
        <ul>
          <li>
            <input type="text" v-model="form.retrieve_account" placeholder="请输入帐号" />
          </li>
          <li style="width:250px;display: flex;justify-content: space-between;">
            <input type="text" v-model="form.retrieve_code" placeholder="输入验证码" style="width: 200px;" />
            <el-icon @click="captcha" :size="20">
              <Message />
            </el-icon>
          </li>
          <li>
            <input type="password" v-model="form.retrieve_password" placeholder="请输入新密码" />
          </li>
          <li>
            <input type="password" v-model="form.retrieve_password_confirm" placeholder="请再次确认密码" />
          </li>
          <li style="display:flex;flex-direction:row;align-items: center;">
            <button @click="getCode" class="footer" style="width:210px">找回密码</button>
            <div @click="switchPage('page1')" class="Back">
              <img src="@/assets/login/back.png" alt="" style="width:20px">
            </div>
          </li>
        </ul>
        </div>
      </div>

      <div v-show="currentPage === 'page4'">
        <div>
        <ul>
          <!-- <el-button type="primary" :icon="ArrowLeft" @click="switchPage('page1')" class="Back">返回</el-button> -->
          <li>
            <input type="text" v-model="form.account" placeholder="输入手机号" />
          </li>
          <li>
            <input type="password" v-model="form.password" placeholder="设置密码" />
          </li>
          <li style="width:250px;display: flex;justify-content: space-between;">
            <input type="text" v-model="form.code" placeholder="输入验证码" style="width: 200px;" />
            <el-icon @click="captcha" :size="20">
              <Message />
            </el-icon>
          </li>
          <li style="display:flex;flex-direction:row;align-items: center;">
            <button @click="register" class="footer" style="width:210px">注册</button>
            <div @click="switchPage('page1')" class="Back">
              <img src="@/assets/login/back.png" alt="" style="width:20px">
            </div>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginPost, userFind, registerPost, userCaptcha, userInfo } from "@/api/index";
import { onMounted, ref } from "vue";
import { SET_MENU, SET_TOKEN, GET_MENU } from "@/utils/cookie.js";
import { assRouter } from "@/utils/assembleRouter";
import { useMenuStore } from "@/stores/backstage/menu";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { ElLoading } from 'element-plus'

//加载数据
const router = useRouter();
const form = ref({
  account: "",
  login_account: "",
  password: "",
  login_password: "",
  gender: "",
  mail: "",
  code: "",
  login_code: "",
  retrieve_account: "",
  retrieve_password: "",
  retrieve_password_confirm: "",
  retrieve_code: "",

});
const menuStore = useMenuStore();
const { asyncMenu } = storeToRefs(menuStore);
//用户登录
const login = async () => {
  const res = await loginPost(form.value);
  //将后端返回来的json格式的数据转换为String格式
  var str_jsonData = JSON.stringify(res?.name)
  //通过localStorage保存到本地中,命名为localData
  localStorage.setItem('localData', str_jsonData);
  if ((res as any).code == 30001) {
    SET_MENU(JSON.stringify(res.data?.menu));
    SET_TOKEN(res.data?.token);
    try {
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      let menu = GET_MENU();
      asyncMenu.value = menu;
      assRouter(menu);
    } catch (error) {
      console.log(error, "err");
    }
    router.push("/index");
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
      // router.push("/index/supervisor");
      loading.close()
      open()
    }, 2000)
  } else {
    ElMessage({
      message: res?.msg,
      type: "error",
    });
  }
};

const open = () => {
  ElMessageBox.confirm(
    '出现报警，是否前往处理',
    '警告',
    {
      confirmButtonText: '处理',
      cancelButtonText: '等待',
      type: 'error',
      icon: 'WarningFilled',
      center: true,
      customStyle: {
        // background: 'rgb(0 161 255 / 25%)',
        width: '300px',
      },
    }
  )
    .then(() => {
      router.push('/EarlyWarning')
    })
    .catch(() => {
      ElNotification({
        title: '警告',
        message: '预警信息请查看！！！',
        type: 'warning',
      })
    })
}

//获取验证码
const captcha = async () => {
  let res = await userCaptcha(form.value);
  ElMessage({ message: String(res.data), type: 'info' });
};

//图片验证码
const getBaseUrl = () => import.meta.env.VITE_BASE_URL || '/api';
const codeUrl = ref(getBaseUrl() + '/Account/getVerificationCodePhoto');
const refreshCode = () => {
  codeUrl.value = getBaseUrl() + '/Account/getVerificationCodePhoto?' + new Date().getTime();
};

//注册
const register = async () => {
  let res = await registerPost(form.value);
  // eslint-disable-next-line no-constant-condition
  if ((res as any).code == 1) {//true 表示不用验证码验证
    try {
      ElMessage({
        message: "注册成功",
        type: "success",
      });
    } catch (error) {
      console.log(error, "err");
    }
    router.push("/index");

  } else {
    ElMessage({
      message: res?.msg,
      type: "error",
    });
  }
};

//找回密码
const getCode = async () => {
  let res = await userFind(form.value);
  // eslint-disable-next-line no-constant-condition
  if ((res as any).code === 1) {
    try {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
    } catch (error) {
      console.log(error, "err");
    }
    router.push("/");
  } else {
    ElMessage({
      message: res?.msg,
      type: "error",
    });
  }
};

//页码
const currentPage = ref('page1');
const showButton = ref(true);
function switchPage(page: string) {
  currentPage.value = page;
  showButton.value = false;
}
</script>

<style lang="less" scoped>
.loginForm {
  background: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 250px;

  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #666;
  }

  input {
    background-color: transparent;
    border: none;
    margin-bottom: 5px;
    height: 25px;
    width: 250px;
    font-size: 18px;
    border-bottom: 1px solid #888;

    &:focus {
      outline: none;
    }
  }

  .footer {
    width: 250px;
    height: 25px;
    margin: 12px 0;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    background-color: #7f9eb1;

    &:active {
      border: 1px solid #666;
    }
  }

  .foots {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .Back {
    width: 50px;
    height: 18px;
    font-size: 13px;
    margin-left: 20px;
    color: black;
    border: none;
    background-color: #a6b5d000;
  }
}</style>

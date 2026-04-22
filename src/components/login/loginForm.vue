<template>
  <div class="loginForm">
    <div class="title">基于边缘计算的城市污染水体<br />智能监管平台</div>
    <div class="main">
      <!-- ========== 登录页 ========== -->
      <div v-show="currentPage === 'page1'" class="page-section">
        <div class="form-wrapper">
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <input
              type="text"
              v-model="form.login_account"
              placeholder="请输入账号"
              @keyup.enter="login"
            />
          </div>
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              :type="showLoginPwd ? 'text' : 'password'"
              v-model="form.login_password"
              placeholder="请输入密码"
              @keyup.enter="login"
            />
            <div class="pwd-toggle" @click="showLoginPwd = !showLoginPwd">
              <svg v-if="!showLoginPwd" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </div>
          </div>
          <div class="input-group captcha-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <input
              type="text"
              v-model="form.login_code"
              placeholder="请输入验证码"
              class="captcha-input"
              @keyup.enter="login"
            />
            <div class="captcha-img-wrap" @click="refreshCode" title="点击刷新验证码">
              <img :src="codeUrl" alt="验证码" @error="handleCodeError" />
              <span class="captcha-tip">换一张</span>
            </div>
          </div>
          <button @click="login" class="submit-btn" :disabled="loginLoading">
            <span v-if="!loginLoading">登 录</span>
            <span v-else class="loading-text">
              <svg class="spin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              登录中...
            </span>
          </button>
          <div class="footer-links">
            <a @click="switchPage('page4')">注册账号</a>
            <a @click="switchPage('page3')">找回密码</a>
          </div>
        </div>
      </div>

      <!-- ========== 找回密码页 ========== -->
      <div v-show="currentPage === 'page3'" class="page-section">
        <div class="form-wrapper">
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <input type="text" v-model="form.retrieve_account" placeholder="请输入账号" />
          </div>
          <div class="input-group sms-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <input type="text" v-model="form.retrieve_code" placeholder="输入验证码" class="sms-input" />
            <button
              class="sms-btn"
              @click="sendRetrieveCode"
              :disabled="retrieveCountdown > 0"
            >
              {{ retrieveCountdown > 0 ? `${retrieveCountdown}s 后重发` : '获取验证码' }}
            </button>
          </div>
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              :type="showRetrievePwd ? 'text' : 'password'"
              v-model="form.retrieve_password"
              placeholder="请输入新密码"
            />
            <div class="pwd-toggle" @click="showRetrievePwd = !showRetrievePwd">
              <svg v-if="!showRetrievePwd" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </div>
          </div>
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              :type="showRetrieveConfirmPwd ? 'text' : 'password'"
              v-model="form.retrieve_password_confirm"
              placeholder="请再次确认密码"
            />
            <div class="pwd-toggle" @click="showRetrieveConfirmPwd = !showRetrieveConfirmPwd">
              <svg v-if="!showRetrieveConfirmPwd" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </div>
          </div>
          <button @click="getCode" class="submit-btn" :disabled="retrieveLoading">
            <span v-if="!retrieveLoading">找回密码</span>
            <span v-else class="loading-text">
              <svg class="spin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              提交中...
            </span>
          </button>
          <div class="footer-links">
            <a @click="switchPage('page1')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 2px;">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              返回登录
            </a>
          </div>
        </div>
      </div>

      <!-- ========== 注册页 ========== -->
      <div v-show="currentPage === 'page4'" class="page-section">
        <div class="form-wrapper">
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <input type="text" v-model="form.account" placeholder="输入手机号" maxlength="11" />
          </div>
          <div class="input-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              :type="showRegPwd ? 'text' : 'password'"
              v-model="form.password"
              placeholder="设置密码"
            />
            <div class="pwd-toggle" @click="showRegPwd = !showRegPwd">
              <svg v-if="!showRegPwd" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </div>
          </div>
          <div class="input-group sms-group">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <input type="text" v-model="form.code" placeholder="输入验证码" class="sms-input" />
            <button
              class="sms-btn"
              @click="sendRegCode"
              :disabled="regCountdown > 0"
            >
              {{ regCountdown > 0 ? `${regCountdown}s 后重发` : '获取验证码' }}
            </button>
          </div>
          <button @click="register" class="submit-btn" :disabled="registerLoading">
            <span v-if="!registerLoading">注 册</span>
            <span v-else class="loading-text">
              <svg class="spin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              注册中...
            </span>
          </button>
          <div class="footer-links">
            <a @click="switchPage('page1')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 2px;">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              返回登录
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginPost, userFind, registerPost, userCaptcha, userInfo } from "@/api/index";
import { onMounted, ref, onUnmounted } from "vue";
import { SET_MENU, SET_TOKEN, GET_MENU } from "@/utils/cookie.js";
import { assRouter } from "@/utils/assembleRouter";
import { useMenuStore } from "@/stores/backstage/menu";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { ElLoading } from 'element-plus'

// ========== 基础数据 ==========
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

// ========== 页面切换 ==========
const currentPage = ref('page1');
function switchPage(page: string) {
  currentPage.value = page;
}

// ========== 密码显示/隐藏 ==========
const showLoginPwd = ref(false);
const showRegPwd = ref(false);
const showRetrievePwd = ref(false);
const showRetrieveConfirmPwd = ref(false);

// ========== Loading 状态 ==========
const loginLoading = ref(false);
const registerLoading = ref(false);
const retrieveLoading = ref(false);

// ========== 验证码倒计时 ==========
const regCountdown = ref(0);
const retrieveCountdown = ref(0);
let regTimer: ReturnType<typeof setInterval> | null = null;
let retrieveTimer: ReturnType<typeof setInterval> | null = null;

const startCountdown = (type: 'reg' | 'retrieve') => {
  if (type === 'reg') {
    regCountdown.value = 60;
    regTimer = setInterval(() => {
      regCountdown.value--;
      if (regCountdown.value <= 0) {
        clearInterval(regTimer!);
        regTimer = null;
      }
    }, 1000);
  } else {
    retrieveCountdown.value = 60;
    retrieveTimer = setInterval(() => {
      retrieveCountdown.value--;
      if (retrieveCountdown.value <= 0) {
        clearInterval(retrieveTimer!);
        retrieveTimer = null;
      }
    }, 1000);
  }
};

onUnmounted(() => {
  if (regTimer) clearInterval(regTimer);
  if (retrieveTimer) clearInterval(retrieveTimer);
});

// ========== 表单验证 ==========
const validateLogin = (): boolean => {
  if (!form.value.login_account.trim()) {
    ElMessage({ message: '请输入账号', type: 'warning' });
    return false;
  }
  if (!form.value.login_password.trim()) {
    ElMessage({ message: '请输入密码', type: 'warning' });
    return false;
  }
  if (!form.value.login_code.trim()) {
    ElMessage({ message: '请输入验证码', type: 'warning' });
    return false;
  }
  return true;
};

const validateRegister = (): boolean => {
  if (!form.value.account.trim()) {
    ElMessage({ message: '请输入手机号', type: 'warning' });
    return false;
  }
  if (!/^1\d{10}$/.test(form.value.account.trim())) {
    ElMessage({ message: '请输入正确的手机号', type: 'warning' });
    return false;
  }
  if (!form.value.password.trim()) {
    ElMessage({ message: '请设置密码', type: 'warning' });
    return false;
  }
  if (form.value.password.trim().length < 6) {
    ElMessage({ message: '密码长度不能少于6位', type: 'warning' });
    return false;
  }
  if (!form.value.code.trim()) {
    ElMessage({ message: '请输入验证码', type: 'warning' });
    return false;
  }
  return true;
};

const validateRetrieve = (): boolean => {
  if (!form.value.retrieve_account.trim()) {
    ElMessage({ message: '请输入账号', type: 'warning' });
    return false;
  }
  if (!form.value.retrieve_code.trim()) {
    ElMessage({ message: '请输入验证码', type: 'warning' });
    return false;
  }
  if (!form.value.retrieve_password.trim()) {
    ElMessage({ message: '请输入新密码', type: 'warning' });
    return false;
  }
  if (form.value.retrieve_password.trim().length < 6) {
    ElMessage({ message: '密码长度不能少于6位', type: 'warning' });
    return false;
  }
  if (!form.value.retrieve_password_confirm.trim()) {
    ElMessage({ message: '请再次确认密码', type: 'warning' });
    return false;
  }
  if (form.value.retrieve_password !== form.value.retrieve_password_confirm) {
    ElMessage({ message: '两次输入的密码不一致', type: 'warning' });
    return false;
  }
  return true;
};

// ========== 用户登录 ==========
const login = async () => {
  if (!validateLogin()) return;
  loginLoading.value = true;
  try {
    const res = await loginPost({
      login_account: form.value.login_account,
      login_password: form.value.login_password,
      login_code: form.value.login_code,
    });
    if ((res as any).code == 30001) {
      // 登录成功
      SET_MENU(JSON.stringify(res.data?.menu));
      SET_TOKEN(res.data?.token);
      localStorage.setItem('localData', JSON.stringify(res?.name || ''));
      ElMessage({ message: '登录成功，正在跳转...', type: 'success', duration: 1500 });
      try {
        let menu = GET_MENU();
        asyncMenu.value = menu;
        assRouter(menu);
      } catch (error) {
        console.log(error, "err");
      }
      setTimeout(() => {
        router.push("/index");
      }, 500);
    } else {
      ElMessage({ message: res?.msg || '登录失败', type: 'error' });
      form.value.login_code = '';
      refreshCode();
    }
  } catch (error: any) {
    const msg = error?.response?.data?.msg || error?.message || '网络异常，请稍后重试';
    ElMessage({ message: msg, type: 'error' });
    form.value.login_code = '';
    refreshCode();
  } finally {
    loginLoading.value = false;
  }
};


// ========== 获取短信验证码 ==========
const sendRegCode = async () => {
  if (!form.value.account.trim()) {
    ElMessage({ message: '请先输入手机号', type: 'warning' });
    return;
  }
  if (!/^1\d{10}$/.test(form.value.account.trim())) {
    ElMessage({ message: '请输入正确的手机号', type: 'warning' });
    return;
  }
  try {
    let res = await userCaptcha(form.value);
    ElMessage({ message: String(res.data) || '验证码已发送', type: 'success' });
    startCountdown('reg');
  } catch (error) {
    ElMessage({ message: '验证码发送失败，请稍后重试', type: 'error' });
  }
};

const sendRetrieveCode = async () => {
  if (!form.value.retrieve_account.trim()) {
    ElMessage({ message: '请先输入账号', type: 'warning' });
    return;
  }
  try {
    let res = await userCaptcha({ account: form.value.retrieve_account });
    ElMessage({ message: String(res.data) || '验证码已发送', type: 'success' });
    startCountdown('retrieve');
  } catch (error) {
    ElMessage({ message: '验证码发送失败，请稍后重试', type: 'error' });
  }
};

// ========== 图片验证码 ==========
const getBaseUrl = () => import.meta.env.VITE_BASE_URL || '/api';
const codeUrl = ref(getBaseUrl() + '/Account/getVerificationCodePhoto');
const refreshCode = () => {
  codeUrl.value = getBaseUrl() + '/Account/getVerificationCodePhoto?' + new Date().getTime();
};

const handleCodeError = () => {
  // 验证码加载失败时自动重试一次
  setTimeout(() => {
    refreshCode();
  }, 1000);
};

// ========== 注册 ==========
const register = async () => {
  if (!validateRegister()) return;
  registerLoading.value = true;
  try {
    let res = await registerPost(form.value);
    if ((res as any).code == 1) {
      ElMessage({
        message: "注册成功",
        type: "success",
      });
      router.push("/index");
    } else {
      ElMessage({
        message: res?.msg || '注册失败',
        type: "error",
      });
    }
  } catch (error) {
    ElMessage({ message: '网络异常，请稍后重试', type: 'error' });
  } finally {
    registerLoading.value = false;
  }
};

// ========== 找回密码 ==========
const getCode = async () => {
  if (!validateRetrieve()) return;
  retrieveLoading.value = true;
  try {
    let res = await userFind(form.value);
    if ((res as any).code === 1) {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      switchPage('page1');
    } else {
      ElMessage({
        message: res?.msg || '修改失败',
        type: "error",
      });
    }
  } catch (error) {
    ElMessage({ message: '网络异常，请稍后重试', type: 'error' });
  } finally {
    retrieveLoading.value = false;
  }
};
</script>

<style lang="less" scoped>
/* ========== 卡片容器 ========== */
.loginForm {
  background: rgba(255, 255, 255, 0.78);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  min-height: 340px;
  padding: 36px 40px 32px;
  transition: all 0.3s ease;

  /* ========== 标题 ========== */
  .title {
    font-size: 22px;
    font-weight: 700;
    color: #1a3a5c;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 28px;
    letter-spacing: 1px;
  }

  /* ========== 表单容器 ========== */
  .form-wrapper {
    width: 100%;
  }

  /* ========== 输入框组 ========== */
  .input-group {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid #d9e2ec;
    border-radius: 10px;
    margin-bottom: 16px;
    padding: 0 14px;
    transition: all 0.25s ease;

    &:hover {
      border-color: #b0c4de;
    }

    &:focus-within {
      border-color: #409eff;
      box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.12);
      background: #fff;
    }

    .input-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8ca0b3;
      margin-right: 10px;
      flex-shrink: 0;
      transition: color 0.25s ease;
    }

    &:focus-within .input-icon {
      color: #409eff;
    }

    input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 14px;
      color: #333;
      &::placeholder {
        color: #a0aec0;
        font-size: 14px;
      }
    }

    .pwd-toggle {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #a0aec0;
      margin-left: 8px;
      flex-shrink: 0;
      transition: color 0.2s;
      &:hover {
        color: #409eff;
      }
    }
  }

  /* ========== 验证码输入组 ========== */
  .captcha-group {
    width: 100%;

    .captcha-input {
      flex: 1;
      min-width: 0;
    }
    .captcha-img-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      margin-left: 10px;
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
      transition: opacity 0.2s;
      &:hover {
        opacity: 0.8;
      }
      img {
        width: 100px;
        height: 36px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
      }
      .captcha-tip {
        font-size: 10px;
        color: #8ca0b3;
        margin-left: 4px;
        white-space: nowrap;
      }
    }
  }

  /* ========== 短信验证码组 ========== */
  .sms-group {
    .sms-input {
      flex: 1;
      min-width: 0;
    }
    .sms-btn {
      flex-shrink: 0;
      margin-left: 10px;
      height: 32px;
      padding: 0 12px;
      border: 1px solid #409eff;
      border-radius: 8px;
      background: transparent;
      color: #409eff;
      font-size: 12px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.25s ease;
      &:hover:not(:disabled) {
        background: #409eff;
        color: #fff;
      }
      &:disabled {
        border-color: #c0c4cc;
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
  }

  /* ========== 提交按钮 ========== */
  .submit-btn {
    width: 107.5%;
    height: 44px;
    margin-top: 8px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #fff;
    background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      letter-spacing: 2px;
    }

    .spin {
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ========== 底部链接 ========== */
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 13px;

    a {
      color: #5a7a96;
      cursor: pointer;
      transition: color 0.2s;
      text-decoration: none;
      display: flex;
      align-items: center;

      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}
</style>

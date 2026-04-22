import axios from "axios";
import { GET_TOKEN } from "@/utils/cookie";

const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "/api",
  timeout: 15000,
});

//请求拦截器：发请求之前，检测到请求
requests.interceptors.request.use(
  (config) => {
    // 只在有token时才设置Authorization头，避免未登录时触发不必要的CORS预检
    const token = GET_TOKEN();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数，检测到响应回来的数据
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(error);
  }
);
export default requests;

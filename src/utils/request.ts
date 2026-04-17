import axios from "axios";
import { GET_TOKEN } from "@/utils/cookie";

const requests = axios.create({
  baseURL: "/api",
  //    baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
});
requests.defaults.withCredentials = true; //默认携带cookie

//请求拦截器：发请求之前，检测到请求
requests.interceptors.request.use(
  (config) => {
    //config：配置对象，里面一个属性比较重要，headers请求头
    config.withCredentials = true;
    config.headers.Authorization = GET_TOKEN();
    // console.log(config.headers, "header");

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

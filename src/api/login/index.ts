import requests from "@/utils/request";

export const loginPost = (data: any) => {
  return requests.post("/login", data);
};

export const loginPosts = (data: any) => {
  return requests.post("/addressdata/test", data); //请求端口
};

export const registerPost = (data: any) => {
  return requests.post("/register", data);
};

export const userFind = (params: any) => {
  return requests.post("/user/retrieve/password", params);
};

export const userCaptcha = (data: any) => {
  return requests.post("/user/generate/code", data);
};

export const userInfo = (data: any) => {
  return requests.get("/getVerificationCodePhoto", { responseType: 'blob' });
};
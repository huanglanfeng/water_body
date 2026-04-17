import requests from "@/utils/request";

//图像
export const imgGet = (params: any) => {
    return requests.post("/user/update/photo", params);
};
//个人信息
export const personGet = (params: any) => {
    return requests.post("/user/get/user/by/account", params);
};

//修改昵称
export const changeUserName = (params: any) => {
    return requests.post("/user/update", params);
};

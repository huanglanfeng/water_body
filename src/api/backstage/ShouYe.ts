import requests from "@/utils/request";

/**
 * 反馈
 * @param params
 * @returns
 */
export const feedbackGet = (params: any) => {
    return requests.post("/user/select/feedback", params);
};

export const feedbackAdd = (params: any) => {
    return requests.post("/user/add/feedback", params);
};

export const feedbackDelete = (params: any) => {
    return requests.get("/user/delete/feedback", params);
};

/**
 * 在线时长
 * @param params
 * @returns
 */
export const weekGet = (params: any) => {
    return requests.get("/Environment/selectall01", params);
};
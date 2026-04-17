import requests from "@/utils/request";

/**
 * 权限
 */

export const adminGet = (params: any) => {
  return requests.get("/user/get/all/admin", params);
};

export const adminAdd = (data: any) => {
  return requests.post("/System/permission/add", data);
};

export const adminDelete = (params: any) => {
  return requests.get("/System/permission/delete", params);
};

export const sys_update03 = (data: any) => {
  return requests.post("/System/permission/update", data);
};

/**
 * 公告
 */

export const noticeGet = (params: any) => {
  return requests.post("/user/select/notice/data", params);
};

export const noticeAdd = (data: any) => {
  return requests.post("/user/add/notice", data);
};

export const noticeDelete = (params: any) => {
  return requests.get("/user/delete/notice/by/id", params);
};

export const sys_update04 = (data: any) => {
  return requests.post("/News/update", data);
};

import requests from "@/utils/request";

export const userAdmin = (params: any) => {
  return requests.post("/user/select/all", params);
};

export const addUser = (data: any) => {
  return requests.post("/register", data);
};

/**
 * @param  id:number
 */
export const userdelete = (params: any) => {
  return requests.post("/user/delete/id", params);
};

export const modify = (data: any) => {
  return requests.post("/user/update", data);
};

/**
 * @param sendTo :string
 * @param subject :string
 * @param text  :string
 */
export const searchuser = (params: any) => {
  return requests.get("/user/get/user/by/condition", params);
};

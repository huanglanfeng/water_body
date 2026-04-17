import requests from "@/utils/request";


/**
 * 垃圾超标
 * @param params
 * @returns
 */
export const garbageget = (params: any) => {
  return requests.post("/heavy/select/garbage", params);
};

export const garbagedelete = (params: any) => {
  return requests.get("/heavy/delete/by/id", params);
};



/**
 * 重金属
 * @param params
 * @returns
 */

export const mentalget = (params: any) => {
  return requests.post("/heavy/select/mental", params);
};

export const mentaldelete = (params: any) => {
  return requests.get("/heavy/delete/by/id", params);
};



/**
 * 微生物
 * @param params
 * @returns
 */

export const organismget = (params: any) => {
  return requests.post("/heavy/select/organism", params);
};

export const organismdelete = (params: any) => {
  return requests.get("/heavy/delete/by/id", params);
};



/**
 * 酸碱度
 * @param params
 * @returns
 */
export const phget = (params: any) => {
  return requests.post("/heavy/select/ph", params);
};

export const phdelete = (params: any) => {
  return requests.get("/heavy/delete/by/id", params);
};



/**
 * 放射元素
 * @param params
 * @returns
 */

export const radiationget = (params: any) => {
  return requests.post("/heavy/select/radiation", params);
};

export const radiationdelete = (params: any) => {
  return requests.get("/heavy/delete/by/id", params);
};
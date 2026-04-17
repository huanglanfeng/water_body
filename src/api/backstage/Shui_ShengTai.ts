import requests from "@/utils/request";

/**
 * 溶解盐
 * @param params
 * @returns
 */
export const saltGet = (params: any) => {
  return requests.get("/aquatic/select", params);
};

export const saltDelete = (params: any) => {
  return requests.get("/aquatic/delete", params);
};

/**
 * 水溶物
 * @param params
 * @returns
 */

export const waterGet = (params: any) => {
  return requests.get("/aquatic/select", params);
};

export const waterDelete = (params: any) => {
  return requests.get("/aquatic/delete", params);
};


/**
 * 放射性元素
 * @param params
 * @returns
 */

export const elementGet = (params: any) => {
  return requests.get("/aquatic/select", params);
};

export const elementDeldte = (params: any) => {
  return requests.get("/aquatic/delete", params);
};



/**
 * 微生物
 * @param params
 * @returns
 */

export const organismGet = (params: any) => {
  return requests.get("/aquatic/select", params);
};

export const organismDeldte = (params: any) => {
  return requests.get("/aquatic/delete", params);
};



/**
 * 重金属
 * @param params
 * @returns
 */

export const mentalGet = (params: any) => {
  return requests.get("/aquatic/select", params);
};

export const mentalDeldte = (params: any) => {
  return requests.get("/aquatic/delete", params);
};
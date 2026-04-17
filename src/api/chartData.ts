import requests from "@/utils/request";
const beforeUrl = "http://gallery.echartsjs.com";

export const getMapData = (url: string, params?: any) => {
  return requests.get(beforeUrl + url, params);
};

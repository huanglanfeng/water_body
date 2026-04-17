import requests from "@/utils/request";

export const equipmentGet = (params: any) => {
  return requests.post("/device/select/device/data", params);
};

export const sb_add01 = (data: any) => {
  return requests.post("/Facility/add", data);
};

export const equitmentDelete = (params: any) => {
  return requests.get("/device/delete/device/data", params);
};

export const sb_update01 = (data: any) => {
  return requests.post("/Facility/update", data);
};

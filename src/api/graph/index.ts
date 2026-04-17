import requests from "@/utils/request";

//水体趋势

//区域数据
export const zoneData = (data: any) => {
    return requests.post("/addressdata/select/address/data", data); //请求端口
};

//地图窗口
export const camera = (data: any) => {
    return requests.post("/device/select/site/camera", data);
};

export const sensor = (data: any) => {
    return requests.post("/device/select/site/sensor", data);
};

//发展趋势
export const develop = (data: any) => {
    return requests.post("/addressdata/select/percent", data);
};

//历史记录
export const history = (data: any) => {
    return requests.post("/addressdata/select/level", data);
};




//水体检测

//水体温度,水量，ph
export const waterdata = (data: any) => {
    return requests.post("/waterdata/select/water/data", data);
};

//浊度检测
export const ditydata = (data: any) => {
    return requests.post("/turbidity/select/turbidity/data", data);
};

//元素、溶解氧检测
export const element_O = (data: any) => {
    return requests.post("/dissolvedOxygen/select/element/and/dissolve", data);
};

//警告预警
export const warning = (data: any) => {
    return requests.post("/addressdata/select/warning", data);
}




//总体展示

//气体检测
export const gas = (data: any) => {
    return requests.post("/gas/select/gas", data);
};

//预警
export const focewarning = (data: any) => {
    return requests.post("/heavy/select/heavy/content", data);
};

//反馈
export const feedback = (data: any) => {
    return requests.post("/user/select/feedback", data);
};

//地区切换
export const addressSelectGet = (data: any) => {
    return requests.post('/addressdata/get/site/by/waterQualityParameters', data);
}

export const addressSelect = (data: any) => {
    return requests.get('/addressdata/get/warning/screen', data);
}

//tab 污水检测
export const tabData = (data: any) => {
    return requests.get('/addressdata/get/water/amount', data);
}
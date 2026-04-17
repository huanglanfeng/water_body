import requests from "@/utils/request";

// 水质识别结果类型定义
export interface IdentifyResult {
  id: number;
  siteName: string;
  identifyTime: string;
  classifyResult: string;
  confidence: number;
  pollutants: string;
  model: string;
  indicators?: Record<string, string>;
}

// 趋势数据类型定义
export interface TrendData {
  dates: string[];
  sites: {
    name: string;
    data: number[];
  }[];
}

// 模型信息类型定义
export interface ModelInfo {
  name: string;
  version: string;
  trainingData: string;
  accuracy: string;
  updateTime: string;
}

/**
 * 获取水质识别结果列表
 */
export const getIdentifyResults = (params?: any) => {
  return requests.get("/water/identify/results", { params });
};

/**
 * 获取识别趋势数据
 */
export const getIdentifyTrend = (params?: any) => {
  return requests.get("/water/identify/trend", { params });
};

/**
 * 获取模型信息
 */
export const getModelInfo = () => {
  return requests.get("/water/identify/model-info");
};

/**
 * 获取站点详情
 * @param siteId 站点ID
 */
export const getSiteDetail = (siteId: number) => {
  return requests.get(`/water/identify/site/${siteId}`);
};

/**
 * 手动触发识别
 * @param siteId 站点ID
 */
export const triggerIdentify = (siteId: number) => {
  return requests.post("/water/identify/trigger", { siteId });
};

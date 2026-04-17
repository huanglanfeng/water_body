import requests from "@/utils/request";

/**
 * 预警配置数据类型
 */
export interface WarningThresholdItem {
  id: string;
  name: string;
  normalMin: number | null;
  normalMax: number | null;
  warningMin: number | null;
  warningMax: number | null;
  unit: string;
  enabled: boolean;
}

export interface WarningLevel {
  id: number;
  name: string;
  triggerCondition: string;
  color: string;
}

export interface NotificationConfig {
  systemNotify: boolean;
  emailNotify: boolean;
  emailAddress: string;
  smsNotify: boolean;
  phoneNumber: string;
}

export interface WarningConfigData {
  thresholds: WarningThresholdItem[];
  levels: WarningLevel[];
  notification: NotificationConfig;
}

/**
 * 获取预警配置
 * @returns Promise<WarningConfigData>
 */
export const getWarningConfig = (): Promise<any> => {
  return requests.get("/warning/config");
};

/**
 * 保存预警配置
 * @param data WarningConfigData
 * @returns Promise<any>
 */
export const saveWarningConfig = (data: WarningConfigData): Promise<any> => {
  return requests.post("/warning/config/save", data);
};

/**
 * 重置为默认配置
 * @returns Promise<any>
 */
export const resetWarningConfig = (): Promise<any> => {
  return requests.post("/warning/config/reset");
};

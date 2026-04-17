import requests from "@/utils/request";

// 边缘节点数据类型
export interface EdgeNode {
  id: string;
  name: string;
  station: string;
  status: string;
  ip: string;
  lastReport: string;
  frequency: string;
  runtime: string;
  cpu: number;
  memory: number;
  disk: number;
  data: {
    temperature: number | string;
    pH: number | string;
    dissolvedOxygen: number | string;
    turbidity: number | string;
    reportTime: string;
  };
}

// 边缘计算任务数据类型
export interface EdgeTask {
  name: string;
  nodes: string;
  type: string;
  frequency: string;
  status: string;
  description: string;
}

// 统计数据类型
export interface EdgeStatistics {
  totalNodes: number;
  onlineNodes: number;
  offlineNodes: number;
  reportRate: number;
}

// 模拟数据
const mockEdgeNodes: EdgeNode[] = [
  {
    id: 'E001',
    name: '瑶湖监测节点',
    station: '瑶湖',
    status: '在线',
    ip: '192.168.1.101',
    lastReport: '2026-04-17 10:30:00',
    frequency: '5秒/次',
    runtime: '15天6小时',
    cpu: 45,
    memory: 62,
    disk: 38,
    data: {
      temperature: 23.5,
      pH: 7.2,
      dissolvedOxygen: 8.3,
      turbidity: 12.5,
      reportTime: '10:30:00'
    }
  },
  {
    id: 'E002',
    name: '青山湖监测节点',
    station: '青山湖',
    status: '在线',
    ip: '192.168.1.102',
    lastReport: '2026-04-17 10:29:55',
    frequency: '5秒/次',
    runtime: '12天3小时',
    cpu: 38,
    memory: 55,
    disk: 42,
    data: {
      temperature: 22.8,
      pH: 7.0,
      dissolvedOxygen: 7.8,
      turbidity: 15.2,
      reportTime: '10:29:55'
    }
  },
  {
    id: 'E003',
    name: '赣江监测节点',
    station: '赣江',
    status: '在线',
    ip: '192.168.1.103',
    lastReport: '2026-04-17 10:29:50',
    frequency: '10秒/次',
    runtime: '20天12小时',
    cpu: 52,
    memory: 68,
    disk: 55,
    data: {
      temperature: 21.2,
      pH: 6.8,
      dissolvedOxygen: 9.1,
      turbidity: 8.6,
      reportTime: '10:29:50'
    }
  },
  {
    id: 'E004',
    name: '艾溪湖监测节点',
    station: '艾溪湖',
    status: '在线',
    ip: '192.168.1.104',
    lastReport: '2026-04-17 10:29:45',
    frequency: '5秒/次',
    runtime: '8天18小时',
    cpu: 35,
    memory: 48,
    disk: 30,
    data: {
      temperature: 24.1,
      pH: 7.4,
      dissolvedOxygen: 7.5,
      turbidity: 18.3,
      reportTime: '10:29:45'
    }
  },
  {
    id: 'E005',
    name: '抚河监测节点',
    station: '抚河',
    status: '在线',
    ip: '192.168.1.105',
    lastReport: '2026-04-17 10:29:40',
    frequency: '5秒/次',
    runtime: '5天9小时',
    cpu: 42,
    memory: 58,
    disk: 35,
    data: {
      temperature: 22.5,
      pH: 7.1,
      dissolvedOxygen: 8.0,
      turbidity: 10.8,
      reportTime: '10:29:40'
    }
  },
  {
    id: 'E006',
    name: '鄱阳湖监测节点',
    station: '鄱阳湖',
    status: '离线',
    ip: '192.168.1.106',
    lastReport: '2026-04-17 09:15:00',
    frequency: '10秒/次',
    runtime: '-',
    cpu: 0,
    memory: 0,
    disk: 0,
    data: {
      temperature: '-',
      pH: '-',
      dissolvedOxygen: '-',
      turbidity: '-',
      reportTime: '-'
    }
  }
];

const mockEdgeTasks: EdgeTask[] = [
  {
    name: '数据清洗',
    nodes: 'E001-E006',
    type: '预处理',
    frequency: '实时',
    status: '运行中',
    description: '对采集的水质数据进行去噪、异常值过滤等预处理操作'
  },
  {
    name: '特征提取',
    nodes: 'E001-E006',
    type: '分析',
    frequency: '1分钟/次',
    status: '运行中',
    description: '从原始数据中提取水质变化趋势、周期性特征等关键指标'
  },
  {
    name: '异常检测',
    nodes: 'E001-E006',
    type: '检测',
    frequency: '实时',
    status: '运行中',
    description: '实时检测水质参数异常，触发预警机制'
  },
  {
    name: '数据压缩',
    nodes: 'E001-E006',
    type: '优化',
    frequency: '5分钟/次',
    status: '运行中',
    description: '对历史数据进行压缩存储，减少传输带宽占用'
  }
];

const mockStatistics: EdgeStatistics = {
  totalNodes: 6,
  onlineNodes: 5,
  offlineNodes: 1,
  reportRate: 98.5
};

/**
 * 获取边缘节点列表
 * @returns Promise<EdgeNode[]>
 */
export const getEdgeNodes = (): Promise<{ data: EdgeNode[] }> => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockEdgeNodes });
    }, 300);
  });
  // 实际API调用
  // return requests.get("/edge/nodes");
};

/**
 * 获取边缘节点详情
 * @param id 节点ID
 * @returns Promise<EdgeNode>
 */
export const getEdgeNodeDetail = (id: string): Promise<{ data: EdgeNode | undefined }> => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      const node = mockEdgeNodes.find(n => n.id === id);
      resolve({ data: node });
    }, 200);
  });
  // 实际API调用
  // return requests.get(`/edge/node/${id}`);
};

/**
 * 获取边缘计算任务列表
 * @returns Promise<EdgeTask[]>
 */
export const getEdgeTasks = (): Promise<{ data: EdgeTask[] }> => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockEdgeTasks });
    }, 300);
  });
  // 实际API调用
  // return requests.get("/edge/tasks");
};

/**
 * 获取边缘计算统计数据
 * @returns Promise<EdgeStatistics>
 */
export const getEdgeStatistics = (): Promise<{ data: EdgeStatistics }> => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockStatistics });
    }, 200);
  });
  // 实际API调用
  // return requests.get("/edge/statistics");
};

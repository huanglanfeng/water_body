import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
  const asyncMenu = [
    {
      path: "/ShouYe",
      meta: { label: "首页", roles: [], type: "1", icon: 'dashboard' },
      component: "ShouYe",
    },
    {
      path: "/data",
      name: "",
      meta: { label: "数据统计", roles: [], type: "2", icon: 'baobiao' },
      component: "data",
      children: [
        {
          path: "/Shui_ShengTai",
          meta: { label: "水生态管理", roles: [], icon: 'shuishengtai' },
          component: "Shui_ShengTai",
        },
        {
          path: "/EarlyWarning",
          meta: { label: "预警详情", roles: [], icon: 'yujing' },
          component: "EarlyWarning",
        },
        {
          path: "/WarningConfig",
          meta: { label: "预警设置", roles: [], icon: 'yujing' },
          component: "WarningConfig",
        },
        {
          path: "/shibie",
          meta: { label: "监控录像", roles: [], icon: 'jiankong' },
          component: "shibie",
        },
      ],
    },
    {
      path: "/UserAdmin",
      meta: { label: "用户管理", roles: [], type: "1", icon: 'personal' },
      component: "UserAdmin",
    },
    {
      path: "/shebei",
      meta: { label: "设备管理", roles: [], type: "1", icon: 'shebei' },
      component: "shebei",
    },
    {
      path: "/EdgeCompute",
      meta: { label: "边缘计算", roles: [], type: "1", icon: 'chuangzhi' },
      component: "EdgeCompute",
    },
    {
      path: "/WaterIdentify",
      meta: { label: "水质识别", roles: [], type: "1", icon: 'shibie' },
      component: "WaterIdentify",
    },
    {
      path: "/system",
      name: "",
      meta: { label: "系统管理", roles: [], type: "2", icon: 'system' },
      component: "system",
      children: [
        {
          path: "/perimission",
          meta: { label: "权限管理", roles: [], icon: 'xuke' },
          component: "permission",
        },
        {
          path: "/role",
          meta: { label: "角色管理", roles: [] },
          component: "role",
        },
        {
          path: "/user",
          meta: { label: "用户管理", roles: [] },
          component: "user",
        },
        {
          path: "/notice",
          meta: { label: "公告管理", roles: [], icon: 'dashboard' },
          component: "notice",
        },
      ],
    },
    {
      path: "/personal",
      meta: { label: "个人中心", roles: [], type: "1", icon: 'personal' },
      component: "personal",
    },
  ];

  return {
    asyncMenu,
  };
});

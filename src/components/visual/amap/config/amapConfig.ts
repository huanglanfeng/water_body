//边界线配置
export const polylineConfig = {
  show: true,
  showOuter: true,
  strokeColor: "#99ffff",
  strokeWeight: 4,
};

//卫星地图配置
export const satelliteConfig = {
  //是否展示卫星地图
  isShowStatellite: true,
  //是否展示卫星路网
  isShowRoadNet: true,
};

//楼块图层配置
export const buildingConfig = {
  isShow: false,
};

export const mapOptionConfig = {
  mapStyle: "",
  center: [116.680317, 29.133105],
  doubleClickZoom: true,
  zoom: 20,
  zooms: [15, 20],
  // viewMode: '3D',
};

//3D配置
export const threeDConfig = {
  isShow3D: true,
  pitch: 45,
  controlBarConfig: {
    show: false,
    showZoomBar: true,
    showCOntrolButton: true,
    positionTop: 10,
    positionRight: 10,
  },

  object3dWallConfig: {
    show: false,
    zIndex: 1,
    wallHeight: -4000,
    color: "#0088ffcc",
    transparent: true,
    backOrFront: "both",
  },
};

// import AMapLoader from "@amap/amap-jsapi-loader";

// AMapLoader.load({
//   key: import.meta.env.VITE_AMAP_KEY,
//   version: "1.4.15",
//   plugins: ['AMap.DistrictSearch', 'AMap.ControlBar', 'AMap.TileLayer', 'AMap.Object3DLayer'],// 你所使用到的插件
// }).then((AMap) => {

// });

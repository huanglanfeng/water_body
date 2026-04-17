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

export const mapOptionConfig = {
  mapStyle: "amap://styles/darkblue",
  center: [116.262312, 28.433927],
  doubleClickZoom: true,
  zoom: 8.5,
  //  zooms: [],
  // viewMode: '3D',
};

export const threeDConfig = {
  isShow3D: true,
  pitch: 40,
  controlBarConfig: {
    show: true,
    showZoomBar: true,
    showCOntrolButton: true,
    positionTop: 10,
    positionRight: 10,
  },

  object3dWallConfig: {
    show: true,
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

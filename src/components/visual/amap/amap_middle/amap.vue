<template>
  <div id="map"></div>
  <div v-if="mapLoadError" class="map-error">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(0,229,255,0.4)" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <p>地图加载失败</p>
    <span>请检查网络连接或API Key配置</span>
  </div>
  <div v-show="false" class="info">
    <infoWindowVue ref="infoRef" :close="close!"></infoWindowVue>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { polylineConfig, satelliteConfig, mapOptionConfig, threeDConfig} from "@/components/visual/amap/config/amapConfig";
import infoWindowVue from "./infoWindow/infoWindow.vue";
import icon02 from "@/assets/image/location3.png";
import { ElLoading } from "element-plus";

const mapInstance = ref(null);
const mapLoadError = ref(false);
const close = ref<Function>();
const infoRef = ref<InstanceType<typeof infoWindowVue>>();

// PathSimplifier 初始化（必须在地图创建之后调用）
const initPathSimplifier = () => {
  //@ts-ignore
  AMapUI.load(
    ["ui/misc/PathSimplifier", "lib/$"],
    function (PathSimplifier: any, $: any) {
      if (!PathSimplifier || !PathSimplifier.supportCanvas) {
        console.warn('PathSimplifier 不可用');
        return;
      }
      if (!mapInstance.value) {
        console.warn('地图实例不存在，跳过 PathSimplifier 初始化');
        return;
      }

      var colors = [
        "#3366cc", "#dc3912", "#ff9900", "#109618",
        "#990099", "#0099c6", "#dd4477", "#66aa00",
        "#b82e2e", "#316395", "#994499", "#22aa99",
        "#aaaa11", "#6633cc", "#e67300", "#8b0707",
        "#651067", "#329262", "#5574a6", "#3b3eac",
      ];

      var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        map: mapInstance.value || null,
        getPath: function (pathData: any, pathIndex: any) {
          return pathData.path;
        },
        getHoverTitle: function (pathData: any, pathIndex: any, pointIndex: any) {
          if (pointIndex >= 0) {
            return pathData.name + "，点：" + pointIndex + "/" + pathData.path.length;
          }
          return pathData.name + "，点数量" + pathData.path.length;
        },
        renderOptions: {
          pathLineStyle: { dirArrowStyle: true },
          getPathStyle: function (pathItem: any, zoom: any) {
            var color = colors[pathItem.pathIndex % colors.length];
            var lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));
            return {
              pathLineStyle: { strokeStyle: color, lineWidth: lineWidth },
              pathLineSelectedStyle: { lineWidth: lineWidth + 2 },
              pathNavigatorStyle: { fillStyle: color },
            };
          },
        },
      });

      $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);

      $.getJSON(
        "https://a.amap.com/amap-ui/static/data/big-routes.json",
        function (d: any[]) {
          $("#loadingTip").remove();
          var flyRoutes: never[] = [];
          for (var i = 0, len = d.length; i < len; i++) {
            if (d[i].name.indexOf("乌鲁木齐") >= 0) {
              d.splice(i, 0, {
                name: "飞行 - " + d[i].name,
                path: PathSimplifier.getGeodesicPath(d[i].path[0], d[i].path[d[i].path.length - 1], 100),
              });
              i++;
              len++;
            }
          }
          d.push.apply(d, flyRoutes);
          pathSimplifierIns.setData(d);

          function onload() { pathSimplifierIns.renderLater(); }
          function onerror(e: any) { console.warn('巡航图标加载失败'); }

          var navg0 = pathSimplifierIns.createPathNavigator(1, { loop: true, speed: 500000 });
          navg0.start();

          var navg2 = pathSimplifierIns.createPathNavigator(7, {
            loop: true, speed: 500000,
            pathNavigatorStyle: {
              width: 16, height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent("./imgs/car.png", onload, onerror),
              strokeStyle: null, fillStyle: null,
            },
          });
          navg2.start();

          var navg3 = pathSimplifierIns.createPathNavigator(5, {
            loop: true, speed: 500000,
            pathNavigatorStyle: {
              autoRotate: false, pathLinePassedStyle: null,
              width: 24, height: 24,
              content: PathSimplifier.Render.Canvas.getImageContent("./imgs/car-front.png", onload, onerror),
              strokeStyle: null, fillStyle: null,
            },
          });
          navg3.start();
        }
      );
    }
  );
};

// 初始化地图
const initMapInstance = (AMap: any) => {
  const option: { [key: string]: any } = {
    rotateEnable: true,
    pitchEnable: true,
    zoom: 15,
    pitch: 65,
    rotation: 80,
    viewMode: '3D',
    zooms: [2, 20],
    center: [116.028587, 28.686399],
    terrain: true,
    layers: [new AMap.TileLayer()],
  };

  const district = new AMap.DistrictSearch({
    level: "city",
    extensions: "all",
    subdistrict: 1,
  });

  const render3dWall = (bounds: any[] = []) => {
    if (threeDConfig.object3dWallConfig.show && mapInstance.value) {
      const object3dlayer = new AMap.Object3DLayer({ zIndex: threeDConfig.object3dWallConfig.zIndex });
      const wall = new AMap.Object3D.Wall({
        path: bounds,
        height: threeDConfig.object3dWallConfig.wallHeight,
        color: threeDConfig.object3dWallConfig.color,
      });
      wall.transparent = threeDConfig.object3dWallConfig.transparent;
      wall.backOrFront = threeDConfig.object3dWallConfig.backOrFront;
      object3dlayer.add(wall);
      (mapInstance.value as any).add(object3dlayer);
    }
  };

  const renderControlBar = () => {
    if (threeDConfig.controlBarConfig.show && mapInstance.value) {
      (mapInstance.value as any).addControl(
        new AMap.ControlBar({
          showZoomBar: threeDConfig.controlBarConfig.showZoomBar,
          showControlButton: threeDConfig.controlBarConfig.showCOntrolButton,
          position: {
            right: `${threeDConfig.controlBarConfig.positionRight}px`,
            top: `${threeDConfig.controlBarConfig.positionTop}px`,
          },
        })
      );
    }
  };

  district.search("南昌", function (status: any, result: any) {
    if (!result || !result.districtList || result.districtList.length === 0) {
      console.warn('DistrictSearch 未找到南昌区域数据');
      mapLoadError.value = true;
      return;
    }
    const bounds = result.districtList[0].boundaries;
    if (!bounds || bounds.length === 0) {
      console.warn('DistrictSearch boundaries 为空');
      mapLoadError.value = true;
      return;
    }

    if (threeDConfig.isShow3D) {
      option.viewMode = "3D";
    }

    // ★ 先创建地图
    mapInstance.value = new AMap.Map("map", option);

    // 设置标记点
    const positions = [
      [116.028587, 28.686399],
      [116.029692, 28.692058],
      [116.030852, 28.679626],
      [116.040101, 28.688608],
      [116.018805, 28.680016],
      [115.98904, 28.697785],
    ];
    positions.forEach((v) => {
      let marker = new AMap.Marker({ position: v, icon: icon02 });
      (mapInstance.value as any).add(marker);
      AMap.event.addListener(marker, "click", function () {
        let infoWindow = new AMap.InfoWindow({
          isCustom: true,
          content: infoRef.value?.infoRef,
          offset: new AMap.Pixel(16, -45),
        });
        infoWindow.open(mapInstance.value, marker.getPosition());
      });
    });

    // 多边形
    var polygonArr1 = [
      [116.038756, 28.695503], [116.039722, 28.695847],
      [116.042124, 28.686183], [116.0389, 28.686723],
    ];
    var polygon = new AMap.Polygon({
      path: polygonArr1,
      strokeColor: "#FF33FF", strokeOpacity: 0.2, strokeWeight: 3,
      fillColor: "red", fillOpacity: 0.35,
    });
    (mapInstance.value as any).add(polygon);

    close.value = () => { (mapInstance.value as any).clearInfoWindow(); };

    // 区域描边
    if (polylineConfig.show) {
      for (let i = 0; i < bounds.length; i++) {
        new AMap.Polyline({
          path: bounds[i],
          strokeColor: polylineConfig.strokeColor,
          strokeWeight: polylineConfig.strokeWeight,
          map: mapInstance.value,
        });
      }
    }
    render3dWall(bounds);
    renderControlBar();

    // ★ 地图创建完成后再初始化 PathSimplifier
    initPathSimplifier();
  });
};

const loadAMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: "1.4.15",
    plugins: [
      "AMap.DistrictSearch", "AMap.ControlBar", "AMap.TileLayer",
      "AMap.Object3DLayer", "AMap.Polygon", "AMap.PolyEditor",
      "AMap.Driving", "AMap.MoveAnimation",
    ],
    Loca: { version: "1.3.2" },
    AMapUI: { version: "1.1", plugins: ["misc/PathSimplifier"] },
  })
    .then((AMap) => {
      initMapInstance(AMap);
    })
    .catch((error) => {
      console.error("地图加载失败:", error);
      mapLoadError.value = true;
    });
};

onMounted(() => {
  loadAMap();
});
</script>

<style lang="less" scoped>
#map {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.map-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
    margin: 0;
  }
  span {
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
  }
}
</style>

<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  polylineConfig,
  satelliteConfig,
  mapOptionConfig,
  threeDConfig,
} from "./AMapConfig";
import { useBrowserLocation } from "@vueuse/core";

const mapInstance = ref(null);
// const AMapInstance = ref()

// 初始化地图
const initMapInstance = (AMap: any) => {
  // 生成地图的参数，具体可详见高德api文档
  const option: { [key: string]: any } = {
    mapStyle: mapOptionConfig.mapStyle,
    center: mapOptionConfig.center,
    doubleClickZoom: mapOptionConfig.doubleClickZoom,
    zoom: 8.5,
    //  zooms: [],
    layers: [],
    // viewMode: '3D',
    //mask: null,
  };
  // 初始化district对象
  const district = new AMap.DistrictSearch({
    level: "city",
    extensions: "all",
    subdistrict: 1,
  });

  const render3dWall = (bounds = []) => {
    if (threeDConfig.object3dWallConfig.show) {
      const object3dlayer = new AMap.Object3DLayer({
        zIndex: threeDConfig.object3dWallConfig.zIndex,
      });

      const wall = new AMap.Object3D.Wall({
        path: bounds,
        height: threeDConfig.object3dWallConfig.wallHeight,
        color: threeDConfig.object3dWallConfig.color,
      });

      wall.transparent = threeDConfig.object3dWallConfig.transparent;
      wall.backOrFront = threeDConfig.object3dWallConfig.backOrFront;
      object3dlayer.add(wall);
      if (mapInstance.value) {
        (mapInstance.value as any).add(object3dlayer);
      }
    }
  };

  const renderControlBar = () => {
    if (threeDConfig.controlBarConfig.show) {
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
    // console.log(status);
    // console.log(result);

    const bounds = result.districtList[0].boundaries;
    // 获取区域各坐标
    const mask = [];
    for (let i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]]);
    }

    // options中设置mask，超出mask的区域就不显示
    //n option.mask = bounds;
    // console.log(bounds, 'bounds');
    // console.log(mask, 'mask');

    if (threeDConfig.isShow3D) {
      option.viewMode = "3D";
    }

    //卫星路网配置
    if (satelliteConfig.isShowStatellite) {
      option.layers.push(new AMap.TileLayer.Satellite());
    }
    if (satelliteConfig.isShowRoadNet) {
      option.layers.push(new AMap.TileLayer.RoadNet({}));
    }
    console.log(option, "option");
    mapInstance.value = new AMap.Map("map", option);

    //区域描边
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
  });

  // option.mask = mask
};

const loadAMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: "1.4.15",
    plugins: [
      "AMap.DistrictSearch",
      "AMap.ControlBar",
      "AMap.TileLayer",
      "AMap.Object3DLayer",
    ], // 你所使用到的插件
    Loca: {
      version: "1.3.2",
    },
  }).then((AMap) => {
    //  AMapInstance.value = AMap
    initMapInstance(AMap);
  });
};

onMounted(() => {
  loadAMap();
});
</script>

<style lang="less" scoped>
#map {
  height: 100vh;
  width: 100vw;
}

.amap-container {
  background-image: unset;
}
</style>

<template>
  <div id="map"></div>
  <div v-show="false" class="info">
    <infoWindowVue ref="infoRef" :close="close!"></infoWindowVue>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { polylineConfig, satelliteConfig, mapOptionConfig, threeDConfig} from "@/components/visual/amap/config/amapConfig";
import infoWindowVue from "./infoWindow/infoWindow.vue";
import icon02 from "@/assets/image/location3.png";
import { ElLoading } from "element-plus";

const mapInstance = ref(null);

const close = ref<Function>();

const infoRef = ref<InstanceType<typeof infoWindowVue>>();

const test = () => {};

// 初始化地图
const initMapInstance = (AMap: any) => {
  // 生成地图的参数，具体可详见高德api文档
  const option: { [key: string]: any } = {

    rotateEnable: true,//是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标画圈移动
    pitchEnable: true, // 是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标上下移动
    zoom: 15, //初始化地图层级
    pitch: 65, // 地图俯仰角度，有效范围 0 度- 83 度
    rotation: 80,//初始地图顺时针旋转的角度
    viewMode: '3D', //开启3D视图,默认为关闭
    zooms: [2, 20],//地图显示的缩放级别范围
    center: [116.028587, 28.686399],//初始地图中心经纬度
    terrain: true, // 开启地形图

    // mapStyle: mapOptionConfig.mapStyle,
    // 隐藏默认楼块
    // features: ['bg', 'road', 'point'],
    // mapStyle: 'amap://styles/light',
    // mapStyle: 'amap://styles/dark',
    layers: [
      // 高德默认标准图层
      // new AMap.TileLayer.Satellite(),
      new AMap.TileLayer(),
      // 楼块图层
      // new AMap.Buildings({
      //   zooms: [16, 18],
      //   zIndex: 10,
      //   heightFactor: 5//2倍于默认高度，3D下有效
      // })
    ],
    //   initLoadMap() {
    //   this.styleType = 'Satellite';
    //   // 切换地图样式
    //   this.layers = new AMap.TileLayer.Satellite({ map: this.mapObj });
    //   this.layers && this.layers.show();
    // },

    //     changeMapStyle() {
    //   if (this.styleType === 'default') {
    //     this.initLoadMap();
    //   } else {
    //     this.layers.hide();
    //     this.styleType = 'default';
    //   }
    //   this.mapObj.remove(this.markerList);
    //   this.setMarker();
    // },
  };

  // var infoWindow;
  // function showInfoOpen() {
  //   var text = '您打开了信息窗体！'
  //   document.querySelector("#text").innerText = text;
  // }
  // function showInfoClose() {
  //   var text = '您关闭了信息窗体！'
  //   document.querySelector("#text").innerText = text;
  // }
  // //在指定位置打开信息窗体
  // function openInfo() {
  //   //构建信息窗体中显示的内容
  //   var info = [];
  //   info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
  //   info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
  //   info.push("电话 : 010-84107000   邮编 : 100102");
  //   info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
  //   infoWindow = new AMap.InfoWindow({
  //     content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
  //   });
  //   infoWindow.on('open', showInfoOpen)
  //   infoWindow.on('close', showInfoClose)
  //   infoWindow.open(map, map.getCenter());

  // }
  // function closeInfo() {
  //   infoWindow.close();
  // }

  // // 给按钮绑定事件
  // document.getElementById("clickOn").onclick = openInfo;
  // document.getElementById("clickOff").onclick = closeInfo;

  
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
    const bounds = result.districtList[0].boundaries;
    // 获取区域各坐标
    const mask = [];
    for (let i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]]);
    }

    if (threeDConfig.isShow3D) {
      option.viewMode = "3D";
    }

    //卫星路网配置
    // if (satelliteConfig.isShowStatellite) {
    //   option.layers.push(new AMap.TileLayer.Satellite());
    // }
    //路况图
    // if (satelliteConfig.isShowRoadNet) {
    //   option.layers.push(new AMap.TileLayer.RoadNet({}));
    // }
    mapInstance.value = new AMap.Map("map", option);

    //设置标记点
    const setMarker = async () => {
      const positions = [
        [116.028587, 28.686399], //南昌工程学院
        [116.029692, 28.692058], //南昌工程学院
        [116.030852, 28.679626], //江西师范大学
        [116.040101, 28.688608], //瑶湖
        [116.018805, 28.680016], //江科
        [115.98904, 28.697785], //鱼尾洲
      ];
      positions.forEach(async (v) => {
        let marker: any = await new AMap.Marker({
          position: v,
          icon: icon02,
        });
        (mapInstance.value as any).add(marker);
        AMap.event.addListener(marker, "click", function () {
          let infoWindow = InfoWindow();
          infoWindow.open(mapInstance.value, marker.getPosition());
        });
      });
    };
    setMarker();

    // var lineArr = [
    //   [116.028587, 28.686399], //南昌工程学院
    //   [116.029692, 28.692058], //南昌工程学院
    //   [116.030852, 28.679626], //江西师范大学
    //   [116.040101, 28.688608],
    // ];
    // // 构造矢量圆形
    // var circle = new AMap.Circle({
    //   center: lineArr[0],          //设置线覆盖物路径
    //   radius: 1500,
    //   strokeColor: "#3366FF", //边框线颜色
    //   strokeOpacity: 0.3,       //边框线透明度
    //   strokeWeight: 3,        //边框线宽
    //   fillColor: "#FFA500", //填充色
    //   fillOpacity: 0.35//填充透明度
    // });
    // (mapInstance.value as any).add(circle);
    var polygonArr = [
      [116.028724, 28.685234],
      [116.028861, 28.68522], 
      [116.028923, 28.685999],
      [116.028684, 28.6861], 
  ];
    var polygonArr1 = [
      [116.038756, 28.695503],
      [116.039722, 28.695847], 
      [116.042124, 28.686183], 
      [116.0389, 28.686723],
  ];
    var polygon = new AMap.Polygon({
      path: polygonArr1,//设置多边形边界路径
      strokeColor: "#FF33FF", //线颜色
      strokeOpacity: 0.2, //线透明度
      strokeWeight: 3,    //线宽
      fillColor:  "red", //填充色
      fillOpacity: 0.35//填充透明度
    });
    (mapInstance.value as any).add(polygon);

    //信息窗体
    const InfoWindow = () => {
      return new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: infoRef.value?.infoRef,
        offset: new AMap.Pixel(16, -45),
      });
    };

    const closeInfoWindow = () => {
      (mapInstance.value! as any).clearInfoWindow();
    };

    close.value = closeInfoWindow;

    //设置区域
    // function setPolygon(path: any): void {
    //   const polygon: any = new AMap.Polygon({
    //     path: path,
    //     strokeColor: "#FF33FF",
    //     strokeWeight: 6,
    //     strokeOpacity: 0.2,
    //     fillOpacity: 0.4,
    //     fillColor: "#1791fc",
    //     zIndex: 50,
    //   });

    //   (mapInstance.value as any).add(polygon);
    // }

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
};

const loadAMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: "1.4.15",
    plugins: [
      "AMap.DistrictSearch",
      "AMap.ControlBar",
      // "AMap.ToolBar",
      "AMap.TileLayer",
      "AMap.Object3DLayer",
      "AMap.Polygon",
      "AMap.PolyEditor",
      "AMap.Driving",
      "AMap.MoveAnimation",
    ], // 你所使用到的插件
    Loca: {
      version: "1.3.2",
    },
    AMapUI: {
      // 是否加载 AMapUI，缺省不加载
      version: "1.1", // AMapUI 版本
      plugins: ["misc/PathSimplifier"], // 需要加载的 AMapUI ui插件
    },
  })
    .then(async (AMap) => {
      //  AMapInstance.value = AMap
      initMapInstance(AMap);

      //@ts-ignore
      AMapUI.load(
        ["ui/misc/PathSimplifier", "lib/$"],
        function (
          PathSimplifier: {
            new (arg0: {
              zIndex: number;
              //autoSetFitView:false,
              map: null; //所属的地图实例
              getPath: (pathData: any, pathIndex: any) => any;
              getHoverTitle: (
                pathData: any,
                pathIndex: any,
                pointIndex: any
              ) => string;
              renderOptions: {
                pathLineStyle: { dirArrowStyle: boolean };
                getPathStyle: (
                  pathItem: any,
                  zoom: any
                ) => {
                  pathLineStyle: { strokeStyle: string; lineWidth: number };
                  pathLineSelectedStyle: { lineWidth: number };
                  pathNavigatorStyle: { fillStyle: string };
                };
              };
            }): any;
            supportCanvas: any;
            getGeodesicPath: (arg0: any, arg1: any, arg2: number) => any;
            Render: {
              Canvas: {
                getImageContent: (
                  arg0: string,
                  arg1: { (): void; (): void; (): void },
                  arg2: { (e: any): void; (e: any): void; (e: any): void }
                ) => any;
              };
            };
          },
          $: {
            (arg0: string): {
              (): any;
              new (): any;
              appendTo: { (arg0: HTMLElement): void; new (): any };
              remove: { (): void; new (): any };
            };
            (arg0: string): {
              (): any;
              new (): any;
              appendTo: { (arg0: HTMLElement): void; new (): any };
              remove: { (): void; new (): any };
            };
            getJSON: any;
          }
        ) {
          if (!PathSimplifier.supportCanvas) {
            alert("当前环境不支持 Canvas！");
            return;
          }

          //just some colors
          var colors = [
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#990099",
            "#0099c6",
            "#dd4477",
            "#66aa00",
            "#b82e2e",
            "#316395",
            "#994499",
            "#22aa99",
            "#aaaa11",
            "#6633cc",
            "#e67300",
            "#8b0707",
            "#651067",
            "#329262",
            "#5574a6",
            "#3b3eac",
          ];

          var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: mapInstance.value, //所属的地图实例

            getPath: function (pathData, pathIndex) {
              return pathData.path;
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                //point
                return (
                  pathData.name +
                  "，点：" +
                  pointIndex +
                  "/" +
                  pathData.path.length
                );
              }

              return pathData.name + "，点数量" + pathData.path.length;
            },
            renderOptions: {
              pathLineStyle: {
                dirArrowStyle: true,
              },
              getPathStyle: function (pathItem, zoom) {
                var color = colors[pathItem.pathIndex % colors.length],
                  lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));

                return {
                  pathLineStyle: {
                    strokeStyle: color,
                    lineWidth: lineWidth,
                  },
                  pathLineSelectedStyle: {
                    lineWidth: lineWidth + 2,
                  },
                  pathNavigatorStyle: {
                    fillStyle: color,
                  },
                };
              },
            },
          });
          //@ts-ignore
          window.pathSimplifierIns = pathSimplifierIns;

          $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(
            document.body
          );

          $.getJSON(
            "https://a.amap.com/amap-ui/static/data/big-routes.json",
            function (d: any[]) {
              $("#loadingTip").remove();

              var flyRoutes: never[] = [];

              for (var i = 0, len = d.length; i < len; i++) {
                if (d[i].name.indexOf("乌鲁木齐") >= 0) {
                  d.splice(i, 0, {
                    name: "飞行 - " + d[i].name,
                    path: PathSimplifier.getGeodesicPath(
                      d[i].path[0],
                      d[i].path[d[i].path.length - 1],
                      100
                    ),
                  });

                  i++;
                  len++;
                }
              }

              d.push.apply(d, flyRoutes);

              pathSimplifierIns.setData(d);

              //initRoutesContainer(d);

              function onload() {
                pathSimplifierIns.renderLater();
              }

              function onerror(e: any) {
                alert("图片加载失败！");
              }

              //创建一个巡航器
              var navg0 = pathSimplifierIns.createPathNavigator(1, {
                loop: true, //循环播放
                speed: 500000,
              });

              navg0.start();

              var navg2 = pathSimplifierIns.createPathNavigator(7, {
                loop: true,
                speed: 500000,
                pathNavigatorStyle: {
                  width: 16,
                  height: 32,
                  content: PathSimplifier.Render.Canvas.getImageContent(
                    "./imgs/car.png",
                    onload,
                    onerror
                  ),
                  strokeStyle: null,
                  fillStyle: null,
                },
              });

              navg2.start();

              var navg3 = pathSimplifierIns.createPathNavigator(5, {
                loop: true,
                speed: 500000,
                pathNavigatorStyle: {
                  autoRotate: false, //禁止调整方向
                  pathLinePassedStyle: null,
                  width: 24,
                  height: 24,
                  content: PathSimplifier.Render.Canvas.getImageContent(
                    "./imgs/car-front.png",
                    onload,
                    onerror
                  ),
                  strokeStyle: null,
                  fillStyle: null,
                },
              });

              navg3.start();
            }
          );
        }
      );
    })
    .catch((error) => {
      console.log(error, "err");
    });
};

onMounted(() => {
  loadAMap();
  test();
});
</script>

<style lang="less" scoped>
#map {
  height: 70vh;
  width: 46vw;
  top: 1vh;
  left: 0.5vw;
}
</style>

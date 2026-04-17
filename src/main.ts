import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
//引入element组件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "../src/assets/css/reset.css";
import DataVVue3 from "@kjgl77/datav-vue3";
import "echarts-gl";
import "./assets/css/dialog/index.less";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //element图标

import VideoPlayer from "./components/common/VideoPlayer.vue";

import IconFont from "./components/IconFont/IconFont.vue";
import "./assets/iconfont/iconfont.js";

import svgIcon from "./icons/index.vue";

// import 'element-ui/lib/theme-chalk/index.css';//引入UI库

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any);
}

app.component("IconFont", IconFont);
app.component("svg-icon", svgIcon);
app.component("VideoPlayer", VideoPlayer);
app.use(DataVVue3);
app.use(createPinia());
app.use(router);

//element引入
app.use(ElementPlus);
app.mount("#app");

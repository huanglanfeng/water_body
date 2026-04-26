<template>
  <el-carousel :interval="5000" type="card" height="160px">
    <el-carousel-item v-for="(item, index) in images" :key="index">
      <img :src="item" alt="水环境监测" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import image01 from "@/assets/image/worning/005293.jpg";
import image02 from "@/assets/image/worning/005294.jpg";
import image03 from "@/assets/image/worning/005295.jpg";
import image04 from "@/assets/image/worning/005296.jpg";
import image05 from "@/assets/image/worning/005297.jpg";
import image06 from "@/assets/image/worning/005298.jpg";

const images = [image01, image02, image03, image04, image05, image06];
</script>

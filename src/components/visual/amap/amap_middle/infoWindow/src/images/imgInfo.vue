<template>
  <div class="imgInfo">
    <h3>抓拍图片</h3>
    <ul>
      <li>
        <el-image
          :src="img01"
          style="width: 200px; height: 100px"
        ></el-image>
      </li>
      <li>
        <el-image
          :src="img02"
          style="width: 200px; height: 100px"
        ></el-image>
      </li>
      <li>
        <el-image
          :src="img03"
          style="width: 200px; height: 100px"
        ></el-image>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import img01 from "@/assets/map/005293.jpg";
import img02 from "@/assets/map/005294.jpg";
import img03 from "@/assets/map/005295.jpg";
</script>

<style lang="less" scoped>
h3 {
  font-weight: bolder;
  color: aliceblue;
}
</style>

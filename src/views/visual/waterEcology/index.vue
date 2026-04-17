<template>
<div class="content">
  <div class="content_down">
        <div class="top">
          <span>地点：南昌工程学院</span>
          <span>网速：36KB/S</span>
        </div>
      </div>
    <div class="content_top">
      <div class="left">
        <middle></middle>
      </div>
      <div class="right">
        <leftCharts></leftCharts>
      </div>
    </div>

</div>
</template>

<script lang="ts" setup>
import middle from "@/components/visual/waterEcology/src/middle.vue";
import leftCharts from "@/components/visual/waterEcology/src/leftCharts.vue";
</script>

<style lang="less" scoped>
.content{
  .content_top {
  display: flex;
  flex-direction: row;
  margin: 0 15px 0 15px;
  .left{
    margin-right: 10px;
  }
}
.content_down{
  color: aliceblue;
  margin-top: 20px;
  width: 100%;
  height: 250px;
  position: relative;
  top: -50px;
  .top{
    width: 90%;
    margin: 20px 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span{
      font-size: 20px;
    }
  }
}
}
</style>

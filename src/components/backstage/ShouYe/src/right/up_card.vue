<template>
  <div class="content">
    <el-card class="card2">
      <div style="position: relative">
        <img :src="bg2" alt="" style="width: 100%; height: 100%; display: block;" />
        <div class="data">
          <h1>累计在线时长</h1>
          <span> 125 </span>
          小时
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import bg2 from "@/assets/image/report-count.png";
</script>

<style lang="less" scoped>
:deep(.el-card__body) {
  padding: 0;
  margin: 0;
}

.data {
  position: absolute;
  bottom: 15%;
  color: rgb(234, 237, 240);
  left: 15%;

  h1 {
    font-size: 25px;
    margin-bottom: 10px;
  }

  span {
    color: aqua;
    font-size: 26px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .font {
    height: 40px;
    // background-color: aliceblue;
  }

  .card2 {
    height: auto;
    width: 100%;
    margin: 10px;
    border-radius: 5%;
  }
}
</style>

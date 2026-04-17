<template>
  <div class="warn-item">
    <div class="top">
        <span style="margin-left: 10px"> 编号：{{ props.id }} </span>
        <span style="margin-left: 100px"> 监测值：{{ value + "mg/L" }} </span>
    </div>
    <div class="mid">
      <span>
        {{ rank+"警告" }}
      </span>
      <h1>
        {{ chemical }}
      </h1>
    </div>
    <div class="bot">
      <component is="Location" class="icon"></component>
      <span>
        {{ addr }}
      </span>
      <label>
          {{ date }}
        </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface prop {
  chemical?: string;
  value?: number;
  date?: string;
  rank: string;
  addr: string;
  id: number;
}

const props = withDefaults(defineProps<prop>(), {
  chemical: "高锰酸钾",
  value: 0,
  date: "2023.04.15/14:56",
  rank: "一级",
  addr: "sdvfvrtgtrt",
  id: 0,
});
</script>

<style lang="less" scoped>
.warn-item {
  border: 2px solid rgb(121, 117, 110);
  .mid {
    display: flex;
    h1 {
      background-color: rgba(39, 142, 210, 0.566);
      line-height: 30px;
      height: 30px;
      font-size: 20px;
      color: aliceblue;
    }
    span {
      background-color: red;
      height: 20px;
      line-height: 20px;
      border-radius: 10%;
      font-weight: 600;
      margin: 5px 50px 5px 10px;
    }
  }

  .top {
    margin-top: 5px;
    margin-bottom: 10px;
    span {
      color: rgb(20, 206, 206);
      font-size: 15px;
    }
  }

  .bot {
    color: white;
    margin: 5px 10px 3px 10px;
    span{
      position: relative;
      top:-5px
    }
    .icon {
      height: 20px;
      color: aliceblue;
    }
    label{
      position: relative;
      top:-5px;
      left: 80px;
    }
  }
}
</style>

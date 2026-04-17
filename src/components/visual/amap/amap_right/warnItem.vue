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
      <span>
        <component is="Location" class="icon"></component>
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
  border: 1px solid rgb(47, 100, 72);
  margin: 0px 0 3px 0;
  .top {
    margin: 10px 10px 10px 0;
    display: flex;
    justify-content: space-between;
    span {
      color: rgb(63, 227, 227);
      font-size: 16px;
    }
  }
  .mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: rgba(255, 255, 0, 0.938);
      font: italic bold 30px/30px arial, sans-serif;
      margin-right:  12px;
    }
    span {
      width: 80px;
      height: 20px;
      display: flex;
    justify-content: center;
    align-items: center;
      background-color: rgba(255, 0, 0, 0.836);
      color: aliceblue;
      border-radius: 5px;
      margin-left:  20px;
    }
  }

  .bot {
    color: white;
    margin: 3px 10px 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
    display: flex;
    align-items: center;
    }
    .icon {
      height: 20px;
      color: rgb(44, 253, 7);
    }
    label{
    display: flex;
    align-items: center;
    }
  }
}
</style>

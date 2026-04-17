<template>
  <div class="dialog_right">
    <div class="title">报警信息</div>

    <div class="data">
      <ul>
        <li>报警源：编码设备11</li>
        <li>联动监控点：监控点2-11</li>
        <li>报警类型：异常监测报警</li>
        <li>报警时间：2023.04.19</li>
        <li>
          报警细节：
          <p>
            联动监控点:监控点2_11 <br />
            时间:2023-4-23 13:45:08 <br />
            <!-- 船只数目:1 <br /> -->
            <!-- 船只编号:0038005102 <br /> -->
            <!-- 船只名称:南采W02 <br /> -->
            <!-- 船只类型:链条挖斗式 <br /> -->
           异常地区:瑶湖地区 <br />
            <!-- 作业状态:航行 <br /> -->
            报警类型:微生物含量超标，铜元素含量超标
            <br />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.dialog_right {
  .title {
    font-size: 25px;
    border-bottom: 1px #666 solid;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

  li {
    list-style: none;
    margin: 10px;
  }

  .data {
    font-size: 15px;

    p {
      display: inline-block;
      // margin-left: 65px;
      margin-top: 0;
    }
  }
}
</style>

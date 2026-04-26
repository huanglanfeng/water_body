<template>
  <div class="content" style="max-height: 200px; overflow-y: scroll;">
    <ul>
      <li v-for="(item, index) in listData" :key="index" @click="setData(item)">
        {{ item.title }}
      </li>
    </ul>
  </div>

  <el-dialog v-model="dialogTableVisible" title="公告">
    <h1>
      {{ noticeContent.title }}
    </h1>
    <div class="noticeContent">
      {{ noticeContent.content }}
    </div>
    <div class="noticeFooter">
      {{ noticeContent.name }}
      {{ noticeContent.release_time }}
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { noticeGet} from "@/api/index";
import { ref } from "vue";

const listData = ref<Array<any>>();

const dialogTableVisible = ref(false);

const noticeContent = ref({
  title: "",
  content: "",
  name: "",
  release_time: "",
});

const getData = async () => {
  let res1 = await noticeGet({});

  // let res2 = await sys_get04_2({});

  listData.value = res1.data;
};

const setData = (data: any) => {
  noticeContent.value.title = data.title;
  noticeContent.value.content = data.content;
  noticeContent.value.name = data.name;
  noticeContent.value.release_time = data.release_time;

  dialogTableVisible.value = true;
};

getData();
</script>

<style lang="less" scoped>
.content {
  ul {
    list-style: none;

    li {
      margin: 15px auto;
      border: 1px solid #fff;

      &:hover {
        background-color: rgb(54, 12, 180);
        color: azure;
      }
    }
  }
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

.noticeContent {
  margin-top: 20px;
  font-size: 18px;
  margin-bottom: 20px;
}

.noticeFooter {
  font-size: 14px;
}
</style>

<template>
  <VideoPlayer
    width="400px"
    height="300px"
    title=""
    color="transparent"
    :src="Url"
    :control="false"
    :autoPlay="true"
    :loop="true"
    :poster="Url"
    @play=""
    @pause=""
    @timeupdate=""
    @canplay=""
  />

  <img :src="res" alt="" />
</template>

<script lang="ts" setup>
import { inject, nextTick, onMounted, ref, watchEffect } from "vue";
import { videoUrl } from "./key";
import { getVideoBase64 } from "@/utils/cutVideoImg";
import { computed } from "vue";

const Url = inject(videoUrl); // 类型：string | undefined

const res = ref();

// onMounted(async () => {
//     res.value = await getVideoBase64(Url!.value)
// })

watchEffect(async () => {
  const response = await getVideoBase64(Url!.value);
  res.value = response;
});
</script>

<style lang="less" scoped>
img {
  width: 400px;
  height: 200px;
}
</style>

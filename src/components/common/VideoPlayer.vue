<template>
  <video
    class="vue-video-player"
    :width="width"
    :height="height"
    :src="src"
    :autoplay="autoPlay"
    :loop="loop"
    :controls="control"
    :poster="poster"
    :muted="autoPlay"
    playsinline
  />
</template>

<script lang="ts" setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
  src: { type: String, default: '' },
  autoPlay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  control: { type: Boolean, default: true },
  poster: { type: String, default: '' },
  title: { type: String, default: '' },
  color: { type: String, default: '' },
});
</script>

<style scoped>
.vue-video-player {
  object-fit: cover;
  border-radius: 4px;
  background: #000;
}
</style>

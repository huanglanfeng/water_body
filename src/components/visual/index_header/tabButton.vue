<template>
  <button class="btn" :class="{ check: isCheck }" @click="clickFunction">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { ElLoading } from "element-plus";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute, type RouteLocationRaw } from "vue-router";

const router = useRouter();
const route = useRoute();
interface prop {
  label?: string;
  path?: RouteLocationRaw;
}

const isCheck = ref(false);

watch(
  () => route.path,
  () => {
    if (route.path === "/index/" + props.path) {
      isCheck.value = true;
    } else {
      isCheck.value = false;
    }
  }
);

onMounted(() => {
  if (route.path === "/index/" + props.path) isCheck.value = true;
});

const props = withDefaults(defineProps<prop>(), {
  label: "test",
  path: "/dashboard",
});

const clickFunction = () => {
  router.push(props.path as RouteLocationRaw);
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.5)',
  })
  setTimeout(() => {
    loading.close()
  }, 1500)
};
</script>

<style lang="less" scoped>
.btn {
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 600;
  color: #32d6ff;
  margin: 0px 80px;
  width: 200px;
  position: relative;
  transform: translateY(-60%);

  &:hover {
    color: #aadcfd;
    font-size: 30px;
     -webkit-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
     -moz-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
     box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  }

  &:active {
    //  background-color: #3e8e41;
    // box-shadow: 0 5px #666;
    // transform: translateY(4px);
    font-size: 30px;
  }
}

.check {
  // background-color: #b9e769;
  // -webkit-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  // -moz-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  // box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  color: rgb(16, 208, 242);
  font-weight: bolder;
  font-size: 28px;

  //按钮变形
  // border-bottom-right-radius: 50px;
  // border-top-left-radius: 50px;
  // border-bottom-left-radius: 10px;
}
</style>

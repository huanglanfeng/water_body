<template>
  <div class="obtn">
    <button class="btn">{{ label }}</button>
  </div>
</template>

<script lang="ts" setup>
interface prop {
  label?: string;
}

const props = withDefaults(defineProps<prop>(), {
  label: "testButton",
});
</script>

<style lang="less" scoped>
.obtn {
  display: flex;
  justify-content: center;
  z-index: 999;

  .btn {
    width: 70px;
    height: 70px;
    border: 1px solid rgba(255, 255, 255, 0.462);
    border-radius:50%;
    background: rgba(94, 227, 251, 0.4);
    text-transform: uppercase;
    color: #9fe7a7;
    outline: none;
    overflow: hidden;
    position: relative;
    font-size: 20px;
    font-weight: 600;

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: -40px;
      left: -100px;
      background: white;
      width: 50px;
      height: 125px;
      opacity: 20%;
      transform: rotate(-45deg);
    }

    &:hover:after {
      left: 120%;
      transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
      -webkit-transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
    }
  }
}
</style>

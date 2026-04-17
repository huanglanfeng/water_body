<template>
<div class="main">
     <div class="form">
          <loginFormVue></loginFormVue>
      </div>
</div>
</template>

<script lang="ts" setup>
import loginFormVue from "@/components/login/loginForm.vue";
</script>

<style lang="less" scoped>
.main{
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/login/R-C.jpg);
   background-size: cover;
   display: flex;
   justify-content: center;
   .form{
    position: absolute;
    top: 20%;
   }
}
</style>

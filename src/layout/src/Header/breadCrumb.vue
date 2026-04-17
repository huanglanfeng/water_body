<template>
<div>
      <el-breadcrumb>
            <el-breadcrumb-item
            v-for="(item,index) in breadcrumb" :key="index"
            >
        {{ item.meta.label }}
        </el-breadcrumb-item>
          </el-breadcrumb>
</div>
</template>

<script setup lang="ts">
import { useRoute, type RouteLocationMatched } from 'vue-router';
import{ref, watch,type Ref} from 'vue';

const route =useRoute()
const breadcrumb:Ref<RouteLocationMatched[]>= ref([])

const getBreadCrumb=()=>{
    //过滤路由信息
    let matched=route.matched.filter((item)=>item.meta&&item.meta.label&&item.children.length!==1)
    //拿到第一条数据
    const frist=matched[0]
    //判断
    if(frist.path!=='/ShouYe'){
        matched=[{path:'/ShouYe',meta:{label:'首页'}}as any].concat(matched)
    }
    breadcrumb.value=matched
}
getBreadCrumb()
//监控路由
watch(()=>route.path,()=>{
    getBreadCrumb()
})

</script>

<style>

</style>
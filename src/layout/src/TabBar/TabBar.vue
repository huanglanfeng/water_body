<template>
    <el-tabs 
    v-model="activeKey" 
    type="card"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
    >
    <el-tab-pane 
    v-for="item in tabsList" 
    :key="item.path" 
    :label="item.label" 
    :name="item.path"
    closable
    >
    <span>{{ item.content }}</span>
       </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute,useRouter} from 'vue-router';
import type { Itab } from '@/stores/type';

const route=useRoute()
const store= useStore()
const router=useRouter()

const tabsList =computed(()=>{
   return store.getters.getAddTab;
})

//索引
const activeKey=ref('')

//添加tab
const addTab=()=>{
    const {meta,path}=route
    const tab:Itab={
      path: path,
      label: meta.label as string,
      roles: meta.roles as never[],
      type: meta.type as string,
      icon: meta.icon as string,
    }
    store.commit('addTab',tab)
}

//删除tab
const removeTab=(targetName:string)=>{
    if(tabsList.value.length===1){
        return alert('已经是最后一个了')
    }
    if (activeKey.value===targetName) {
        tabsList.value.forEach((tab:Itab,index:number) => {
            if (tab.path === targetName) {
                const nextTab = tabsList.value[index - 1]|| tabsList.value[index + 1]
                if (nextTab) {
                    activeKey.value=nextTab.path
                    router.push(activeKey.value)
                }
            }
        });
    }
    store.commit('closeCurrentTab',targetName)
}

watch(()=>route.path,()=>{
    activeKey.value=route.path;
    addTab()
})

//点击
const clickHandle=(event:any)=>{
    router.push({path:event.props.name})
}

//刷新缓存数据
const refresh=()=>{
    window.addEventListener('beforeunload',()=>{
        sessionStorage.setItem('TABS_ROUTES',JSON.stringify(tabsList.value))
    })
    let session=sessionStorage.getItem('TABS_ROUTES')
    if (session) {
        let tabItem=JSON.parse(session)
        tabItem.forEach((tab:Itab)=>{
            store.commit('addTab',tab)
        })
    }
}

onMounted(()=>{
    addTab()
    refresh()
})
</script>
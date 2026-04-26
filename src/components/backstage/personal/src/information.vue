<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="时间" prop="date" />
        <el-table-column type="expand" label="内容" width="500px" prop="content">
            <el-card class="box-card">
                <h3>水的重要性：水是生命的源泉，是生命存在与经济发展的必要条件，同样是构成人体组织的重要部分。水在人体内的含量达70%，其余30%左右为固体营养物（蛋白质、碳水化合物、脂质、矿物质、维生素等）。人体60%的水在细胞内，40%在流体内（血、消化液、唾液、胆液、泪水、汗液、肠液、胃液）。成年人每天需水2.5 -3升，其中直接饮用1升左右，食物中补充1升，人体新陈代谢形成0.5升。明代李时珍在本草纲目中著到："药补不如食补，食补不如水补"，水不愧为百药之王。世界水资源的构成：地球上水占70%的面积，其中海水占97.3%，可用淡水只有2.7%。在近3%淡水中77.2%存在雪山冰川中，22.4%为土壤中和地下水（降水与地表水渗入）。只有0.4%为地表水，地表水指河流、湖泊、冰川等水体。中国水资源状况：中国大小河川总长42万公里，湖泊7.56万平方公里，占国土总面积的0.8%，水资源总量28000亿立方米，人均2300立方米，只占世界人均拥有量的1/4，居121位，为13个贫水国之一。中国640个城市有300多个缺水，2.32亿人年均用水量严重不足。</h3>
            </el-card>
        </el-table-column>
        <el-table-column label="发信者" prop="name" />
        <el-table-column label="状态" width="80px">
            <template #default="scope">
                <el-tag :type="scope.row.read === '已读' ? 'info' : 'success'" size="small">
                    {{ scope.row.read }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="large" placeholder="输入关键字搜索" />
            </template>
            <template #default="scope">
                <el-button size="default" @click="handleEdit(scope.$index, scope.row)">已读</el-button>
                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface User {
    date: string
    name: string
    read: string
    content: string
}

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

const tableData: User[] = [
    {
        date: '2016-05-03 18:23:56',
        name: '张山',
        read: '已读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '李四',
        read: '已读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '王五',
        read: '未读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '小六',
        read: '已读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '路奇',
        read: '已读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '张当年',
        read: '未读',
        content: ''
    },
    {
        date: '2016-05-03 18:23:56',
        name: '时间山',
        read: '未读',
        content: ''
    },
]
</script>

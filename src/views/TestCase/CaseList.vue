<template>
    <PageCard>
        <template #title>
            <el-button type="primary" icon="plus" size="small" @click="$router.push({name: 'addCase'})">添加用例</el-button>
        </template>
        <template #main>
            <el-table :data="caseList" border style="width: 100%">
                    <el-table-column prop="create_time" label="创建时间" />
                    <el-table-column prop="name" label="用例名称"  />
                    <el-table-column prop="record_total" label="执行次数"  />
                    <el-table-column prop="step_count" label="用例步骤数量"  />
                    <el-table-column prop="state" label="最新执行状态"  />
                    <el-table-column label="操作" width="450">
                        <template #default="scope" >
                            <el-button type="success" icon="VideoPlay" plain size="small">运行</el-button>
                            <el-button type="success" icon="List" plain size="small">执行记录</el-button>
                            <el-button type="success" icon="Edit" plain size="small" @click="$router.push({name: 'editCase', params: {case_id: scope.row.id}})">编辑</el-button>
                            <el-button type="success" icon="CopyDocument" plain size="small" @click="copyCase(scope.row)">复制</el-button>
                            <el-button type="danger" icon="Delete" plain size="small" @click="deleteCase(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </template>
        <template #bottom>
            <!-- 分页展示 -->
            <el-pagination
                v-model:current-page="configPage.page"
                v-model:page-size="configPage.size"
                :page-sizes="[5,10, 20, 30, 50]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="configPage.total"
                @size-change="getcaseList"
                @current-change="getcaseList"
                />
        </template>
    </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
import sapi from '@/api/modules/suiteApi.js';
import { projectStore } from '@/stores/projectStore';
import { ref, reactive ,watch} from 'vue';
import { ElMessage ,ElMessageBox } from 'element-plus'


const pstore = projectStore();
const caseList = ref([]);
const configPage=reactive({
    page: 1,
    size: 10,
    total: 0
});
const pageSizes = ref([5,10,20,30,50,100]);
// 获取用例列表
const getcaseList = async () => {
    const res = await sapi.getCaseList(pstore.projectInfo.id,configPage.page,configPage.size);
    if (res.status === 200) {
        console.log("用例数据",res.data.datas);        
        caseList.value = res.data.datas;
        configPage.total = res.data.total;
        configPage.page = res.data.page;
        configPage.size = res.data.size;
        // todo
    } else {
        console.error('获取用例列表失败:', res);
    }
};

// 监控页面展示数是否变化
watch(pageSizes, (newSizes) => {
    if (!newSizes.includes(configPage.size)) {
    configPage.size = newSizes[0];
    configPage.page = 1; // 可选：回到第1页
  }
  // 手动刷新列表（因为变更 prop 本身不会触发 el-pagination 的 size-change）
  getcaseList();
},{deep: true});

getcaseList();
// 删除用例
const deleteCase = async(row) => {
     ElMessageBox.confirm(
    '确定要删除该用例吗？删除后不可恢复！',
    '警告!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res = await sapi.deleteCase(row.id);
    if (res.status === 204) {
        getcaseList();
        ElMessage({
            message: '用例删除成功',
            type: 'success',
        })
    } else {
        ElMessage.error('用例删除失败');
    }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除用例',
      })
    })
}
// 复制用例
const copyCase = async(row) => {
    const res = await sapi.copyCase(row.id);
    if (res.status === 200) {
        getcaseList();
        ElMessage({
            message: '用例复制成功',
            type: 'success',
        })
    } else {
        ElMessage.error('用例复制失败');
    }
}   

</script>


<style scoped lang="scss">

</style>
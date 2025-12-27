<template>
    <PageCard>
        <template #title>
            <el-button type="primary" icon="plus" size="small" @click="createModule">创建模块</el-button>
        </template>
        <template #main>
            <el-table :data="moduleList" border style="width: 100%">
                    <el-table-column prop="create_time" label="创建时间" />
                    <el-table-column prop="name" label="模块名称"  />
                    <el-table-column prop="suite_count" label="套件数量"  />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="primary" icon="View" size="small">模块详情</el-button>
                        <el-button type="success" icon="Edit" plain size="small" @click="editModule(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="Delete" plain size="small" @click="deleteModule(scope.row)">删除</el-button>
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
                @size-change="getModelList"
                @current-change="getModelList"
                />
        </template>
    </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
import papi from '@/api/modules/projectApi.js';
import { projectStore } from '@/stores/projectStore';
import { ref, reactive ,watch} from 'vue';
import { ElMessage ,ElMessageBox } from 'element-plus'
const pstore = projectStore();
const moduleList = ref([]);
const configPage=reactive({
    page: 1,
    size: 10,
    total: 0
});
const pageSizes = ref([5,10,20,30,50,100]);
// 获取模块列表
const getModelList = async () => {
    const res = await papi.getProjectModuleList(pstore.projectInfo.id,configPage.page,configPage.size);
    if (res.status === 200) {
        console.log("模块数据",res.data.datas);        
        moduleList.value = res.data.datas;
        configPage.total = res.data.total;
        configPage.page = res.data.page;
        configPage.size = res.data.size;
        // todo
    } else {
        console.error('获取模块列表失败:', res);
    }
};

// 监控页面展示数是否变化
watch(pageSizes, (newSizes) => {
    if (!newSizes.includes(configPage.size)) {
    configPage.size = newSizes[0];
    configPage.page = 1; // 可选：回到第1页
  }
  // 手动刷新列表（因为变更 prop 本身不会触发 el-pagination 的 size-change）
  getModelList();
},{deep: true});

getModelList();

// 编辑模块
const editModule = async(row) => {
    console.log("编辑模块",row);
    ElMessageBox.prompt('请输入模块名称', '编辑模块', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:
      /^\S{5,10}$/,
    inputErrorMessage: '请输入 5 到 10 位的字符串',
  })
    .then(async ({ value }) => {
        // 调用更新项目名称的API接口
        const res = await papi.updateProjectModule(row.id, { name: value });
        console.log("jieguo", res.status);
        if (res.status === 200) {
            getModelList();
            ElMessage({
                message: '模块名称更新成功',
                type: 'success',
            })
        } else {
            ElMessage.error('模块名称更新失败');
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消编辑模块',
      })
    })
};
// 删除模块
const deleteModule = async(row) => {
     ElMessageBox.confirm(
    '确定要删除该模块吗？删除后不可恢复！',
    '警告!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res = await papi.deleteProjectModule(row.id);
    if (res.status === 204) {
        getModelList();
        ElMessage({
            message: '模块删除成功',
            type: 'success',
        })
    } else {
        ElMessage.error('模块删除失败');
    }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除模块',
      })
    })
}

// 创建模块
const createModule = async() => {
    ElMessageBox.prompt('请输入模块名称', '创建模块', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:
      /^\S{5,10}$/,
    inputErrorMessage: '请输入 5 到 10 位的字符串',
  })
    .then(async ({ value }) => {
        // 调用创建模块的API接口
        const res = await papi.addProjectModule({ name: value ,project_id: pstore.projectInfo.id});
        if (res.status === 200) {
            getModelList();
            ElMessage({
                message: '模块创建成功',
                type: 'success',
            })
        } else {
            ElMessage.error('模块创建失败');
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消创建模块',
      })
    })
}

</script>
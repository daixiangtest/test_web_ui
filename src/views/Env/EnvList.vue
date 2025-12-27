<template>
    <PageCard>
        <template #title>
            <el-button type="primary" icon="plus" size="small" >添加环境</el-button>
        </template>
        <template #main>
            <el-table :data="envList" border style="width: 100%">
                    <el-table-column prop="create_time" label="创建时间" />
                    <el-table-column prop="name" label="环境名称"  />
                    <el-table-column prop="host" label="环境域名"  />
                    <el-table-column label="环境变量">
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                                >
                                <template #content>
                                    <pre style="white-space: pre-wrap; max-width: 500px;">{{ formatGlobalVarsFull(scope.row.global_vars) }}</pre>
                                </template>
                                <el-button size="small">
                                    {{ formatGlobalVarsPreview(scope.row.global_vars) }}
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="success" icon="Edit" plain size="small" >编辑</el-button>
                            <el-button type="danger" icon="Delete" plain size="small" @click="deleteEnv(scope.row)">删除</el-button>
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
                @size-change="getEnvList"
                @current-change="getEnvList"
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
const envList = ref([]);
const configPage=reactive({
    page: 1,
    size: 10,
    total: 0
});

// 格式化为完整的 JSON 字符串（若是对象则 stringify，若是字符串则返回原字符串）
const formatGlobalVarsFull = (v) => {
  if (v === null || v === undefined || v === '') return '-';
  if (typeof v === 'object') {
    try {
      return JSON.stringify(v, null, 2);
    } catch (e) {
      return String(v);
    }
  }
  // 如果是字符串，尝试解析为 JSON 再格式化（容错）
  if (typeof v === 'string') {
    try {
      const parsed = JSON.parse(v);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return v;
    }
  }
  return String(v);
};

// 返回预览（前 50 个字符），多余部分用 "..." 表示
const formatGlobalVarsPreview = (v, len = 50) => {
  const full = formatGlobalVarsFull(v);
  // 把多行JSON压缩为单行预览（移除换行和多余空白）
  const single = full.replace(/\s+/g, ' ').trim();
  if (single.length <= len) return single;
  return single.slice(0, len) + '...';
};
const pageSizes = ref([5,10,20,30,50,100]);
// 获取环境列表
const getEnvList = async () => {
    const res = await papi.getEnvironmentList(pstore.projectInfo.id,configPage.page,configPage.size);
    if (res.status === 200) {
        console.log("环境数据",res.data.datas);        
        envList.value = res.data.datas;
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
  getEnvList();
},{deep: true});

getEnvList();


// 删除环境
const deleteEnv = async(row) => {
     ElMessageBox.confirm(
    '确定要删除该环境吗？删除后不可恢复！',
    '警告!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res = await papi.deleteEnvironment(row.id);
    if (res.status === 204) {
        getEnvList();
        ElMessage({
            message: '环境删除成功',
            type: 'success',
        })
    } else {
        ElMessage.error('环境删除失败');
    }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除环境',
      })
    })
}

// 创建环境 

</script>


<style scoped lang="scss">
.box-item ::v-deep pre {
  max-width: 480px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.4;
}
</style>
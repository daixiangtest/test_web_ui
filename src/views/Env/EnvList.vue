<template>
    <PageCard>
        <template #title>
            <el-button type="primary" icon="plus" size="small" @click="createEnv">添加环境</el-button>
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
                            <el-button type="success" icon="Edit" plain size="small" @click="editEnv(scope.row)">编辑</el-button>
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
    <!-- 编辑与创建模块对话框 -->
     <el-dialog v-model="dialogFormVisible" :title="title" width="500">
      <el-form :model="envForm">
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="envForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Host地址" :label-width="formLabelWidth">
          <el-input v-model="envForm.host" autocomplete="off" />
        </el-form-item>
        <el-form-item label="全局变量" :label-width="formLabelWidth">
          <CodeEdit v-model="envForm.global_vars" lang="json" :height="'200px'" />
          <!-- <el-input v-model="envForm.global_vars" type="textarea" autocomplete="off" /> -->
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button v-if="title === '编辑环境'" type="primary" @click="updateEnvApi">
            Confirm
          </el-button>
          <el-button v-else type="primary" @click="createEnvApi">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
import papi from '@/api/modules/projectApi.js';
import { projectStore } from '@/stores/projectStore';
import { ref, reactive ,watch} from 'vue';
import { ElMessage ,ElMessageBox } from 'element-plus'
import CodeEdit from '@/components/CodeEdit.vue';

const pstore = projectStore();
const envList = ref([]);
const configPage=reactive({
    page: 1,
    size: 10,
    total: 0
});
// 编辑与创建环境对话框数据
const dialogFormVisible = ref(false);
const envForm = reactive({
  project_id: pstore.projectInfo.id,
  name: '',
  host: '',
  global_vars: "",
});
const title=ref('');

// 创建环境
const createEnv = () => {
  title.value = '创建环境';
  envForm.name = '';
  envForm.host = '';
  envForm.global_vars = '';
  dialogFormVisible.value = true;
};
const envId=ref(null);
// 编辑环境
const editEnv = (row) => {
  title.value = '编辑环境';
  envForm.name = row.name;
  envForm.host = row.host;
  envForm.global_vars = row.global_vars;
  envId.value = row.id;
  dialogFormVisible.value = true;
};
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

// 创建环境 API 调用
const createEnvApi = async() => {
    const res = await papi.addEnvironment({
        project_id: pstore.projectInfo.id,
        name: envForm.name,
        host: envForm.host,
        global_vars: JSON.parse(envForm.global_vars)
    });
    if (res.status === 200) {
        getEnvList();
        dialogFormVisible.value = false;
        ElMessage({
            message: '环境创建成功',
            type: 'success',
        })
    } else {
        ElMessage.error('环境创建失败');
    }
};

// 更新环境 API 调用
const updateEnvApi = async() => {
    const res = await papi.updateEnvironment(envId.value,{
        project_id: pstore.projectInfo.id,
        name: envForm.name,
        host: envForm.host,
        global_vars: JSON.parse(envForm.global_vars)
    });
    if (res.status === 200) {
        getEnvList();
        dialogFormVisible.value = false;
        ElMessage({
            message: '环境更新成功',
            type: 'success',
        })
    } else {
        ElMessage.error('环境更新失败');
    }
};
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
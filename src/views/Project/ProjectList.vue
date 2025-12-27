<template>
    <PageCard>
        <template #title>
            <el-button type="primary" icon="plus" size="small" @click="dialogFormVisible = true">添加项目</el-button>
        </template>
        <template #main>
             <el-table :data="projectList" height="650" border style="width: 100%" row-class-name="tableRowClassName">
                <el-table-column label="创建时间">
                    <template #default="scope">
                        {{ dateTools.toYMDHmsWithTZ(scope.row.crete_time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="项目名称" />
                <el-table-column label="创建人">
                    <template #default="scope">
                        {{ ustore.userInfo.username }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" icon="Switch" :disabled="scope.row.id === pstore.projectInfo.id" size="small" @click="selectProject(scope.row)">选择项目</el-button>
                        <el-button type="success" icon="Edit" plain size="small" @click="editProject(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="Delete" plain size="small" @click="deleteProject(scope.row)" :disabled="scope.row.id === pstore.projectInfo.id">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #bottom>
            <el-pagination
                v-model:current-page="configPage.page"
                v-model:page-size="configPage.size"
                :page-sizes="[5,10, 20, 30, 50]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="configPage.total"
                @size-change="fetchProjectList"
                @current-change="fetchProjectList"
                />
        </template>
    </PageCard>

    <!-- 添加项目弹窗 -->
     <el-dialog v-model="dialogFormVisible" title="添加项目" width="500">
        <el-form :model="formData">
        <el-form-item label="项目名称" >
            <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addProject">
            确认
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';   
import papi from '@/api/modules/projectApi.js';
import { ref,reactive,watch} from 'vue';
import { useStore} from '@/stores/userStore.js';
import { projectStore } from '@/stores/projectStore.js';
import { ElMessage ,ElMessageBox } from 'element-plus'
import dateTools from '@/tools/dateTools';
import { useRouter } from 'vue-router';
const router = useRouter();
const ustore = useStore();
const pstore = projectStore();
// 项目列表数据
const projectList = ref([]);
// 请求页数配置
const configPage=reactive({
    page: 1,
    size: 10,
    total: 0
});
// 分页展示数
const pageSizes = ref([5,10,20,30,50,100]);
// 获取项目列表
async function fetchProjectList() {
    const res = await papi.getProjectList(configPage.page, configPage.size);
    if (res.status === 200) {
        projectList.value = res.data.datas;
        configPage.total = res.data.total;
        pstore.projectList = res.data.datas;
    } else {
        console.error('获取项目列表失败:', res);
    }
}
fetchProjectList();

// 监控页面展示数是否变化
watch(pageSizes, (newSizes) => {
    if (!newSizes.includes(configPage.size)) {
    configPage.size = newSizes[0];
    configPage.page = 1; // 可选：回到第1页
  }
  // 手动刷新列表（因为变更 prop 本身不会触发 el-pagination 的 size-change）
  fetchProjectList();
},{deep: true});

// 添加项目
const dialogFormVisible = ref(false);
const formData = reactive({
    name: ''
});

const addProject = async () => {
    console.log('添加项目:', formData.name);
    // 这里可以调用添加项目的API接口
    const res = await papi.addProject(formData);
    if (res.status === 200) {
        fetchProjectList();
        ElMessage({
            message: '项目添加成功',
            type: 'success',
        })
    } else {
        ElMessage.error('项目添加失败');
    }
    dialogFormVisible.value = false;
    formData.name = '';
}
// 删除项目
const deleteProject = async (project) => {
    console.log('删除项目:', project);
     ElMessageBox.confirm(
    '确定要删除该项目吗？删除后不可恢复！',
    '警告!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res = await papi.deleteProject(project.id);
    if (res.status === 204) {
        fetchProjectList();
        ElMessage({
            message: '项目删除成功',
            type: 'success',
        })
    } else {
        ElMessage.error('项目删除失败');
    }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '以取消删除项目',
      })
    })
    
}
// 编辑项目
const editProject = async (project) => {
    console.log('编辑项目:', project);
    ElMessageBox.prompt('请输入项目名称', '编辑项目', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:
      /^\S{5,10}$/,
    inputErrorMessage: '请输入 5 到 10 位的字符串',
  })
    .then(async ({ value }) => {
        // 调用更新项目名称的API接口
        const res = await papi.updateProject(project.id, { name: value });
        console.log("jieguo", res.status);
        if (res.status === 200) {
            fetchProjectList();
            ElMessage({
                message: '项目名称更新成功',
                type: 'success',
            })
        } else {
            ElMessage.error('项目名称更新失败');
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消编辑项目',
      })
    })
}
// 选择项目
const selectProject = async(project) => {
    console.log('选择项目:', project);
    // 获取项目详情
    const res = await papi.getProjectDetail(project.id);
    if (res.status === 200) {
        // 保存全局信息
        pstore.projectInfo = res.data;
        // 打开菜单栏
        pstore.isShowMenu = false;
        ElMessage({
        message: `已选择项目: ${res.data.name}`,
        type: 'success',
    })
    // 跳转模块列表页
    router.push({name:'ModuleList'});
    } else {
        ElMessage.error('获取项目详情失败');
    }
}
//  表格状态
const tableRowClassName = ({ row }) => {
    console.log('当前项目数据:', row);
    if (row.id === pstore.projectInfo.id) {
        return 'warning-row';
    }
    
};

</script>
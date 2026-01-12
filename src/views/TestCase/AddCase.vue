<template>
    <el-container>
      <el-aside width="200px">
        <OperatingSteps>

        </OperatingSteps>
      </el-aside>
      <PageCard>
        <template #title>
          <H2>添加用例</H2>
        </template>
        <template #main>
            <!-- 用例名称输入框 -->
            <el-input
                v-model="caseInfo.name"
                size="large"
                placeholder="请输入用例名称"
                >
                <template #prepend>用例名称</template>
            </el-input>
            <draggable 
            v-model="caseInfo.steps" item-key="index" 
            chosen-class="chosen"
            ghost-class="ghost"
            :group="{ name: 'steps', pull: false, put: true }"
            @add = "addStep"
            >
                <!-- 用例步骤 -->
                 <template #item="{element, index}">
                    <div class="steps" :key="element.id">
                        <div class="line1">
                            <el-icon size="16px"><Operation /></el-icon>
                            <span>{{ element.keyword }}</span>
                            <div class="btn">
                                <el-button type="primary" plain icon="Edit" circle />
                                <el-button type="danger" plain icon="Delete" circle />
                            </div>
                        </div>
                        <div class="line2">
                            <p>{{ element.desc }}</p>
                        </div>
                    </div>
                 </template>
            </draggable>
            
        </template>
        <template #bottom>
          <el-button type="success" size="small" plain icon="CircleCheckFilled" @click="addCase">保存</el-button>
          <el-button type="success" plain size="small" icon="CircleCloseFilled" @click="cancel">取消</el-button>
        </template>
      </PageCard>
    </el-container>
    <!--  编辑步骤参数的弹框-->
  <el-dialog v-model="editDlg">
    <!--弹框的标题-->
    <template #header>
      <b>{{ editStep.keyword }}</b>
    </template>
    <el-input v-model="editStep.decs">
      <template #prepend>操作说明</template>
    </el-input>
    <!-- 弹框显示的编辑内容-->
    <span>配置参数</span>
    <div v-for="(value,key) in editStep.params" :key="key" style="margin-top: 10px">
          <el-input v-model="editStep.params[key]">
            <template #prepend>{{key}}</template>
          </el-input>
    </div>
    <!--保存按钮-->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editDlg = false">取消</el-button>
        <el-button type="primary" @click="editDlg = false">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
import OperatingSteps from '@/components/OperatingSteps.vue';
import { ref } from 'vue';
import {projectStore} from '@/stores/projectStore.js';
import sapi from '@/api/modules/suiteApi.js';
import { ElMessage } from 'element-plus'
import {useRouter,useRoute} from "vue-router"
// Todo: 引入拖拽组件
import draggable from 'vuedraggable';
const router = useRouter();
const route = useRoute();
const pstore = projectStore();
const caseInfo = ref({
    name: '',
    project_id: pstore.projectInfo.id,
    steps: [
        {
            "keyword": "打开浏览器",
            "desc": "打开谷歌浏览器", 
            "method": "open_browser", 
            "params": {"browser_type": "chromium"}},
        {
            "keyword": "打开网页",
            "desc": "打开百度网页",
            "method": "open_url", 
            "params": {"url": "https://www.baidu.com"}}
    ]
});

// 保存用例信息
const addCase = async () => {
    console.log('保存用例信息:', caseInfo.value);
    const res=await sapi.addCase(caseInfo.value);
    if(res.status===200){
        ElMessage({
            message: '用例添加成功',
            type: 'success',
        })
        router.push({name:'caseList'});
        pstore.delTags(route.path);
    }
    else if(res.status===401){
        ElMessage({
            message: '用例名称已经存在请更改用例名称',
            type: 'error',
        })
    }
    else{
        ElMessage({
            message: '用例添加失败',
            type: 'error',
        })
    }
};
// 取消添加用例
const cancel = () => {
    console.log('取消添加用例');
    router.back();
    pstore.delTags(route.path);
    caseInfo.value.name='';
    caseInfo.value.steps=[];
};
const editDlg=ref(false);
const editStep=ref({
    keyword:'',
    desc:'',
    params:{}
});
// 添加步骤
    const addStep = (event) => {
        console.log('添加步骤:', event.item._underlying_vm_);
        editStep.value=event.item._underlying_vm_;
        editDlg.value=true;
        
    };

</script>

<style scoped lang="scss">
.steps {
    height: 60px;
    border: 1px dashed var(--el-color-success);
    border-radius: 10px;
    padding: 5px 20px 0 20px;
    margin-top: 20px;
    cursor: move;
    .line1 {
        display: flex;
        align-items: center;
        height: 30px;
        span{
            margin-left: 5px;
            font: bold 18px/20px '微软雅黑';
            margin-left: 10px;
        }
        .btn {
            flex:1;
            text-align: right;
        }
    }
    .line2 {
        height: 25px;
        display: flex;
        align-items: center;
        color: var(--el-color-info);
        font-size: 14px;
    }
}
// 拖拽样式
.chosen {
    background-color: #f0f9eb;
    border: 2px dashed var(--el-color-success);
}
.ghost {
    opacity: 0.5;
    border: 2px dashed var(--el-color-success);
}
</style>
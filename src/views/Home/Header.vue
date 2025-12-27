<template>
    <div class="main_box">
        <!-- 左侧盒子 -->
        <div class="lisf_box">
            <el-button v-if="pstore.isOpenMenu" type="primary" plain icon="Fold" @click="debugMenu"/>
            <el-button v-else type="primary" icon="Expand" plain @click="debugMenu"/>
        </div>
        <!-- 中间盒子 -->
        <div class="center_box">
            <span>{{ pstore.projectInfo.name }}</span>
        </div>
        <!-- 右侧盒子 -->
        <div class="right_box">
            <div class="box1"><el-button type="primary" plain icon="FullScreen" @click="screenfull.toggle()"></el-button></div>
            <div class="box2"><el-button type="primary" plain icon="Switch" @click="switchTo">切换项目</el-button></div>
            <div class="box3">
                <el-dropdown>
                    <el-button type="primary" plain icon="UserFilled">
                        rock.dai<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <el-dialog v-model="isShoowPro" title="切换项目" width="500">
    <el-form :model="form">
      <el-form-item label="选择项目" :label-width="formLabelWidth">
        <el-select v-model="form.Pro" placeholder="请选择要切换的项目">
          <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShoowPro = false">取消</el-button>
        <el-button type="primary" @click="swichProject">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
    
</template>

<script setup>
import { projectStore } from '@/stores/projectStore.js';
import { useStore} from '@/stores/userStore.js';
import { useRouter } from 'vue-router';
import screenfull from 'screenfull'
import { ref } from 'vue';
import papi from '@/api/modules/projectApi.js';
import { ElMessage } from 'element-plus'
const isShoowPro = ref(false);
const pstore = projectStore();
const ustore = useStore();
const router = useRouter();
const projectList = ref([]);
// 调试菜单栏展开与收起
const debugMenu=()=>{
    pstore.isOpenMenu = !pstore.isOpenMenu;
};
// 退出登录
const loginOut=()=>{
    ustore.$reset();
    pstore.$reset();
    router.push({path:'/login'});
}
// 切换项目
const form = ref({
  Pro: ''
});
const switchTo = async() => {
  isShoowPro.value = true;
  const res = await papi.getProjectList();
if (res.status === 200) {
    projectList.value = res.data.datas;
} else {
    console.error('获取项目列表失败:', res);
}
};



const swichProject = async () => {
  console.log('切换到项目ID:', form.value.Pro);
    //获取项目详情
    const res = await papi.getProjectDetail(form.value.Pro);
    if (res.status === 200) {
        pstore.projectInfo = res.data;
        isShoowPro.value = false;
        ElMessage({
        message: '项目切换成功！',
        type: 'success',
    })

    } else {
        ElMessage.error('项目切换失败，请重试！');
    }
};

</script>

<style scoped lang="scss">
.main_box{
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .center_box{
        span{
            font-size: 20px;
            font: bold 25px/55px Arial, sans-serif;
            color: var(--el-color-primary);
            border: 1px dashed var(--el-color-primary);
            border-radius: 15px;
            padding: 0 32px;
        }
    }
    .right_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .box2{margin: 0 8px;}
    }
}
</style>
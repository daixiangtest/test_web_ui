<template>
    <div class="manu_log">
        <img src="@/assets/images/tag.png" alt="logo">
        <div class="tag">自动化测试平台</div>
    </div>
   
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="!pstore.isOpenMenu"
        router
      > 
        <el-sub-menu :index="item.index" v-for="item in leftMenu" :key="item.index" :disabled="pstore.isShowMenu">
          <template #title>
            <img :src="item.icon" alt="pro" width="20" style="margin-right:8px;">
            <span>{{ item.name }}</span>
          </template>
            <el-menu-item :index="data.index" v-for="data in item.children" :key="data.index" >
                <template #title> 
                    <img :src="data.icon_path" alt="pro_tag" width="15" style="margin-right:5px;">
                    <span>{{ data.name }}</span> 
                </template>
            </el-menu-item>
        </el-sub-menu>
      </el-menu>
    
</template>

<script setup> 
import { leftMenu } from '@/datas/leftMenu.js';
import { projectStore } from '@/stores/projectStore.js';
const pstore = projectStore();




</script>


<style scoped lang="scss">
.manu_log{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    img{
        width: 55px;
        height: 55px;
        margin-left: 7px;
    }
    .tag{
        font-size: 16px;
        font-weight: bold;
        color: var(--el-color-primary);
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
    }
}
.el-menu-vertical-demo {
    border-right: none;
    height: calc(100vh - 60px);
    overflow-y: auto;
    .el-menu-item{
        box-shadow: inset 0 0 2px var(--el-color-info);
        margin: 5px;
        height: 35px;
        width: 180px;
        border-radius: 10px;
        // 悬停状态的样式
        &:hover{
            border: 1px dashed var(--el-color-primary);
            
        }
        // 选中状态的样式
        &.is-active{
            // background: var(--el-color-primary-light-9);
            border: 2px dashed var(--el-color-primary);
        }
    }
}

</style>
<template>
    <div class="box">
        <div class="title">
            <el-icon><ChromeFilled /></el-icon>
            <span>操作步骤</span>
        </div>
        <div class="main">
            <el-collapse v-model="actionGroup" @change="handleChange">
                <el-collapse-item v-for="grop in actionGroup" :key="grop.groupId" :name="grop.groupId">
                    <template #title>
                        <el-link :icon="grop.groupIcon" underline="false">{{ grop.name }}</el-link>
                    </template>
                    <draggable 
                    v-model="grop.items" item-key="index" 
                    chosen-class="chosen"
                    ghost-class="ghost"
                    :group="{ name: 'steps', pull: clone, put: false }"
                    :clone="cloneData"
                    :sort="false"
                    >
                        <template #item="{element, index}">
                            <div class="card_info" :key="element.id">
                                <span>{{ element.keyword }}</span>
                                <el-icon><Plus /></el-icon>
                            </div>

                        </template>
                    </draggable>
                </el-collapse-item>
                
            </el-collapse>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import actionGroup from '@/datas/operationOptions.js';
import draggable from 'vuedraggable';

    
    const handleChange = (val) => {
        console.log('当前展开的菜单:', val);
    };

    // 处理拖拽数据
    const cloneData = (original) => {
        original.desc=original.keyword
        return { ...original };
    };

    
</script>

<style scoped lang="scss">  
.box {
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    height: calc(100vh - 150px);
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-weight: bold;
        font-size: 20px;
        height: 40px;
        color: var(--el-color-primary);
    }
    .main {
        padding: 10px;
        
    }
}
.card_info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #e4e7ed;
            border-radius: 5px;
            margin:8px 5px 0 10px;
            padding: 5px 15px;
            height: 22px;
            padding-bottom: 0;
            box-shadow: inset 0 0 2px rgba(0,0,0,0.1);
            white-space: nowrap;
            cursor: move;
            &:hover {
                color: var(--el-color-primary);
                
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
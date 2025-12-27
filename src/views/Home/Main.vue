<template>
    <!--  -->
        <el-tabs  type="border-card" :model-value="$route.path" @tab-click="chickTag" @tab-remove="delTag">
            <div  class="tags_box" v-for="item in pstore.tags" :key="item.name">
                <el-tab-pane :name="item.path" v-if="item.path===$route.path">
                    <template #label>
                        <img :src="item.icon_path" alt="tag_icon" width="15" style="margin-right:5px;">
                        <span>{{ item.name }}</span>
                    </template>
                    <router-view></router-view>
                </el-tab-pane>
                <el-tab-pane :name="item.path" v-else closable>
                    <template #label>
                        <img :src="item.icon_path" alt="tag_icon" width="15" style="margin-right:5px;">
                        <span>{{ item.name }}</span>
                    </template>
                    <router-view></router-view>
                </el-tab-pane>
            </div>
            
        </el-tabs>
    
  
</template>

<script setup>
import { projectStore } from '@/stores/projectStore';
import { useRouter } from 'vue-router';
const pstore = projectStore();  
const router = useRouter();

// 关闭标签页
function delTag(name) {
    pstore.delTags(name);
}

// 点击标签页
function chickTag(ele) {
    console.log('点击标签页:',ele);
    router.push(ele.props.name);
}
</script>

<style scoped lang="scss">
.el-tabs{
    height: calc(100vh - 85px);
}
</style>
<template>
    <el-container>
        <el-aside :style="{height:'100vh', width:pstore.isOpenMenu ? '200px':'65px'}"><Aside></Aside></el-aside>
        <el-container>
            <el-header><Header></Header></el-header>
            <el-main><Main></Main></el-main>
            <el-footer><Footer></Footer></el-footer>
        </el-container>
    </el-container>
</template>


<script setup>
import Header from "@/views/Home/Header.vue"
import Aside from "@/views/Home/Aside.vue"
import Main from "@/views/Home/Main.vue"
import Footer from "@/views/Home/Footer.vue";
import { projectStore } from '@/stores/projectStore.js';
const pstore = projectStore();
</script>

<style scoped lang="scss">
    .el-container {

        .el-aside {
        box-shadow: 0 0 5px var(--el-color-info);
        transition: width 0.2s;
    }
        .el-container {
            .el-header{
                height: 55px;
                box-shadow: 3px 0 5px var(--el-color-info);
            }
            .el-footer{
                height: 30px;
                box-shadow: 3px 0px 5px var(--el-color-info);
            }
            .el-main{
                padding: 0;
                background-color: var(--el-color-white);
            }
        }

    }

</style>
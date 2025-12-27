<template>
   
    <el-container>
        <el-main>
        <el-card class="page-card">
            <div class="title_box">
                <slot name="title"></slot>
            </div>
            <div class="main_box">
                <slot name="main"></slot>
            </div>
            <div class="bottom_box">
                <slot name="bottom"></slot>
            </div>
        </el-card>
        </el-main>
    </el-container>
  
</template>


<script setup>

</script>

<style scoped lang="scss">
    .title_box{
        display: flex;
        height: 40px;
        align-items: center;
        color: var(--el-color-primary);
        font: bold 14p/40px "Microsoft YaHei";
    }
    .main_box{
        padding: 30px;
        height: calc(100vh - 360px);
        border-radius: 10px;
        box-shadow: inset 0 0 5px var(--el-color-info);
        overflow-y: auto;
    }
    .bottom_box{
        
       height: 50px;
       display: flex;
       justify-content: center;
       align-items: center;
    }
</style>


<template>
    <el-container style="height: 100vh;">
        <el-header>掌员后台管理系统
            <el-button type="info" plain style="float: right;margin-top: 10px;" @click="loginout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Menus></Menus>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Menus from '@/components/Menus'
    export default {
        name: 'Main',
        components: {Menus},
        methods:{
            loginout(){
                this.$message({
                    message: '安全退出',
                    type: 'success',
                    duration: 1000,
                });
                sessionStorage.removeItem("login");
                this.$router.push("/back/login");
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
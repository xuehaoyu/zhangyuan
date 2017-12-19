<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3 style="text-align: center;padding-left: 80px">掌员后台管理系统</h3>
        <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="margin-right: 10px;margin-left: 114px">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var validateUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                },
                rules2: {
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                var that = this;
                /*获取页面元素，通过传进来的ref*/
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fetch("/ajax/back/checkLogin",{
                            method:"post",
                            body:"aname="+this.ruleForm2.user+"&apass="+this.ruleForm2.pass,
                            headers:{"content-type":"application/x-www-form-urlencoded"}
                        }).then(function (e) {
                            return e.json();
                        }).then(function (e) {
                            console.log(e);
                            if(e.message == "error"){
                                that.$router.push("/back/login");
                            }else {
                                sessionStorage.login = JSON.stringify(e);
                                that.$router.push("/back");
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm{
        width: 500px;
        margin-left: 380px;
        margin-top: 120px;
    }
</style>
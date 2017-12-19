<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3 style="display: inline-block">添加员工信息</h3>
        <el-button type="primary" round style="float: right;font-weight: 700" @click="back">返回</el-button>
        <el-form-item label="工号" prop="number">
            <el-input type="text" v-model="ruleForm2.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input type="text" v-model="ruleForm2.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="margin-right: 60px">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var validateNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入工号'));
                }else{
                    callback();
                }
            };
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    number: '',
                    name: '',
                    phone: '',
                },
                rules2: {
                    number: [
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
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
                        var number=this.ruleForm2.number;
                        var name=this.ruleForm2.name;
                        var phone=this.ruleForm2.phone;
                        fetch("/ajax/member/add",{
                            method:"post",
                            body:"number="+number+"&name="+name+"&phone="+phone,
                            headers:{"content-type":"application/x-www-form-urlencoded"}
                        }).then(function (e) {
                            return e.text();
                        }).then(function (e) {
                            if(e == "success"){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 1000,
                                });
                                that.ruleForm2.number = "";
                                that.ruleForm2.name = "";
                                that.ruleForm2.phone = "";
                            }else {
                                that.$message({
                                    message: '添加失败',
                                    type: 'error',
                                    duration: 1000,
                                });
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
            },
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .el-main[data-v-c5df416e]{
        line-height: normal;
    }
</style>
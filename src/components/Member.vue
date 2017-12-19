<template>
    <div>
    <el-upload
            class="upload-demo"
            ref="upload"
            action="/ajax/back/upload"
            accept="application/vnd.ms-excel,application/x-xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-success="sure"
    >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
        <router-link to="/addMember" tag="a" class="el-icon-circle-plus" style="font-size: 36px;color: #8d8d8e;float: right"></router-link>
        <div slot="tip" class="el-upload__tip" style="line-height: normal;margin-bottom: 10px">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <el-table
            v-loading="loading"
            :data="tableData3"
            height="440"
            border
            style="width: 100%">
        <el-table-column
                prop="number"
                label="工号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机号码">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3:[],
                fileList: [],
                loading: true,
            }
        },
        created(){
            var that = this;
           fetch("/ajax/member/select").then(function (e) {
               return e.json();
           }).then(function (e) {
               that.tableData3 = e;
               that.loading = false;
           })
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            sure(response,file,fileList){
                var obj = response;
                var flag = true;
                for(var i=0;i<obj.length;i++){
                    for(var j = 0;j < this.tableData3.length;j++){
                        if(obj[i].number == this.tableData3[j].number){
                            flag = false;
                        }
                    }
                    if(flag){
                        this.tableData3.push(obj[i]);
                    }
                }
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    duration: 1000,
                });
            },
            handleEdit(index, row) {
                this.$router.push({path:"/editMember",query:row})
            },
            handleDelete(index, row) {
                var that = this;
                var id = row.id;
                fetch("/member/delete?id="+id).then(function (e) {
                    return e.text();
                }).then(function (e) {
                    if(e == "success"){
                        that.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000,
                        });
                        that.tableData3.splice(index,1);
                    }else {
                        that.$message({
                            message: '删除失败',
                            type: 'error',
                            duration: 1000,
                        });
                    }
                })
            }
        }
    }
</script>

<style>
    .el-main[data-v-c5df416e]{
        line-height: normal;
    }
    th{
        font-size: 18px;
    }
</style>
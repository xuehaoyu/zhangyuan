<template>
    <div>
    <el-table
            v-loading="loading"
            :data="tableData3"
            height="480"
            border
            style="width: 100%">
        <el-table-column
                prop="id"
                label="新闻ID"
                width="180">
        </el-table-column>
        <el-table-column
                prop="title"
                label="新闻标题"
                width="180">
        </el-table-column>
        <el-table-column
                prop="time"
                label="发布时间"
                width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-button-group style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-arrow-left" @click="upPage">上一页</el-button>
            <el-button type="primary"  @click="downPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3:[],
                fileList: [],
                loading: true,
                pages:0,
                flag:true,
            }
        },
        created(){
            var that = this;
            fetch("/ajax/news/select?pages="+this.pages).then(function (e) {
                return e.json();
            }).then(function (e) {
                that.tableData3 = e;
                that.loading = false;
            })
        },
        methods:{
            handleDelete(index, row) {
                var that = this;
                var id = row.id;
                fetch("/ajax/news/delete?id="+id).then(function (e) {
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
            },
            upPage(){
                var that = this;
                this.pages = this.pages <= 0?0:this.pages-1;
                fetch("/ajax/news/select?pages="+this.pages).then(function (e) {
                    return e.json();
                }).then(function (e) {
                    that.tableData3 = e;
                    that.loading = false;
                })
            },
            downPage(){
                var that = this;
                if(this.flag){
                    this.pages++;
                    fetch("/ajax/news/select?pages="+this.pages).then(function (e) {
                        return e.json();
                    }).then(function (e) {
                        if(e.length == 0){
                            that.flag = false;
                        }
                        that.tableData3 = e;
                        that.loading = false;
                    })
                }else {
                    this.$message({
                        message:"没有很多新闻内容了！",
                        duration:1500,
                    })
                }
            },
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
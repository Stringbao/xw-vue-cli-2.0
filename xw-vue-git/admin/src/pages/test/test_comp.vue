<template>
    <div class="bg">
        {{msg}}
    </div>
</template>

<script>
    import commonUtil from "../../core/tool/commonUtil.js";

    export default {
        name: "TestComp",
        data(){
            return {
                oldId:"",
                msg:"",
                //0, 准备发送
                //1, 发送中
                //2, 发送完毕
                status:"0",
                ctl:null
            }
        },
        methods:{
            doHttp(id){
                if(this.status == 1){
                    console.log(this.oldId + "取消请求成功");
                    this.ctl && this.ctl.abort();
                }
                console.log(id + "正在发送请求");
                this.status = 1;
                let res = this.ajax.getFetch("/tpl/component/myfragments?id="+id);
                this.ctl = res.controller;
                res.promise.then(x=>{
                    this.msg = id + "发送请求完毕";
                    this.status == 2;
                })
                this.oldId = id;
            }   
        },
        mounted(){
            this.msg = "ajax准备就绪";
        }
    }
</script>

<style scoped>
</style>
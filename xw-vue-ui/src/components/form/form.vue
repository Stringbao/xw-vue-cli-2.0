
<template>
    <div class="le_comps_core_css formStyle">
        <div class="container">
            <div class="medium formDiv">
                <form class="clearfix">
                    <slot></slot>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import tool from "../leCompsTool.js";
export default {
    name:"LeForm",
    props:["labelWidth"],
    data(){
        return {
            subComps:[],
            allComps:[]
        }
    },
    methods:{
        initSubComponents(){
            this.subComps = [];
            this.getAllSubComponents(this.$children);
        },
        getAllSubComponents(arr){
            if(arr && arr instanceof Array && arr.length >=1){
                for(let i =0;i< arr.length;i++){
                    let comp = null;
                    if(arr[i].validataComponentType == "HOC"){
                        comp = arr[i].getCurrentComponent();
                    }else{
                        comp = arr[i];
                    }
                    if(comp.$attrs.checkVerifyEnabled && comp.$attrs.checkVerifyEnabled() && comp.validataComponentType != undefined){
                        this.subComps.push(comp);
                    }
                    this.allComps.push(comp);
                }
            }else{
                return;
            }
        },
        reset(){
            this.allComps.length >0 && this.allComps.forEach(comp=>{
                //先执行自身重写的reset方法，如果没有重写，执行HOC组件传递过来的方法
                if(comp.reset){
                    comp.reset();
                }else{
                    comp.$attrs.reset && comp.$attrs.reset();
                }
            })
        },
        validate(){
            this.initSubComponents();
            if(this.subComps.length == 0){
                return new Promise(function(resolve,reject){
                    resolve({
                        success:true,
                        errorInfo:[],
                        msg:"No components to verify were found"
                    })
                })
            }else{
                let tmp = this.subComps;
                let count = 0;
                let res = {success:false,info:[]};
                let errorComps = [];
                for(let i=0;i<tmp.length;i++){
                    let vInputRes = tmp[i].$attrs.getVerifyResult();
                    if(!vInputRes.success){
                        count++;
                        res.info.push(vInputRes.msg);
                        errorComps.push(tmp[i]);
                    }
                }
                res.success = count == 0?true:false;
                return new Promise((resolve,reject)=>{
                    if(res.success){
                        resolve(res);
                    }else{
                        //显示出错组件的错误信息
                        errorComps.forEach(comp=>{
                            comp.$attrs.setStateByFlag(2);
                        })
                        reject(res);
                    }
                })
            }
        }
    },
    mounted(){
        this.initSubComponents();
        if(this.labelWidth){
            this.allComps.forEach(x=>{
                x.$set(x.$attrs, "labelWidth", this.labelWidth);
                //推送消息给所有的子组件，现在需要变化labelWidth, 需要匹配组件的uid
                tool._form_event_publisher.broadcast(x._uid,this.labelWidth);
            })            
        }
    }
}
</script>

<style scoped>
    form{
        text-align: left;
    }

    .formStyle{
        width: 100%;
        min-width: 500px;
        /* height: 90%;
        overflow-y: scroll;  */
    }

    .formStyle .container{
        width: 100%;
        padding: 0; 
        height:auto;
        padding-bottom: 0px;
    }

    .formStyle::-webkit-scrollbar{
        width: 0px;
        height: 0;
        background-color:transparent;
    }

    .formStyle .container .formDiv{
        text-align: center;
        padding:10px 0;
    }

    .formStyle .form-item{
        line-height: normal;
        margin-bottom: 22px;
        position: relative;
        text-align: left;
        display: inline-block;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .formStyle .form-item .form-item-label{
        width: 18%;
        margin-right: 6px;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0;
        box-sizing: border-box;
        margin-bottom: 0;
    }

    .formStyle .medium .form-item .form-item-label{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .formStyle .small .form-item .form-item-label{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }

    .formStyle .mini .form-item .form-item-label{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .formStyle .form-item .form-item-div{
        display: inline-block;
        line-height: normal;
        width: 35%;
        vertical-align: top;
        flex: 1;
    }

    .formStyle .required::before{
        content: "*";
        color: #f56c6c;
        font-size: 12px;
        margin-right: 2px;
    }
    
    .formStyle .form-item .form-item-input{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
        outline: none;
    }

    .formStyle .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }

    .formStyle .medium .form-item .form-item-input{
        height: 38px;
        line-height: 38px;
        font-size: 14px;
    }

    .formStyle .small .form-item .form-item-input{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
    }

    .formStyle .mini .form-item .form-item-input{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }
</style>
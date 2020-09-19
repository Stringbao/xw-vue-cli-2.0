<template>
    <span class="asBtn" @click.stop="submit" :disabled="cdisabled && submitDisabled" :class="[data.cls,disabledClass]"><i class="fa" :class="data.iCls"></i>{{value}}</span>	
</template>
<script>

import DEFINE_KEY from "../define.js";
import tool from "../leCompsTool.js";

function isPromise(obj) {
    return !!obj  //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
        && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
        && typeof obj.then === 'function';
}

export default {
    name:"LeButton",
    props:["type","value","disabled"],
    inheritAttrs:false,
    data(){
        return {
            submitDisabled:false
        }
    },
    computed:{
        cdisabled(){
            if(!this.disabled){
                return false;
            }
            if(typeof this.disabled == "string"){
                return this.disabled=="true"?true:false;
            }else{
                return new Boolean(this.disabled);
            }
        },
        disabledClass(){
            if(!this.disabled){
                return '';
            }else{
                return 'disabledIcon'
            }
        },
        _type(){
            let _type = "default";
            if(this.type){
                _type = this.type;
            }
            return _type;
        },
        data(){
            let tmp = {cls:"",iCls:"",value:""};
            let _tmpObj = tool.object.cloneObj(DEFINE_KEY.BUTTON_CONFIG);
            tmp = _tmpObj[this._type];
            if(!tmp){
                tmp = {cls:"default",iCls:"",value:""};
            }else{
                if(this.cdisabled){
                    tmp.cls = tmp.cls + " isDisabled";
                }else{
                    tmp.cls = tmp.cls.replace('isDisabled','');
                }
            }
            return tmp;
        }
    },
    methods:{
        submit(){
            if(this.submitDisabled){
               return;
            }
            this.submitDisabled = true;
            
            let ckFn = this.$listeners.click();
            ckFn.catch(err=> console.log(err));
            if(isPromise(ckFn)){
                return ckFn.then(x=>{
                    this.submitDisabled = false;
                    return Promise.resolve();
                }).catch(err=>{
                    this.submitDisabled = false;
                    return Promise.reject(err);
                })
            }else{
                throw new Error("This function must return a Promise Object");
            }
        }
    },
    mounted(){
    }
}   
</script>
<style scoped>
    .isDisabled{
        color: #fff;
        /* background-color: #a0cfff !important;
        border-color: #a0cfff !important; */
        opacity:0.6; 
        cursor: not-allowed;
    }

    .isDisabled:hover{
        opacity:0.6 !important; 
        cursor: not-allowed;
    }

    span{
        height: 30px;
        line-height: 30px;
        display: inline-block;
        outline: none;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        color: #fff;
        font-size: 12px !important;
        cursor: pointer;
        padding: 0 13px 0 22px;
        position: relative;
        margin: 3px;
        /* vertical-align: text-bottom; */
    }

    span .fa{
        position: absolute;
        top: 8px;
        left: 5px;
    }

    .default{
        padding: 0 13px;
        background-color: #fff;
        color: #3e3a3a;
        border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    }

    .search{
        background-color: #5e9bec;
        border-color:#5e9bec;
    }
    .create{
        background-color: #49cfad;
        border-color: #49cfad;
    }

    .download{
        background-color: #35bb9c;
        border-color: #35bb9c;
    }

    .update{
        background-color: #a2d469;
        border-color: #a2d469;
    }

    .remove{
        background-color: #f4364c;
        border-color: #f4364c;
    }

    .approve{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .reject{
        background-color: #f6bb43;
        border-color: #f6bb43;
    }

    .start{
        background-color:#35bb9c;
        border-color: #35bb9c; 
        color: #fff;
    }

    .stop{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .info{
        background-color: #3bafda;
        border-color: #3bafda;
    }

    .reset{
        background-color: #5e9bec;
        border-color: #5e9bec;
    }

    .up{
        background-color: #a2d469;
        border-color: #a2d469;
    }

    .down{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }
    
    .upload{
        background-color: #72d77b;
        border-color: #72d77b;
        color: #fff;
    }

    .publish{
        background-color: #49cfad;
        border-color: #49cfad;
    }

    .cancelPublish{
        background-color: #5e9bec;
        border-color:#5e9bec;
    }

    .import{
        background-color:#a2d469;
        border-color: #a2d469;
    }

    .export{
        background-color:#4fc1e9;
        border-color: #4fc1e9;
    }

    .review{
        background-color: #35bb9c;
        border-color: #35bb9c;
    }

    .batch{
        background-color: #4b89dc;
        border-color: #4b89dc;
    }

    .copy{
        background-color: #4b99dc;
        border-color: #4b99dc;
    }

    .setting{
        background-color: #4fc1e9;
        border-color:#4fc1e9;
    }

    .decorate{
        background-color: #ad92ed;
        border-color: #ad92ed;
    }

    .prevPage{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
        padding-left: 13px;
    }

    .nextPage{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
        padding-left: 13px;
    }

    .confirm{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
        padding-left: 13px;
    }

    .save{
        background-color: #a2d469;
        border-color: #a2d469;
        padding-left: 13px;
    }

    .back{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
    }

    .cancel{
        background-color: #bababa;
        border-color: #bababa;
        padding-left: 13px;
    }

    .choose{
        background-color: #5e9bec;
        border-color: #5e9bec;
        padding-left: 13px;
    }

    .holdSave{
        background-color: #8dc051;
        border-color: #8dc051;
        padding-left: 13px;
    }

    .prev{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
        padding-left: 13px;
    }

    .next{
        background-color: #4fc1e9;
        border-color: #4fc1e9;
        padding-left: 13px;
    }

    .warning{
        background-color: #bec121;
        border-color: #bec121;
    }

    button i{
        font-size: 12px !important;
        margin-right: 4px;
    }

    .close{
        background-color: gray;
        border-color:black;
    }

    .asBtn:hover{
        opacity: 0.8;
    }

    .asBtnHover{
        opacity: 0.8;
        color: red;
    }
</style>

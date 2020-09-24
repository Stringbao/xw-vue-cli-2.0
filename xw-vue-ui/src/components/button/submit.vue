<template>
    <span class="asBtn" @click.stop="submit" :disabled="cdisabled && submitDisabled" :class="[data.cls,disabledClass]">
        <!-- <i class="fa" :class="data.iCls"></i> -->
        {{value}}
    </span>	
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
    span.asBtn{
        display: inline-block;
        outline: none;
        cursor: pointer;
        padding: 0px 12px;
        background-color:#fbfbf9;
        color: #76777b;
        font-size: 13px;
        line-height: 30px;
        letter-spacing: 0px;
        border-radius: 6px;
	    border: solid 1px #c9c9cb;
    }

    span .fa{
        position: absolute;
        top: 8px;
        left: 5px;
    }

    .asBtn.remove:hover{
        background-color: #ed5564;
        background-image: none;
        border-color: #ed5564;
        color: #ffffff;
    }

    .asBtn:hover{
        background-image: linear-gradient(0deg, 
		#404353 0%, 
		#575a6d 100%);
        color: #fff;
    }

    .asBtnHover{
        opacity: 0.8;
        color: red;
    }
    .asBtn.isDisabled{
        background-color: #fbfbf9;
        color: #c9c9c9;
        cursor: not-allowed;
    }
    .asBtn.isDisabled:hover{
        background-image: none;
        background-color: #fbfbf9;
        color: #c9c9c9;
        border-color: #c9c9cb;
        cursor: not-allowed;
    }
</style>

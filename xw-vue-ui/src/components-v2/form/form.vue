
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
import FormUtil from "./formUtil.js";
export default {
    name:"LeForm",
    props:["labelWidth"],
    provide(){
        return {
            leForm:this
        }
    },
    data(){
        return {
            allValidateComps:[],
            failedComponents:[],
            successComponents:[]
        }
    },
    methods:{
        //provide方法
        checkSubComponentVerify(component){
            if(component.on === "" || component.on){
                return true;
            }
            return false;
        },
        collectSubComponentRules(component){
            let _rule = [];
            if(component.required === "" || component.required){
                _rule.push({
                    msg:FormUtil.getErrorMsg(component, "required"),
                    fn:FormUtil.verifyRequire()
                })
            }
            if(component.max){
                _rule.push({
                    msg:FormUtil.getErrorMsg(component, "max"),
                    fn:FormUtil.verifyMax(component.max)
                })
            }
            if(component.min){
                _rule.push({
                    msg:FormUtil.getErrorMsg(component, "min"),
                    fn:FormUtil.verifyMin(component.min)
                })
            }
            
            if(component.vType){
                _rule.push({
                    msg:FormUtil.getErrorMsg(component, "vType"),
                    fn:FormUtil.verifyVtype(component.vType)
                })
            }
            let subRules = component.rules;
            if(subRules && typeof subRules == "function"){
                _rule.push({
                    msg:FormUtil.getErrorMsg(component, "rules"),
                    fn:subRules
                })
            }
            if(subRules && typeof subRules == "object" && (subRules instanceof Array)== false){
                for(let key in subRules){
                    let ss = FormUtil.getErrorMsg(component, key);
                    _rule.push({
                        msg:FormUtil.getErrorMsg(component, key),
                        fn:subRules[key]
                    })
                }
            }
            return _rule;
        },
        validateSubComponent(component){
            let value = component.getValue();
            let res = this.collectSubComponentRules(component);
            return res.every(item=>{
                let success = item.fn(value);
                component.state.showError = !success;
                component.state.errorMsg = !success?item.msg:"";
                return success;
            });
        },
        resetSubComponent(component){
            component.state.showError = false;
            component.state.errorMsg = "";
        },
        //因为$emit是异步的，所以无法实时获取到v-model的值，所以抽象出一个方法等待$emit执行完毕后开始验证
        verifySubComponentAfterEmit(component){
            component.$nextTick(()=>{
                if (this.checkSubComponentVerify(component)) {
                    this.validateSubComponent(component);
                }
            })
        },
        //form表单使用方法
        getAllValidateSubComponents(comps){
            comps.forEach(comp => {
                console.log(comp)
                if(FormUtil.verifyIsOn(comp)){
                    //只读组件不参与验证
                    if(!comp.readonlyFlag){
                        this.allValidateComps.push(comp);
                    }
                }else{
                    if(comp.$children.length){
                        this.getAllValidateSubComponents(comp.$children);
                    }
                }
            });
        },
        validate(){
            this.successComponents = [];
            this.failedComponents = [];
            this.allValidateComps.forEach(item=>{
                if(!this.validateSubComponent(item)){
                    this.failedComponents.push(item);
                }else{
                    this.successComponents.push(item);
                }
            })
            if(this.failedComponents.length == 0){
                return Promise.resolve(this.successComponents);
            }else{
                this.failedComponents[0].focus && this.failedComponents[0].focus();
                return Promise.reject(this.failedComponents);
            }
        },
        reset(){
            this.allValidateComps.forEach(component=>{
                component.$emit("input","");
                component.state.showError = false;
                component.state.errorMsg = "";
            })
        },
        init(){
            this.allValidateComps = [];
            this.getAllValidateSubComponents(this.$children);
        }
    },
    mounted(){
        this.init();
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
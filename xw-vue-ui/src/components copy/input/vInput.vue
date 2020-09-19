<template>
    <div class="form-item">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined && $attrs.required!=undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div fa" :class="state.successIcon">
            <input :ref="inputKey" @click="inputClick($event)" :placeholder="placeholderStr" class="form-item-input" :class="{'readonlyIcon':readonlyFlag}" @keyup.enter="enterEvent($event)" v-on:blur="blurEvent($event)" :readonly="readonlyFlag" :type="$attrs.vType=='password'?'password':'text'" :value="currentValue" v-on:input="changeEvent($event)" />
            <i v-show="showClear" class="fa fa-times-circle icon-del" @click.stop="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            <p class="tip" v-show="!state.showError">{{$attrs.tip}}</p>
        </div>
    </div>
</template>

<script>
    import define from "../define.js";
    import tool from "../leCompsTool.js";
    export default{
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
        name:"LeInput",
        //不能显示声明props，必须从HOC里面传递下来，然后通过$attrs获取，因为props不让修改
        //props:["msg","vType","regex","off"],
        props:["value"],
        data(){
            return {
                //所有需要验证的组件必须带上这个validataType属性，这个属性的值可以为input，select，radio等需要验证的组件 
                validataComponentType:"Input",
                state:{
                    showError:false,
                    successIcon:""
                },
                currentValue:this.value,
                formLabelWidth:"0",
                inputKey:tool._idSeed.newId()
            }
        },
        computed:{
            labelWidthVal(){
                if(this.$attrs.labelWidth){
                    return this.$attrs.labelWidth;
                }
                if(this.formLabelWidth != 0){
                    return this.formLabelWidth;
                }
                return define.LABELWIDTH;
            },
            placeholderStr(){
                if(this.$attrs.placeholder){
                    return this.$attrs.placeholder;
                }
                return define.PLACEHOLDER.INPUT;
            },
            showClear(){
                if(this.readonlyFlag){
                    return false;
                }
                if(this.currentValue && this.currentValue.length >0){
                    return true;
                }
                return false;
            },
            readonlyFlag(){
                if(this.$attrs.readonly == undefined){
                    return false;
                }
                if(this.$attrs.readonly === ""){
                    return true;
                }
                if(this.$attrs.readonly === false){
                    return false;
                }
                return true;
            }
        },
        watch:{
            value(val){
                this.setValue(val);
            }
        },
        methods:{
            inputClick(e){
                if(this.readonlyFlag){
                    return;
                }
                this.$emit("click",e.target.value);
            },
            enterEvent(e){
                if(this.readonlyFlag){
                    return;
                }
                this.$emit("enter",e.target.value);
            },
            blurEvent(e){
                if(this.readonlyFlag){
                    return;
                }
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
                this.$emit("blur",e.target.value);
            },
            changeEvent(e){
                this.currentValue = e.target.value;
                this.$emit("input",e.target.value);
                this.$emit("change",e.target.value);
            },
            getValue(){
                return this.currentValue;
            },
            setValue(value){
                this.currentValue = value;
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },
            clear(){
                if(!this.readonlyFlag){
                    this.$emit("input","");
                }
            },
            focus(){
                this.$refs[this.inputKey].focus();
            }
        },
        created(){
            let that = this;
            tool._form_event_publisher.on(that._uid,(data)=>{
                this.formLabelWidth = data;
            });
        },
        mounted(){
            
        }
    }
</script>

<style scoped>
    .form-item{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .form-item .form-item-label{
        width: auto;
        text-align: right;
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: normal;
        padding: 0;
        box-sizing: border-box;
        margin: 0 5px 0 10px;
    }

    .form-item .form-item-div{
        width: 100%;
        line-height: normal;
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        position: relative;
        min-width: 130px;
    }    

    .form-item .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    form .form-item .form-item-div{
        position: relative;
    }

    .form-item .form-item-input{
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 20px 0 10px;
        color: #606266;
        outline: none;
    }
    .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }
  
    .form-item i{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
        right: 8px;
        cursor: pointer;
    }

    .searchMulSelect .icon-del{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
    }
</style>
<template>
    <div class="form-item">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="on != undefined && required!=undefined?'required':''">{{label}}</label>
        <div class="form-item-div fa" :class="{'fa-times-circle-o':state.showError}">
            <input :ref="inputKey" @click="inputClick($event)" :placeholder="placeholderStr" class="form-item-input" :class="{'readonlyIcon':readonlyFlag}" @keyup.enter="enterEvent($event)" v-on:blur="blurEvent($event)" :readonly="readonlyFlag" :type="vType=='password'?'password':'text'" :value="value" v-on:input="changeEvent($event)" />
            <i v-if="hideRemoveIcon==undefined?false:true" v-show="value.length>0?true:false" class="fa fa-times-circle icon-del" @click.stop="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{state.errorMsg}}</p>
            <p class="tip" v-show="!state.showError">{{tip}}</p>
        </div>
    </div>
</template>

<script>
    import define from "../define.js";
    import tool from "../leCompsTool.js";
    export default{
        name:"LeInput",
        props:["on","required","max","min","vType","tip","msg","rules","value","labelWidth","placeholder","hideRemoveIcon","readonly","label"],
        inject:["leForm"],
        data(){
            return {
                validataComponentType:"Input",
                inputKey:tool._idSeed.newId(),
                state:{
                    showError:false,
                    errorMsg:""
                },
                componentKey:tool._idSeed.newId()
            }
        },
        computed:{
            labelWidthVal(){
                return this.labelWidth || this.leForm.labelWidth || define.LABELWIDTH;
            },
            placeholderStr(){
                return this.placeholder || define.PLACEHOLDER.INPUT;
            },
            readonlyFlag(){
                let rd = this.readonly;
                if(rd === "" || rd){
                    return true;
                }
                return false;
            }
        },
        methods:{
            inputClick(e){
                if(this.readonlyFlag){
                    return;
                }
                this.$emit("click", e.target.value);
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
                if(this.leForm.checkSubComponentVerify(this)){
                    this.leForm.validateSubComponent(this);
                }
                this.$emit("blur",e.target.value);
            },
            changeEvent(e){
                this.$emit("input",e.target.value);
                this.$emit("change",e.target.value);
            },
            getValue(){
                return this.value;
            },
            setValue(value){
                
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
    .form-item .fa-times-circle-o .form-item-input:focus{
        border: 1px solid #f56c6c;
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
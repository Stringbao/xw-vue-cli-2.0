<template>
    <div class="form-item" :style="{height:_height,width:_width}">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="on != undefined?'required':''">{{label}}</label>
        <div class="form-item-div fa" :class="{'fa-times-circle-o':state.showError}">
            <textarea :placeholder="placeholderStr" :class="{readonlyIcon:readonlyFlag}" v-on:blur="blurEvent($event)" :readonly="readonlyFlag" class="form-item-input" :value="value" v-on:input="changeEvent($event)"></textarea>
            <i  v-if="showClearBtn" v-show="value.length" class="fa fa-times-circle icon-del" @click.stop="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{state.errorMsg}}</p>
            <p class="tip" v-show="!state.showError">{{tip}}</p>
        </div>
    </div>
</template>

<script>
    import define from "../define.js";
    import tool from "../leCompsTool.js";
    export default{
        name:"LeTextarea",
        props:["on","required","max","min","vType","tip","msg","rules","label","value","width","height","readonly","placeholder","showClear"],
        inject:["leForm"],
        data(){
            return {
                componentKey:tool._idSeed.newId(),
                state:{
                    showError:false,
                    errorMsg:""
                },
            }
        },
        computed:{
            _height(){
                if(this.height){
                    return this.height + "px";
                }
                return "100px";
            },
            _width(){
                if(this.width){
                    if(this.width.toString().indexOf('%') != -1){
                        return this.width;
                    }
                    return this.width + "px";
                }
                return "100%"
            },
            labelWidthVal(){
                return this.labelWidth || this.leForm.labelWidth || define.LABELWIDTH;
            },
            placeholderStr(){
                return this.placeholder || define.PLACEHOLDER.INPUT;
            },
            showClearBtn(){
                if(this.showClear === "" || this.showClear === undefined ||this.showClear){
                    return true;
                }
                return false;
            },
            readonlyFlag(){
                if(this.readonly === "" || this.readonly){
                    return true;
                }
                return false;
            }
        },
        watch:{
        },
        methods:{
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
                    console.log(this.leForm.checkSubComponentVerify(this))
                    this.$nextTick(()=>{
                        if(this.leForm.checkSubComponentVerify(this)){
                            this.leForm.validateSubComponent(this);
                        }
                    })
                }
            }
        },
        mounted(){
            
        }
    }
</script>

<style scoped>
   
    .form-item .form-item-input{
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 40px;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8% 0 4%;
        color: #606266;
        outline: none;
        resize: none;
    }
    .form-item .form-item-input:focus{
        border: 1px solid #409eff;
        outline: none;
    }

    .form-item .form-item-input.readonlyIcon:focus{
        border-color: #dcdfe6;
    }

    .form-item .form-item-div{
        height: 100%;
    }

    .form-item .form-item-input{
        line-height: normal;
        font-size: 14px;
        height: 100%;
        vertical-align: middle;
        padding: 7px 30px 7px 10px;
    }

    .form-item .form-item-input.readonlyIcon{
        background-color: #f1f1f1;
    }

    .form-item i{
        position: absolute;
        top: 50%;
        color: #c0c4cc;
        font-weight: normal;
        transform: translateY(-50%);
        right: 8px;
        cursor: pointer;
    }

     .form-item i{
        position: absolute;
        top: 50%;
        color: #c0c4cc;
        font-weight: normal;
        right: 18px;
        cursor: pointer;
        transform: translateY(-50%);
    }

    .fa-times-circle-o .form-item-input{
        border: 1px solid #f56c6c;
    }

    .fa-check-circle-o .form-item-input{
        border: 1px solid #67c23a;
    }

    .fa.fa-times-circle-o{
        position: relative;
    }

    .fa.fa-check-circle-o{
        position: relative;
    }

    .searchMulSelect .icon-del{
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
    }
</style>
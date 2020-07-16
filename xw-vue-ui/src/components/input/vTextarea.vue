<template>
    <div class="form-item" :style="{height:_height,width:_width}">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div fa" :class="state.successIcon">
            <textarea :placeholder="placeholderStr" :class="{readonlyIcon:readonlyFlag}" v-on:blur="blurEvent($event)" :readonly="readonlyFlag" class="form-item-input" :value="currentValue" v-on:input="changeEvent($event)"></textarea>
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
        name:"LeTextarea",
        //不能显示声明props，必须从HOC里面传递下来，然后通过$attrs获取，因为props不让修改
        props:["value","width","height","readonly"],
        data(){
            return {
                textareaKey:tool._idSeed.newId(),
                //所有需要验证的组件必须带上这个validataType属性，这个属性的值可以为input，select，radio等需要验证的组件 
                validataComponentType:"TextArea",
                state:{
                    showError:false,
                    successIcon:""
                },
                currentValue:this.value,
                formLabelWidth:"0"
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
                if(this.readonly == undefined){
                    return false;
                }
                if(this.readonly === ""){
                    return true;
                }
                if(this.readonly === false){
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
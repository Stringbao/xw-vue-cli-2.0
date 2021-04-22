<template>
    <div>
        <div class="form-item" :style="{ height: _height, width: _width }">
            <label
                :style="{ width: labelWidthVal + 'px' }"
                class="form-item-label"
                :class="{'required':isVertify && isRequired}"
                >{{ label }}</label
            >
            <div
                class="form-item-div fa"
                :class="{ 'fa-times-circle-o': state.showError }">
                <textarea
                    :ref="componentKey"
                    :placeholder="placeholder"
                    :class="{ readonlyIcon: readonlyFlag }"
                    :disabled="readonlyFlag"
                    :readonly="readonlyFlag"
                    class="form-item-input"
                    :value="value"
                    @keyup.enter="enterEvent($event)"
                    @focus="focusEvent($event)"
                    @blur="blurEvent($event)"
                    @change="changeEvent($event)"
                    @input="inputEvent($event)"
                ></textarea>
                <i
                    v-if="showClearBtn"
                    v-show="value.length"
                    class="fa fa-times-circle icon-del"
                    @click.stop="clear"
                ></i>
                <p class="promptMsg" v-show="state.showError">
                    {{ state.errorMsg }}
                </p>
                <p class="tip" v-show="!state.showError">{{ tip }}</p>
            </div>
        </div>
        <p>
            <span class="asBtn" @click="clickHandlePre" :disabled="cdisabled" :class="[data.cls,disabledClass]">
                {{values}}
            </span>
        </p>
        <p>
            <span class="asBtn" @click="clickHandlePro" :disabled="cdisabled" :class="[data.cls,disabledClass]">
                {{values1}}
            </span>
        </p>
        
    </div>
</template>

<script>
import Constant from "../contant/index.js";
import {$idSeed,$obj} from "../leCompsTool.js";
export default {
    name: "LeTextarea",
    props: {
        on: {
            type: Boolean | String,
            default: false,
        },
        required: {
            type: Boolean | String,
            default: false,
        },
        max: {
            type: Number,
        },
        min: {
            type: Number,
        },
        vType: {
            type: String,
        },
        msg: {
            type: String | Object,
        },
        tip: {
            type: String,
        },
        rules: {
            type: Function | Object,
        },
        value: {},
        placeholder: {
            type: String,
            default: Constant.TEXTAREA.PLACEHOLDER,
        },
        labelWidth: {
            type: Number | String,
        },
        showClear: {
            type: Boolean | String,
            default: false,
        },
        readonly: {
            type: Boolean | String,
            default: false,
        },
        label: {
            type: String,
        },
        width: {
            type: String | Number,
            default: Constant.TEXTAREA.WIDTH,
        },
        height: {
            type: String | Number,
            default: Constant.TEXTAREA.HEIGHT,
        },
        type: {
            type: String,
        },
        values: {
            type: String
        },
        disabled: {
            type: Boolean | String,
            default: false,
        },
        values1: {
            type: String
        }
    },
    inject: {
        leForm:{
            default: ""
        }
    },
    data() {
        return {
            componentKey: $idSeed.newId(),
            state: {
                showError: false,
                errorMsg: "",
            },
        };
    },
    computed: {
        _leFormLableWidth() {
            return (this.leForm || {}).labelWidth;
        },
        isVertify(){
            if (this.on === "" || this.on) {
                return true;
            }
            return false; 
        },
        isRequired(){
            if (this.required === "" || this.required) {
                return true;
            }
            return false;
        },
        _height() {
            return this.height + "px";
        },
        _width() {
            if (this.width.indexOf("px") != -1) {
                return this.width + "px";
            }
            return this.width;
        },
        labelWidthVal() {
            return (
                this.labelWidth ||
                this._leFormLableWidth ||
                Constant.TEXTAREA.LABEL_WIDTH
            );
        },
        showClearBtn() {
            if(this.readonlyFlag){
                return false;
            }
            if (
                this.showClear === "" ||
                this.showClear === undefined ||
                this.showClear
            ) {
                return true;
            }
            if (
                this.leForm&&this.leForm.showClear === "" ||
                this.leForm&&this.leForm.showClear === undefined ||
                this.leForm&&this.leForm.showClear
            ) {
                return true;
            }
            return false;
        },
        readonlyFlag() {
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },

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
            let _tmpObj = $obj.clone(Constant.BUTTON.ICON_CONFIG);
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
    methods: {
        //event begin
        focus() {
            this.$refs[this.componentKey].focus();
        },
        focusEvent(e) {
            this.focus();
            this.$emit("focus", e.target.value);
        },
        enterEvent(e) {
            this.$emit("enter", e.target.value);
            this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
        },
        blurEvent(e) {
            this.$emit("blur", e.target.value);
            this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
        },
        changeEvent(e) {
            this.$emit("change", e.target.value);
            this.$emit("input", e.target.value);
            this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
        },
        inputEvent(e) {
            this.$emit("input", e.target.value);
            this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
        },
        //event end
        getValue() {
            return this.value;
        },
        clear() {
            if (!this.readonlyFlag) {
                this.$emit("input", "");
                this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
            }
        },

        clickHandlePre(){
            if(!this.disabled){
                this.$emit('clickHandlePre',this.value);
            }
        },
        clickHandlePro(){
            if(!this.disabled){
                this.$emit('clickHandlePro',this.value);
            }
        },
        submit(){
            this.$emit('submit');
        }
    },
    mounted() {},
};
</script>

<style scoped>
    .form-item .form-item-input {
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
    .form-item .form-item-input:focus {
        border: 1px solid #409eff;
        outline: none;
    }

    .form-item .form-item-input.readonlyIcon:focus {
        border-color: #dcdfe6;
    }

    .form-item .form-item-div {
        height: 100%;
    }

    .form-item .form-item-input {
        line-height: normal;
        font-size: 14px;
        height: 100%;
        vertical-align: middle;
        padding: 7px 30px 7px 10px;
    }

    .form-item .form-item-input.readonlyIcon {
        background-color: #f1f1f1;
    }

    .form-item i {
        position: absolute;
        top: 50%;
        color: #c0c4cc;
        font-weight: normal;
        transform: translateY(-50%);
        right: 8px;
        cursor: pointer;
    }

    .form-item i {
        position: absolute;
        top: 50%;
        color: #c0c4cc;
        font-weight: normal;
        right: 18px;
        cursor: pointer;
        transform: translateY(-50%);
    }

    .form-item .fa-times-circle-o .form-item-input {
        border: 1px solid #f56c6c;
    }

    .form-item .fa-check-circle-o .form-item-input {
        border: 1px solid #67c23a;
    }

    .fa.fa-times-circle-o {
        position: relative;
    }

    .fa.fa-check-circle-o {
        position: relative;
    }

    .searchMulSelect .icon-del {
        position: absolute;
        top: 12px;
        color: #c0c4cc;
        font-weight: normal;
    }

    p{
        margin-top: 10px;
        padding: 0 8% 0 10%;
    }
    

    span.asBtn{
        text-align: right;
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

    .le_dialog_contine{
        flex:1;
        overflow:auto;
        font-size: 14px;
        color: #606266;
        text-align: left;
        position: relative;
        padding: 0px 30px;
    }


    .dialogBtnContent{
        text-align: right;
        border-top: 1px solid #ccc;
        background-color: #fff;
        padding: 22px 30px;
        background-color: #ecf0f1;
        border-radius: 0 0 4px 4px;
    }
</style>

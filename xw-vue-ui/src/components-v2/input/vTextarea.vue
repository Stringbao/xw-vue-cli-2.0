<template>
    <div class="form-item" :style="{ height: _height, width: _width }">
        <label
            :style="{ width: labelWidthVal + 'px' }"
            class="form-item-label"
            :class="{'required':isVertify && isRequired}"
            >{{ label }}</label
        >
        <div
            class="form-item-div fa"
            :class="{ 'fa-times-circle-o': state.showError }"
        >
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
</template>

<script>
import Constant from "../contant/index.js";
import {$idSeed} from "../leCompsTool.js";
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
</style>

<template>
    <div class="form-item">
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
            <input
                :type="type"
                :ref="componentKey"
                :placeholder="placeholder"
                class="form-item-input"
                :class="{ readonlyIcon: readonlyFlag }"
                @keyup.enter="enterEvent($event)"
                @focus="focusEvent($event)"
                @blur="blurEvent($event)"
                @change="changeEvent($event)"
                @input="inputEvent($event)"
                :readonly="readonlyFlag"
                :value="value"
            />
            <i
                v-if="showClearBtn"
                v-show=" value.toString().length > 0 ? true : false"
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
    name: "LeInput",
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
        value: {
            type: String | Number | Boolean,
        },
        placeholder: {
            type: String,
            default: Constant.INPUT.PLACEHOLDER,
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
        type: {
            type: String,
            default: "text",
        },
    },
    inject: {
        leForm:{
            default: ""
        }
    },
    data() {
        return {
            state: {
                showError: false,
                errorMsg: "",
            },
            componentKey: $idSeed.newId(),
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
        labelWidthVal() {
            return this.labelWidth ||this._leFormLableWidth || Constant.INPUT.LABEL_WIDTH;
        },
        readonlyFlag() {
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        showClearBtn() {
            if (this.showClear === "" ||this.showClear === undefined ||this.showClear) {
                return true;
            }
            if (this.leForm&&this.leForm.showClear === "" ||this.leForm&&this.leForm.showClear === undefined ||this.leForm&&this.leForm.showClear) {
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
.form-item {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-item .form-item-label {
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

.form-item .form-item-div {
    width: 100%;
    line-height: normal;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    position: relative;
    min-width: 130px;
}

.form-item .fa-times-circle-o .form-item-input {
    border: 1px solid #f56c6c;
}

form .form-item .form-item-div {
    position: relative;
}

.form-item .form-item-input {
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
.form-item .form-item-input:focus {
    border: 1px solid #409eff;
    outline: none;
}
.form-item .fa-times-circle-o .form-item-input:focus {
    border: 1px solid #f56c6c;
    outline: none;
}

.form-item i {
    position: absolute;
    top: 12px;
    color: #c0c4cc;
    font-weight: normal;
    right: 8px;
    cursor: pointer;
}

.searchMulSelect .icon-del {
    position: absolute;
    top: 12px;
    color: #c0c4cc;
    font-weight: normal;
}
</style>

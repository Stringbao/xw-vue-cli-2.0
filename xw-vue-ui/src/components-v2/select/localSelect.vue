<template>
    <div style="position: relative" class="form-item selectContent">
        <label
            :style="{ width: labelWidthVal + 'px' }"
            class="form-item-label"
            :class="{'required':isVertify && isRequired}"
            >{{ label }}</label
        >
        <div
            class="form-item-div searchMulSelect"
            :class="{ 'fa-times-circle-o': state.showError }"
            @click="focusInput"
            :ref="componentKey"
            tabindex="0"
            v-bodyClick="hideButtom"
            :_body_tag="inputdomKey"
        >
            <!--选中的标签-->
            <div
                class="tags"
                :_body_tag="inputdomKey"
                :class="{ readonlyIcon: readonlyFlag }"
                @mouseenter="showArr"
                @mouseleave="hideArr"
            >
                <i
                    v-show="showArrow"
                    :_body_tag="inputdomKey"
                    class="fa fa-chevron-down icon-del"
                    @click="clickInput"
                ></i>
                <i
                    v-show="!showArrow && showClearBtn"
                    class="fa fa-chevron-down icon-del fa-times-circle"
                    @click.stop="clear"
                ></i>
                <span
                    class="placeholderText"
                    @click.stop="focusInput"
                    v-show="placeholderStr && (!inputFlag || readonlyFlag)"
                    >{{ placeholderStr }}</span
                >
                <left-section
                    :readonly="readonlyFlag"
                    :multiple="multiple"
                    :display-name="displayName"
                    :displayValue="displayValue"
                    :data="leftArray"
                    :notice-parent="noticeFromLeft"
                ></left-section>

                <input
                    :placeholder="placeholderStr"
                    :_body_tag="inputdomKey"
                    @click="clickInput"
                    :ref="inputdomKey"
                    :readonly="!inputFlag || readonlyFlag"
                    type="text"
                    :class="{
                        searchMsg: true,
                        hideInput: !inputFlag || readonlyFlag,
                    }"
                    v-model="searchName"
                />

                <p class="promptMsg" @click.stop v-show="state.showError">
                    {{ state.errorMsg }}
                </p>
                <p class="tip" @click.stop v-show="!state.showError">
                    {{ tip }}
                </p>
            </div>

            <!--下拉弹出框-->
            <buttom-section
                :show-buttom="showButtom"
                :display-name="displayName"
                :displayValue="displayValue"
                :searchKey="searchName"
                :data="buttomArray"
                :notice-parent="noticeFromButtom"
            ></buttom-section>
        </div>
    </div>
</template>

<script>
import { $idSeed, $util, $obj } from "../leCompsTool.js";
import LeftSection from "./left.vue";
import ButtomSection from "./buttom.vue";
import Constant from "../contant/index.js";

const getItemByDisplayValue = (data, displayValue, value) => {
    let res = null;
    data.forEach((item) => {
        if (
            item[displayValue] != null &&
            item[displayValue] != undefined &&
            item[displayValue].toString() == value
        ) {
            res = item;
        }
    });
    return res;
};

export default {
    name: "LeLocalSelect",
    props: {
        on: {
            type: Boolean | String,
            default: false,
        },
        required: {
            type: Boolean | String,
            default: false,
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
        label: {
            type: String,
        },
        labelWidth: {
            type: Number | String,
        },
        multiple: {
            type: Boolean | String
        },
        displayName: {
            type: String
        },
        displayValue: {
            type: String
        },
        value: {
            type: String | Number | Boolean,
        },
        dataSource: {
            type: Array,
            default: () => []
        },
        readonly: {
            type: Boolean | String,
            default: false,
        },
        enabledInput: {
            type: Boolean | String,
            default: false,
        },
        showClear: {
            type: Boolean | String
        },
        placeholder: {
            type: String,
            default: Constant.INPUT.PLACEHOLDER,
        }
    },
    inject: {
        leForm: {
            default: "",
        },
    },
    components: { LeftSection, ButtomSection },
    data() {
        return {
            validataComponentType: "Radio",
            componentKey: $idSeed.newId(),
            inputdomKey: $idSeed.newId(),
            state: {
                showError: false,
                errorMsg: "",
            },
            searchName: "",
            data: [],
            showButtom: false,
            showArrow: true,
            placeholderStr: "",
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
            return (
                this.labelWidth ||
                this._leFormLableWidth ||
                Constant.INPUT.LABEL_WIDTH
            );
        },
        /**
         * @description 根据输入关键字来搜索
         * @returns 查询后的Array
         */
        buttomArray() {
            if (this.searchName != "") {
                return this.data.filter((item) => {
                    return (
                        item[this.displayName]
                            .toLowerCase()
                            .indexOf(this.searchName.toLowerCase()) != -1
                    );
                });
            }
            return this.data;
        },
        leftArray() {
            return $util.getCheckedItems(this.data).items;
        },
        readonlyFlag() {
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        //是否允许模糊查询，默认不开启
        inputFlag() {
            if (this.enabledInput === "" || this.enabledInput) {
                return true;
            }
            return false;
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
            return false;
        },
    },
    watch: {
        value(val) {
            this.setValue(val);
        },
        dataSource(val) {
            if (val && val.length > 0) {
                this.init(val);
                this.setValue(this.value);
            } else {
                this.init([]);
                this.$emit("input", "");
            }
        },
    },
    methods: {
       
        focus() {
            this.$refs[this.componentKey].focus();
        },
        focusInput() {
            if (this.readonlyFlag) {
                return;
            }
            this.$refs[this.inputdomKey].focus();
            this.clickInput();
        },
        hideButtom() {
            this.showButtom = false;
        },

        clickInput() {
            if (this.readonlyFlag) {
                return;
            }
            if (this.data.length != 0) {
                this.showButtom = true;
            }
        },

        inputChange() {
            let offsetWidth = parseInt(
                this.$refs[this.inputdomKey].offsetWidth
            );
            this.$refs[this.inputdomKey].style.width = offsetWidth + 5 + "px";
        },
       
        init(data) {
            let tmp = $obj.clone(data);
            this.data = $util.addPrimaryAndCk(tmp);
        },

        onEmit() {
            let selectedItems = this.getSelectedItems();
            let vals = selectedItems.vals.join(",");
            this.$emit("input", vals);
            this.$emit("change", vals);

            if (this.leForm && this.leForm.checkSubComponentVerify(this)) {
                this.leForm && this.leForm.validateSubComponent(this);
            }
        },
        checkPlaceholder() {
            let selectedItems = this.getSelectedItems();
            let vals = selectedItems.vals.join(",");
            if (vals != "") {
                this.placeholderStr = "";
            } else {
                this.placeholderStr = this.placeholder;
            }
        },

        noticeFromButtom(item) {
            //多选
            if (this.multiple != undefined) {
                item.ck = !item.ck;
                item.cls = !item.ck ? "" : "active fa fa-check";
            } else {
                //单选
                this.data.forEach((x) => {
                    if (x.__tmpId == item.__tmpId) {
                        // item.ck = !item.ck;
                        // 已选择状态 并且 showClearBtn=false时 不需要取消选中，
                        // 其他状态下直接取反即可
                        item.ck = (item.ck && !this.showClearBtn) ? item.ck : !item.ck;
                        item.cls = item.ck ? "active fa fa-check" : "";
                    } else {
                        x.cls = "";
                        x.ck = false;
                    }
                });
                this.showButtom = false;
            }
            this.searchName = "";
            this.onEmit();
        },

        noticeFromLeft(item) {
            if (this.readonlyFlag) {
                return;
            }
            item.cls = "";
            item.ck = false;
            this.onEmit();
        },
        
        getSelectedItems(filed) {
            return $util.getCheckedItems(
                this.data,
                filed ? filed : this.displayValue
            );
        },
       
        getValue() {
            if (this.data.length == 0) {
                return "";
            }
            return this.getSelectedItems().vals.join(",");
        },

        setValue(ids = "") {
            ids = "" + ids;
            ids = ids.toString();
            //重置
            this.resetDataCkStatus();
            //选中
            ids.split &&
                ids.split(",").forEach((val) => {
                    let tmp = getItemByDisplayValue(
                        this.data,
                        this.displayValue,
                        val
                    );
                    if (tmp) {
                        tmp.cls = "active fa fa-check";
                        tmp.ck = true;
                    }
                });
            this.checkPlaceholder();
        },
        resetDataCkStatus() {
            this.data.forEach((item) => {
                item.cls = "";
                item.ck = false;
            });
        },

        clear() {
            if (this.readonlyFlag) {
                return;
            }
            this.resetDataCkStatus();
            this.searchName = "";
            this.$emit("input", "");
            this.$emit("change", "");
            this.showButtom = false;
            this.leForm && this.leForm.verifySubComponentAfterEmit(this);
        },
        hideArr() {
            if (this.readonlyFlag) {
                return;
            }
            this.showArrow = true;
        },
        showArr() {
            if (this.readonlyFlag) {
                return;
            }
            if (this.leftArray.length == 0) {
                return;
            }
            if (this.showClear === '' || this.showClear) {
                this.showArrow = false;
            }
        },
    },
    mounted() {
        if (this.dataSource && this.dataSource.length > 0) {
            this.init(this.dataSource);
        }
        this.setValue(this.value);
    },
    beforeDestroy() {
       
    },
};
</script>
<style scoped>
.blueborder {
    border-color: #409eff !important;
}

.selectContent {
    position: relative;
    text-align: left;
    margin-bottom: 22px;
    display: flex;
}

.selectContent label {
    text-align: right;
    color: #606266;
    display: inline-block;
    font-size: 14px;
}

.medium .selectContent label {
    display: inline-block;
}

.searchMulSelect {
    position: relative;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    outline: none;
    display: inline-block;
    font-size: inherit;
    min-height: 40px;
    line-height: 40px;
    width: 180px;
    cursor: pointer;
    margin: 0;
    vertical-align: middle;
    padding: 0 !important;
}

.searchMulSelect input:focus {
    border-color: #409eff;
}

.searchMulSelect .tags {
    padding-right: 26px;
    width: 100%;
    /* min-height: 100%; */
    min-height: 40px;
    line-height: normal;
    white-space: normal;
    z-index: 1;
    position: relative;
}

.searchMulSelect .placeholderText {
    color: #b9bdc3;
    /* color: red; */
    font-size: 14px;
    position: absolute;
    top: 52%;
    left: 10px;
    transform: translateY(-50%);
}

.searchMulSelect .tags.readonlyIcon {
    background-color: #f1f1f1;
}

.searchMulSelect .searchMsg {
    outline: none;
    margin-left: 5px;
    color: #666;
    font-size: 14px;
    border: none;
    padding: 0 5px;
    height: 40px;
    line-height: 100%;
    background-color: transparent;
    width: 100px;
    vertical-align: top;
}

.searchMulSelect .hideInput {
    display: none;
}

.tags .icon-del {
    position: absolute;
    top: 50%;
    right: 8px;
    color: #c0c4cc;
    font-weight: normal;
    transform: translateY(-50%);
}

.searchMulSelect.fa-check-circle-o {
    border: 1px solid #67c23a;
}

.searchMulSelect.fa-times-circle-o {
    border: 1px solid #f56c6c;
}

.form-item .form-item-div {
    width: 100%;
    flex: 1;
    min-width: 130px;
}

.searchMulSelect .fa-chevron-down.fa-times-circle:before {
    content: "\F057";
}

.selectContent .form-item-label {
    margin: 0 5px 0 10px;
}
</style>
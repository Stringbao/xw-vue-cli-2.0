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
                    v-show="placeholderStr && !inputFlag && !readonlyFlag"
                    >{{ placeholderStr }}</span
                >
                <left-section
                    :readonly="readonlyFlag"
                    :display-name="displayName"
                    :displayValue="displayValue"
                    :data="tagList"
                    :multiple="multiple"
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
                    @input="inputQuery"
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
                :data="data"
                :notice-parent="noticeFromButtom"
            ></buttom-section>
        </div>
    </div>
</template>

<script>
import { $idSeed, $util, $obj } from "../leCompsTool.js";
import LeftSection from "../select/left.vue";
import ButtomSection from "../select/buttom.vue";
import Constant from "../contant/index.js";
import { debounce } from "lodash-es";

export default {
    name: "LeSelect",
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
        remote: {
            type: Boolean | String,
            default: false,
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
        },
        search: {
            type: Function
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
            showButtom: false,
            showArrow: true,
            placeholderStr: "",
            tagList: [], // 上方tag要展示的数组
            data: [], // 下拉框的列表
            allList: [] // 全量列表（每次数据更新后返回来的数据集合）
        };
    },
    computed: {
        _leFormLableWidth() {
            return (this.leForm || {}).labelWidth;
        },
        isVertify(){ // 是否校验
            if (this.on === "" || this.on) {
                return true;
            }
            return false;
        },
        isRequired(){ // 是否必填
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
        isRemoteFlag() { // 是否为远端搜索
            if (this.remote === "" || this.remote) {
                return true;
            }
            return false;
        },
        readonlyFlag() { // 是否只读
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        inputFlag() { //是否允许模糊查询，默认不开启
            if (this.enabledInput === "" || this.enabledInput) {
                return true;
            }
            return false;
        },
        showClearBtn() {
            if (
                this.showClear === "" ||
                this.showClear === undefined ||
                this.showClear
            ) {
                return true;
            }
            return false;
        },
        getSelectList() { // 获取已选择的列表值的集合
            let list = [];
            this.tagList.forEach(item => {
                list.push(item[this.displayValue]);
            });
            return list;
        }
    },
    watch: {
        value(val) {
            this.setValue();
        },
        dataSource(val) {
            this.getAllList();
            this.setValue();
        },
    },
    mounted() {
        this.getAllList();
        this.setValue();
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
            let selectedItems = this.getSelectList;
            let vals = selectedItems.join(",");
            this.$emit("input", vals);
            this.$emit("change", vals, this.tagList);

            if (this.leForm && this.leForm.checkSubComponentVerify(this)) {
                this.leForm && this.leForm.validateSubComponent(this);
            }
        },
        checkPlaceholder() {
            let selectedItems = this.getSelectList;
            let vals = selectedItems.join(",");
            if (vals != "") {
                this.placeholderStr = "";
            } else {
                this.placeholderStr = this.placeholder;
            }
        },

        inputQuery: debounce(function(e) { // input输入触发
            if (!this.inputFlag) {
                return;
            }
            this.showButtom = true;
            if (this.isRemoteFlag) { // 远程搜索
                if (e && e.target.value) {
                    this.$emit('search', e.target.value);
                } else {
                    this.$emit('search', '');
                }
            } else { // 非远端搜索（过滤下拉列表）
                this.init(this.dataSource); // 确保每次输入后都是从全量的下拉列表了来过滤
                if (e && e.target.value) {
                    this.data = this.filterData(e.target.value); // 根据input的值过滤下拉数据
                }
                const value = ('' + this.value).toString(); // 已选中的值的集合
                if (value) {
                    const valueList = value.split(',');
                    valueList.forEach(item => {
                        this.setDataStatus(item); // 给下拉列表选中的数据设置状态
                    });
                }
            }
        }, 200),
        getAllList() { // 拼接全量数组
            const dataSource = $obj.clone(this.dataSource);
            this.data = $util.addPrimaryAndCk(dataSource);
            dataSource.forEach(item => {
                const params = this.allList.find(it => {
                    return it[this.displayValue] == item[this.displayValue];
                });
                if (!params) {
                    this.allList.push(item);
                }
            });
        },
        setDataStatus(item) { // 给下拉列表选中的数据设置状态
            const tmp = this.data.find(it => {
                return it[this.displayValue] == item;
            });
            if (tmp) {
                tmp.ck = true;
                tmp.cls = "active fa fa-check";
            }
        },
        setTagList(item) { // 向tagList添加数据
            const allItem = this.allList.find(it => {
                return it[this.displayValue] == item;
            });
            let params = {};
            if (allItem) {
                params = allItem;
            } else {
                params[this.displayValue] = item;
                params[this.displayName] = '';
            }
            this.tagList.push(params);
        },
        filterData(val) { // 非远端搜索时根据input值过滤数据
            return this.data.filter((item) => {
                return (
                    item[this.displayName]
                        .toLowerCase()
                        .indexOf(val.toLowerCase()) != -1
                );
            });
        },
        setValue() { // 设置选中值：下拉框值 + tag值
            const value = ('' + this.value).toString();
            //重置
            this.resetDataCkStatus();
            if (value) {
                this.tagList = [];
                const valueList = value.split(',');
                valueList.forEach(item => {
                    this.setDataStatus(item); // 给下拉列表选中的数据设置状态
                    this.setTagList(item); // 把选中的值添加到tagList列表里
                });
            }
            this.checkPlaceholder();
        },

        delTagItem(item) { // 在tag删除、取消选中时，删除tagList的对应数据
            const ind = this.tagList.findIndex(it => {
                return it[this.displayValue] == item[this.displayValue];
            });
            if (ind != -1) {
                this.tagList.splice(ind, 1);
            }
        },
        deselectDataItem(item) { // 在tag删除触发，查找在data数据里是否要删除的item,如果有则取消选中
            const it = this.data.find(it => {
                return it[this.displayValue] == item[this.displayValue];;
            })
            if (it) {
                it.ck = false;
                it.cls = '';
            }
        },

        noticeFromButtom(item) { // 下拉框点击item触发
            //多选
            if (this.multiple != undefined) {
                if (!item.ck) { // 要选中,向tagList里添加数据
                    this.tagList.push(item);
                } else { // 要取消选中，需要把tagList里删除对应数据
                    this.delTagItem(item); // 删除tagList的item
                }
                item.ck = !item.ck;
                item.cls = !item.ck ? '' : 'active fa fa-check';
            } else {
                //单选
                this.data.forEach((x) => {
                    if (x[this.displayValue] == item[this.displayValue]) {
                        // 已选择状态 并且 showClearBtn=false时 不需要取消选中，
                        // 其他状态下直接取反即可
                        item.ck = (item.ck && !this.showClearBtn) ? item.ck : !item.ck;
                        item.cls = item.ck ? "active fa fa-check" : "";
                        if (item.ck) {
                            this.tagList = [item];
                        } else {
                            this.tagList = [];
                        }
                    } else {
                        x.cls = "";
                        x.ck = false;
                    }
                });
                this.showButtom = false;
                this.searchName = ""; // 只有单选才清空用户输入
            }
            this.onEmit();
        },

        noticeFromLeft(item) { // tag删除
            if (this.readonlyFlag) {
                return;
            }
            this.delTagItem(item); // 删除tagList的item
            this.deselectDataItem(item); // 查找在data数据里是否要删除的item,如果有则取消选中
            this.onEmit();
        },
       
        getValue() {
            if (this.tagList.length == 0) {
                return "";
            }
            return this.getSelectList.join(",");
        },

        resetDataCkStatus() {
            this.data.forEach((item) => {
                item.cls = "";
                item.ck = false;
            });
            this.tagList = [];
        },

        clear() {
            if (this.readonlyFlag) {
                return;
            }
            this.resetDataCkStatus();
            this.searchName = "";
            this.tagList = [];
            this.allList = $obj.clone(this.dataSource);
            this.$emit('input', '');
            this.$emit('change', '', this.tagList);
            this.$emit('search', '')
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
            if (this.tagList.length == 0) {
                return;
            }
            if (this.showClear === '' || this.showClear) {
                this.showArrow = false;
            }
        },
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
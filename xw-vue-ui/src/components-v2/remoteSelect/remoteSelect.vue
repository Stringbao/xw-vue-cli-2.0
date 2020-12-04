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
            @click="focus"
            tabindex="0"
            v-bodyClick="hideButtom"
            :_body_tag="componentKey"
        >
            <!--选中的标签-->
            <div
                class="tags"
                :_body_tag="componentKey"
                :class="{ readonlyIcon: readonlyFlag }"
                @mouseenter="showArr"
                @mouseleave="hideArr"
            >
                <i
                    v-show="showArrow"
                    :_body_tag="componentKey"
                    class="fa fa-chevron-down icon-del"
                    @click="clickInput"
                ></i>
                <i
                    v-show="!showArrow && showClearBtn"
                    class="fa fa-chevron-down icon-del fa-times-circle"
                    @click.stop="clear"
                ></i>
                <!-- <span
                    class="placeholderText"
                    @click.stop="focus"
                    v-show="placeholderStr && !inputFlag && !readonlyFlag"
                    >{{ placeholderStr }}</span
                > -->
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
                    :_body_tag="componentKey"
                    @click="clickInput"
                    :ref="componentKey"
                    :readonly="readonlyFlag"
                    type="text"
                    :class="{
                        searchMsg: true,
                        hideInput: readonlyFlag,
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
import ajax from "../../tool/http.js";

export default {
    name: "LeRemoteSelect",
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
        multiple: { // 是否支持多选
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
        dataSource: { // 数据源，只接收一次
            type: Array,
            default: () => []
        },
        readonly: { // 是否为只读状态
            type: Boolean | String,
            default: false,
        },
        defaultSearchOn: { // 是否获取焦点时请求接口 （input值为空 & 获取焦点）
            type: Boolean | String,
            default: false,
        },
        remoteOptions: {
            type: Object,
            default: {},
            required: true
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
            isAllowDataSource: false,
            ajax,
            validataComponentType: "RemoteSelect",
            componentKey: $idSeed.newId(),
            state: {
                showError: false,
                errorMsg: "",
            },
            searchName: "",
            showButtom: false,
            showArrow: true,
            placeholderStr: "",
            tagList: [], // 上方tag要展示的数组
            data: [] // 下拉框的列表
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
                this.labelWidth || this._leFormLableWidth || Constant.INPUT.LABEL_WIDTH
            );
        },
        readonlyFlag() { // 是否只读
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        isDefaultSearchOn() { // 是否获取焦点时请求接口 （input值为空 & 获取焦点）
            if (this.defaultSearchOn === "" || this.defaultSearchOn) {
                return true;
            }
            return false;
        },
        showClearBtn() {
            if (this.showClear === "" || this.showClear === undefined || this.showClear) {
                return true;
            }
            return false;
        },
    },
    watch: {
        value(val) {
            this.setValue();
        },
        dataSource(val) { // 只支持接收一次数据源：this.dataSource
            if (!this.isAllowDataSource) {
                this.init(val);
                this.isAllowDataSource = true;
            }
            this.setValue();
        },
    },
    mounted() { // 只支持接收一次数据源：this.dataSource
        if (!this.isAllowDataSource && this.dataSource.length) {
            this.init(this.dataSource);
            this.isAllowDataSource = true;
        }
        this.setValue();
    },
    methods: {
        focus() {
            if (this.readonlyFlag) {
                return;
            }
            this.$refs[this.componentKey].focus();
            this.clickInput();
            if  (this.isDefaultSearchOn && !this.searchName) {
                // 获取焦点时 && input值为空才去请求接口
                this.inputQuery();
            }
        },
        hideButtom() {
            this.showButtom = false;
        },
        clickInput() {
            if (this.readonlyFlag) {
                return;
            }
            this.showButtom = true;
            // if (this.data.length != 0) {
            //     this.showButtom = true;
            // }
        },
       
        init(data) {
            let tmp = $obj.clone(data);
            this.data = $util.addPrimaryAndCk(tmp);
        },
        onEmit() {
            let selectVals = this.getSelectedItems().vals;
            let vals = selectVals.join(',');
            this.$emit("input", vals);
            this.$emit("change", vals, this.getSelectedItems().items);

            if (this.leForm && this.leForm.checkSubComponentVerify(this)) {
                this.leForm && this.leForm.validateSubComponent(this);
            }
        },
        checkPlaceholder() {
            let selectVals = this.getSelectedItems().vals;
            let vals = selectVals.join(',');
            if (vals != "") {
                this.placeholderStr = "";
            } else {
                this.placeholderStr = this.placeholder;
            }
        },

        inputQuery: debounce(function(e) { // input输入触发
            const {getUrl, params, analysis, method = 'get'} = this.remoteOptions;
            if (!getUrl()) { // url必填
                return;
            }
            
            const name = this.searchName.trim();
            let dataPromise = null; // 存储接口的返回值
            let requestUrl = getUrl(); // 存储最终的url（get需要url上拼接参数）
            // get请求：('/getAllList?q=1000&name=wang', {}); 其他请求：('/getAllList', Object)
            if (method === 'get') {
                requestUrl += name;
                dataPromise = this.ajax.get(requestUrl);
            } else { // 其他请求
                let queryData = $obj.clone(params);
                const list = Object.keys(queryData);
                if (list.length) {
                    queryData[list[list.length - 1]] = name;
                }
                dataPromise = this.ajax[method](requestUrl, queryData);
            }

            dataPromise.then(data => {
                // 如果存在analysis字段，就把数据抛出，由用户自行传入，否则用接口返回数据
                const list = $obj.clone(analysis ? analysis(data) : data);
                this.init(list);
                this.setValue();
                this.clickInput();
            }).catch(e => {
                this.alert.showAlert("error", e);
            })
        }, 200),

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
            const haveData = this.data.find(it => { // 先查找是否在返回的下拉列表里
                return it[this.displayValue] == item;
            });
            if (haveData) { // 如果存在 查找是否在tagList里
                const havaTag = this.tagList.find(it => {
                    return it[this.displayValue] == haveData[this.displayValue];
                });
                if (!havaTag) { // 如果不在tagList里，直接添加到tagList里
                    this.tagList.push(haveData);
                } else if (havaTag && !havaTag[this.displayName]) { // 如果在tagList里 & 不存在displayName字段，则把displayName字段赋值
                    havaTag[this.displayName] = haveData[this.displayName];
                }
            } else { // 如果item不在data里
                const havaTag = this.tagList.find(it => {
                    return it[this.displayValue] == item;
                });
                if (!havaTag) { // 并且也不在tagList里，给tagList的displayValue赋值，displayName=空串
                    let obj = {};
                    obj[this.displayValue] = item;
                    obj[this.displayName] = '';
                    this.tagList.push(obj);
                }
            }
        },
        setValue() { // 设置选中值：下拉框值 + tag值
            const value = ('' + this.value).toString();
            //重置
            this.resetDataCkStatus();
            if (value) {
                const valueList = value.split(',');
                valueList.forEach(item => {
                    this.setDataStatus(item); // 给下拉列表选中的数据设置状态
                    this.setTagList(item); // 把选中的值添加到tagList列表里
                });
                this.tagList = $obj.clone(this.filterExcludeeTagList(value));
            } else {
                this.tagList = [];
            }
            this.checkPlaceholder();
        },

        filterExcludeeTagList(value) { // 过滤掉tagList里不包含value的项
            const list = $obj.clone(this.tagList);
            return list.filter(it => {
                return value && value.split(",").find(item => {
                    return item == it[this.displayValue];
                })
            })
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
                if (this.readonlyFlag) {
                    return;
                }
                this.$refs[this.componentKey].focus();
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

        getSelectedItems() {
            let vals = [];
            this.tagList.forEach(item => {
                vals.push(item[this.displayValue]);
            });
            return {
                vals,
                items: this.tagList
            };
        },
       
        getValue() {
            if (this.tagList.length == 0) {
                return "";
            }
            return this.getSelectedItems().vals.join(',');
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
            this.tagList = [];
            this.$emit('input', '');
            this.$emit('change', '', this.getSelectedItems().items);
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
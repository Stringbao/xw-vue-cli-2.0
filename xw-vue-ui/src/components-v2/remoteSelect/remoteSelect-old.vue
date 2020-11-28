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
                    :multiple="multiple"
                    :data="tagList"
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
                    @input="handleQueryChange"
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
import LeftSection from "./remoteLeft.vue";
import ButtomSection from "./buttom.vue";
import Constant from "../contant/index.js";
import ajax from "../../tool/http.js";

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
        },
        remoteOptions: {
            type: Object,
            default: {},
            required: true
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
            num: 0,
            ajax,
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
            //在上一次请求没有完成之前，不允许发送下一次请求
            isLoading: false,
            tagList: []
        };
    },
    computed: {
        // this.remoteOptions start
        getMethod() { // 请求方式，默认get,(非必填)
            return this.remoteOptions.method ? this.remoteOptions.method : 'get';
        },
        /**
            * // 请求数据的input的key,默认'q',(非必填)
            * this.remoteOptions.queryKey
            *
            * // 请求地址,(必填)
            * this.remoteOptions.url
            *
            * // 请求数据额外用到的参数,Object,(非必填)
            * this.remoteOptions.params;
            *
            * 返回数据回调（参考table）,若接口返回的最外层数据为需求的数据，则非必填,否则必填
            * this.remoteOptions.analysis
        */
        // this.remoteOptions end

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
            this.setValue(val, 1);
        }
    },
    methods: {
        // input的oninput事件，来根据参数调用接口请求数据, 防抖200
        handleQueryChange: $util.debounce(function() {
            const {url, queryKey, params, analysis} = this.remoteOptions;
            if (this.isLoading || !url) {
                return;
            }
            this.isLoading = true;
            const name = this.searchName.trim(); // 删除
            let queryData = { // 把所有的请求参数拼接成Object
                ...params
            };
            queryData[queryKey || 'q'] = this.searchName.trim();
            let dataPromise = null; // 存储接口的返回值
            let requestUrl = url; // 存储最终的url（get需要url上拼接参数）
            // get请求：('/getAllList?q=1000&name=wang', {}); 其他请求：('/getAllList', Object)
            if (this.getMethod === 'get') {
                requestUrl += this.objectToUrlParameter(queryData);
                queryData = {};
            }
            dataPromise = this.ajax[this.getMethod](requestUrl, queryData);
            dataPromise.then(data => {
                this.isLoading = false;
                if (name.length === 1) { // 删除if
                    // 如果存在analysis字段，就把数据抛出，由用户自行传入，否则用接口返回数据
                    const list = $obj.clone(analysis ? analysis(data) : data);
                    this.data = $util.addPrimaryAndCk(list);
                    this.setValue(this.value);
                } else if (name.length === 2) { // 删除 & 内容
                    this.data = $util.addPrimaryAndCk([
                        {
                            methodCode: '4',
                            id: 4
                        },
                        {
                            methodCode: '5',
                            id: 5
                        }
                    ]);
                    this.setValue(this.value);
                } else { // 删除
                    this.data = [];
                }
                // this.setValue(this.value);
                this.clickInput();
            }).catch(e => {
                this.alert.showAlert("error", e.msg);
            })
        }, 200),
        // 把对象转为url参数形式,例：传入{a: 1, b:2}，传出'?a=1&b=2'
        objectToUrlParameter(data) {
            const list = Object.keys(data);
            if (list.length === 0) {
                return '';
            }
            let urlStr = '?';
            list.forEach((item, ind) => {
                let and = '';
                if (ind < list.length - 1) {
                    and = '&';
                }
                urlStr += item + '=' + data[item] + and;
            });
            return urlStr;
        },
        initData() { // 初始进入页面后渲染一次下拉数据
            if (this.dataSource.length === 0) {
                return;
            }
            this.data = $util.addPrimaryAndCk($obj.clone(this.dataSource));
            this.setValue(this.value);
        },
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
        onEmit() {
            let selectedItems = this.getSelectedItems();
            let vals = selectedItems.vals.join(",");
            this.$emit("input", vals);
            this.$emit("change", vals, selectedItems.items);

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

        noticeFromButtom(item) { // 下拉框点击item
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
        addToTagListItem(tmp) { // 若tagList里不包含此数据，则插入到tagList里
            const it = this.tagList.find(it => {
                return it[this.displayValue] == tmp[this.displayValue];;
            })
            if (!it) {
                this.tagList.push(tmp);
            }
        },
        filterTagList(ids) { // 过滤tagList里不包含v-model的值的数据
            const list = $obj.clone(this.tagList);
            return list.filter(it => {
                return ids && ids.split(",").find(item => {
                    return item == it[this.displayValue];
                })
            })
        },

        noticeFromLeft(item) { // tag删除
            if (this.readonlyFlag) {
                return;
            }
            this.delTagItem(item); // 删除tagList的item
            this.deselectDataItem(item); // 查找在data数据里是否要删除的item,如果有则取消选中
            this.onEmit();
        },

        getSelectedItems(filed) {
            return $util.getCheckedItems(
                this.tagList,
                filed ? filed : this.displayValue
            );
        },
       
        getValue() {
            if (this.data.length == 0) {
                return "";
            }
            return this.getSelectedItems().vals.join(",");
        },

        setValue(ids = "", num) {
            ids = "" + ids;
            ids = ids.toString();
            //重置
            this.resetDataCkStatus();
            //选中
            console.log();
            ids && ids.split(",").forEach((val) => {
                    let tmp = getItemByDisplayValue(
                        this.data,
                        this.displayValue,
                        val
                    );
                    if (tmp) {
                        tmp.cls = 'active fa fa-check';
                        tmp.ck = true;
                        this.addToTagListItem(tmp);
                    }
                });
            this.tagList = this.filterTagList(ids);
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
            this.tagList = [];
            this.searchName = "";
            this.$emit("input", "");
            this.$emit("change", "");
            this.showButtom = false;
            this.isLoading = false;
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
        }
    },
    mounted() {
        this.setValue(this.value);
        this.initData();
    }
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
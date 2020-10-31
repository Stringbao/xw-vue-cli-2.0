<template>
    <div class="form-item">
        <label
            :style="{ width: labelWidthVal + 'px' }"
            class="form-item-label"
            :class="on != undefined ? 'required' : ''"
            >{{ label }}</label
        >
        <div
            class="form-item-div fa"
            :class="{ 'fa-times-circle-o': state.showError }"
        >
            <span
                :class="{ readonlyIcon: readonlyFlag }"
                class="span"
                @click="changeCK(item)"
                v-for="(item, index) in data"
                :key="index"
            >
                <span
                    class="fa"
                    :class="item.ck ? 'fa-dot-circle-o' : 'fa-circle-o'"
                ></span>
                <span>{{ item[displayName] }}</span>
            </span>
            <p class="promptMsg" v-show="state.showError">
                {{ state.errorMsg }}
            </p>
            <p class="tip" v-show="!state.showError">{{ tip }}</p>
        </div>
    </div>
</template>

<script>
import { $idSeed, $util, $obj } from "../leCompsTool.js";
import Constant from "../contant/index.js";

export default {
    name: "LeRadioList",
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
        value: {
            type: String,
        },
        labelWidth: {
            type: Number | String,
        },
        readonly: {
            type: Boolean | String,
            default: false,
        },
        label: {
            type: String,
        },
        dataSource: {
            type: Array,
            default: [],
        },
        displayName: {
            type: String,
            required: true,
        },
        displayValue: {
            type: String,
            required: true,
        },
    },
    inject: ["leForm"],
    data() {
        return {
            componentKey: $idSeed.newId(),
            state: {
                showError: false,
                errorMsg: "",
            },
            data: [],
        };
    },
    computed: {
        labelWidthVal() {
            return (
                this.labelWidth ||
                this.leForm.labelWidth ||
                Constant.RADIO.LABEL_WIDTH
            );
        },
        readonlyFlag() {
            if (this.readonly === "" || this.readonly) {
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
            }
        },
    },
    methods: {
        /**
         * @description 设置数据源，自动添加ck属性来控制是否选中状态
         * @returns
         */
        init(data) {
            this.data = $obj.clone($util.addPrimaryAndCk(data));
        },
        /**
         * @description 重置数据源
         * @returns
         */
        resetData() {
            this.data.forEach((item) => {
                item.ck = false;
            });
        },
        /**
         * @description radio的change事件，会触发父组件的change回调
         * @returns 回传2个参数到父组件的回调，当前item和数据源data
         */
        changeCK(item) {
            if (this.readonlyFlag) {
                return;
            }
            this.resetData();
            item.ck = true;
            this.state.showError = false;
            this.$emit("input", item[this.displayValue]);
            this.$emit("change", item, this.data);
            this.leForm.verifySubComponentAfterEmit(this);
        },
        /**
         * @description 设置选中项, 数据回写用
         * @param val 单个值
         * @returns
         */
        setValue(val = "") {
            val = val.toString();
            this.resetData();
            if (val) {
                this.data.forEach((item) => {
                    if (item[this.displayValue].toString() == val) {
                        item.ck = true;
                    }
                });
            }
        },
        /**
         * @description 获取选中的值
         * @returns
         */
        getValue() {
            let res = $util.getCheckedItems(this.data, this.displayValue);
            return res.vals.join(",");
        },
    },
    mounted() {
        if (this.dataSource && this.dataSource.length > 0) {
            this.init(this.dataSource);
        }
        this.setValue(this.value);
    },
};
</script>

<style scoped>
.span {
    position: relative;
    cursor: pointer;
    display: inline-block;
    margin: 10px 20px 10px 0;
    color: #606266;
    font-size: 14px;
}
.ck {
    position: absolute;
    left: 49px;
    z-index: -100;
}

.form-item .form-item-div .readonlyIcon {
    color: #d3cfcf;
    background-color: #fff;
}
</style>

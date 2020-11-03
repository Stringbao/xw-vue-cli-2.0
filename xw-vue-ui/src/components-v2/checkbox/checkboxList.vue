<template>
    <div class="form-item" :ref="componentKey" tabindex="0">
        <label
            :style="{ width: labelWidthVal + 'px' }"
            class="form-item-label"
            :class="{'required':isVertify && readonlyFlag}"
            >{{ label }}</label
        >
        <div
            class="form-item-div fa"
            :class="{ 'fa-times-circle-o': state.showError }"
        >
            <span
                :class="{ readonlyIcon: readonlyFlag }"
                class="span"
                v-for="(item, index) in data"
                :key="index"
                @click="changeItem(item)"
            >
                <span
                    class="fa"
                    :class="item.ck ? 'fa-check-square' : 'fa-square-o'"
                ></span>
                <span>{{ item[displayName] }}</span>
                <!-- <span v-if="item.convert">{{ item.convert(item, this) }}</span> -->
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
    name: "LeCheckboxList",
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
            data: [],
        };
    },
    computed: {
        isVertify(){
            if (this.on === "" || this.on) {
                return true;
            }
            return false; 
        },
        labelWidthVal() {
            return (
                this.labelWidth ||
                this.leForm&&this.leForm.labelWidth ||
                Constant.CHECKBOX.LABEL_WIDTH
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
            if (val && Array.isArray(val)) {
                this.init(val);
                this.setValue(this.value);
            }
        }
    },
    methods: {
        init(data) {
            this.data = $obj.clone($util.addPrimaryAndCk(data));
        },
        focus() {
            this.$refs[this.componentKey].focus();
        },
        changeItem(item) {
            if(this.readonlyFlag){
                return;
            }
            item.ck = !item.ck;
            let res = $util.getCheckedItems(this.data, this.displayValue);
            this.$emit("input", res.vals.join(","));
            this.$emit("change", res);
            this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
        },
        getValue() {
            return $util.getCheckedItems(this.data, this.displayValue).vals;
        },
        setValue(vals = "") {
            if (!vals) {
                this.data.forEach((item) => {
                    item.ck = false;
                });
            } else {
                this.data.forEach((item) => {
                    let cked = false;
                    vals.split &&
                        vals.split(",").forEach((x) => {
                            if (
                                item[this.displayValue].toString() ==
                                x.toString()
                            ) {
                                cked = true;
                            }
                        });
                    if (cked) {
                        item.ck = true;
                    } else {
                        item.ck = false;
                    }
                });
            }
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
    margin: 10px 20px;
    display: inline-block;
    margin-left: 0;
    cursor: pointer;
}
.span .fa {
    vertical-align: middle;
}

.form-item .form-item-div .readonlyIcon {
    color: #d3cfcf;
    background-color: #fff;
}
</style>

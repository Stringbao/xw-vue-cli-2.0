<template>
    <div class="tab" @click="$listeners.click">
        <div role="tab"  class="tab_btn">{{label}}</div>
        <button class="tab_remove" @click.stop="$listeners.del">
            <span role="img" class="actions_close">
                <i class="iconfont icon-baseline-close-px"></i>
            </span>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: "Tab1"
        }
    },
    data() {
        return {};
    },
    methods: {
        
    }
};
</script>
<style lang="scss" scoped>
.tab {
    margin-right: 2px;
    border-radius: 2px 2px 0 0;
    position: relative;
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    background: #fafafa;
    border: 1px solid #f0f0f0;
    padding: 8px 16px;
    .tab_remove {
        flex: none;
        margin-right: -4px;
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        background: 0 0;
        border: none;
        outline: none;
        cursor: pointer;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        .actions_close {
            display: inline-block;
            color: inherit;
            font-style: normal;
            line-height: 0;
            text-align: center;
            text-transform: none;
            vertical-align: -0.125em;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
        }
    }
}
.tab.active {
    border-bottom-color: #fff;
    color: #1890ff;
    background: #fff;
}
</style>
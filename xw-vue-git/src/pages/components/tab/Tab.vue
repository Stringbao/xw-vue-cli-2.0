<template>
    <div>
        <div role="tablist" class="tab_nav">
            <div class="tab_nav_wrap">
                <div class="tab_nav_list">
                    <TabItem
                        v-for="(item,idx) in modules"
                        @click="changeHandle(idx)"
                        :class="{active:idx === currentIndex}"
                        @del="del(item,idx)"
                        :key="item.ModuleName"
                        :label="item.ModuleName"
                    />
                    <button class="tab_add" @click="add">
                        <span role="img" class="actions_add">
                            <i class="iconfont icon-add"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="tab_contents">
            <slot name="pane" :currentIndex="currentIndex"></slot>
        </div>
    </div>
</template>
<script>
import TabItem from "./TabItem.vue";
export default {
    props: {
        modules: {
            type: Array,
        }
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    computed:{
       
    },
    components: {
        TabItem
    },
    methods: {
        add() {
            if (this.$listeners.add) {
                this.$listeners.add();
            } else {
                throw new Error("please add event @add and return a promise");
            }
        },
        changeHandle(i) {
            this.currentIndex = i;
            if(this.$listeners.change){
                this.$listeners.change(this.modules[i],i);
            }
        },
        del(item,i){
            if(this.$listeners.del){
                this.$listeners.del(item);
            }else{
                throw new Error("please add event @add ")
            }
        }
    },
    watch:{
        'modules.length':function(val,oldVal){
            let dx = val - oldVal;
            if(dx > 0){
                this.currentIndex = this.modules.length -1;
            }else{
                this.currentIndex--;
            }
            if(this.$listeners.change){
                this.$listeners.change(this.modules[this.currentIndex],this.currentIndex);
            }    
        }
    },
    mounted(){
    }
};
</script>
<style lang="scss" scoped>
.tab_nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    box-sizing: border-box;
    &:before {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid #f0f0f0;
        content: "";
    }
    .tab_nav_wrap {
        position: relative;
        display: flex;
        -webkit-box-flex: 1;
        flex: auto;
        align-self: stretch;
        overflow: hidden;
        white-space: nowrap;
        transform: translate(0);
        &:before,
        &:after {
            position: absolute;
            z-index: 1;
            opacity: 0;
            -webkit-transition: opacity 0.3s;
            transition: opacity 0.3s;
            content: "";
            pointer-events: none;
            left: 0;
            box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.08);
            top: 0;
            bottom: 0;
            width: 30px;
        }
        .tab_nav_list {
            position: relative;
            display: flex;
            transition: transform 0.3s;
            .tab_add {
                min-width: 40px;
                padding: 0 8px;
                background: #fafafa;
                border: 1px solid #f0f0f0;
                border-radius: 2px 2px 0 0;
                outline: none;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                .actions_add {
                    display: inline-block;
                    color: inherit;
                    font-style: normal;
                    line-height: 0;
                    text-align: center;
                    text-transform: none;
                    vertical-align: -0.125em;
                    text-rendering: optimizeLegibility;
                    -webkit-font-smoothing: antialiased;
                    svg {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
.tab_contents{
    position: relative;
}
</style>
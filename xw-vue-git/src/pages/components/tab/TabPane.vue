<template>
    <transition name="component-fade" mode="in-out"> 
        <div class="content" v-show="currentIndex === index">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        currentIndex: {
            type: Number
        },
        index: {
            type: Number
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.content {
    border-right: 1px solid #f0f0f0;
    border-left: 1px solid #f0f0f0;
    padding: 16px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #ececec;
}
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
}
</style>
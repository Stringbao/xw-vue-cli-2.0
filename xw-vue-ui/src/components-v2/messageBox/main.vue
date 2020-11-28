<template>
    <transition name="msgbox-fade"   @after-leave="handleAfterLeave">
        <div class="le_message_box__wrapper" v-show="visible">
            <div class="le_message_box">
                <div class="le_message_box__header">
                    <div class="le_message_box__title">
                        <span>{{title}}</span>
                    </div>
                    <button type="button" @click="close" class="le_message_box__headerbtn">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="le_message_box__content">
                    <div class="le_message_box__container">
                        <i class="fa fa-exclamation-circle le_message_box__status"></i>
                        <div class="le_message_box__message">
                            <div v-html="message"></div>
                        </div>
                    </div>
                </div>
                <div class="le_message_box__btns">
                    <LeButton type="cancel" @click="close" :value="cancelName" />
                    <LeButton type="confirm" @click="confirm" :value="confirmName" />
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import LeButton from "../button/button.vue";
export default {
    name: "messageBox",
    components: {
        LeButton,
    },
    data() {
        return {
            visible: false,
            title: "",
            closed:false,
            cancelName:"Cancel",
            confirmName:"Confirm"
        };
    },
    methods: {
        handleAfterLeave(){
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.closed = true;
            if (typeof this.onClose === "function") {
                this.onClose(this);
            }
        },
        confirm(){
            if(this.callback){
               this.callback();
               this.closed = true; 
            }
        }
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
            }
        },
    },
};
</script>
<style scoped>
.le_message_box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.4);
}
.le_message_box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
}
.le_message_box__wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}

.le_message_box__header {
    position: relative;
    padding: 15px 15px 10px;
}
.le_message_box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 1;
    color: #303133;
}
.le_message_box__headerbtn {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
}
.le_message_box__headerbtn {
    color: #909399;
}

.le_message_box__content {
    padding: 10px 15px;
    color: #606266;
    font-size: 14px;
}
.le_message_box__container {
    position: relative;
}
.le_message_box__status {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px !important;
    color: #e6a23c;
}
.le_message_box__status + .le_message_box__message {
    word-break: break-word;
    padding-left: 36px;
    padding-right: 12px;
}

.le_message_box__btns {
    padding: 5px 15px 0;
    text-align: right;
}





.msgbox-fade-enter-active {
    -webkit-animation: msgbox-fade-in .3s;
    animation: msgbox-fade-in .3s
}

.msgbox-fade-leave-active {
    -webkit-animation: msgbox-fade-out .3s;
    animation: msgbox-fade-out .3s
}
@keyframes msgbox-fade-in {
    0% {
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes msgbox-fade-out {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
}
</style>
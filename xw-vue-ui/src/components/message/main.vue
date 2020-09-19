<template>
    <transition name="le_alert_fade" @after-leave="handleAfterLeave">
        <div class="le_alert_wrapper" v-show="visible">
            <div
                :class="['le_alert',type,showClose?'hasIcon':'']"
                :style="{top:verticalOffset+'px'}"
                v-show="visible"
                @mouseenter="clearTimer"
                @mouseleave="startTimer"
            >
                <slot>
                    <div v-html="msg" class="le_alert__content"></div>
                </slot>
                <i v-if="showClose" class="fa fa-times le_alert__icon" @click="close"></i>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "alert",
    data() {
        return {
            type: "info",
            msg: "info",
            verticalOffset: 20,
            duration: 3000,
            visible: false,
            showClose: false,
            onClose: null,
            closed: false,
            timer: null,
        };
    },
    methods: {
        clearTimer() {
            clearTimeout(this.timer);
        },
        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.duration);
            }
        },
        close() {
            this.closed = true;
            if (typeof this.onClose === "function") {
                this.onClose(this);
            }
        },
        handleAfterLeave() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        keydown(e) {
            if (e.keyCode === 27) {
                // esc关闭消息
                if (!this.closed) {
                    this.close();
                }
            }
        },
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
            }
        },
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
};
</script>
<style scoped>
.le_alert_wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
.le_alert {
    min-width: 380px;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 15px 15px 20px;
    border-radius: 4px;
    background-color: #edf2fc;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
    border-width: 1px;
    border-style: solid;
    border-color: #ebeef5;
    min-width: 380px;
    transition: opacity 0.3s, transform 0.4s, top 0.4s;
}
.le_alert__icon {
    font-size: 16px;
    width: 16px;
    position: absolute;
    top: 50%;
    right: 15px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
    color: #C0C4CC;
}
.le_alert__content {
    padding-right: 16px;
}
.le_alert.message,.le_alert.success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
}
.le_alert.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
}
.le_alert.error {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
}
.le_alert.info {
    color: #909399;
}
.le_alert_fade-enter,
.le_alert_fade-leave-active {
    opacity: 0;
    -webkit-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%);
}
</style>

<template>
    <div class = "le_dialog_mask" :style="{'z-index':dialogZIndex}" v-show="dialogTag" :class="valueCls">
        <!-- width height margin为计算 width/height的一半 + 10(padding)-->
        <div class = "le_dialog_box" >
            <!-- 顶部 -->
            <div class="le_dialog_top">
                <div class="le_dialog_title">{{title?title:"Title"}}</div>
                <div class="le_dialog_closeIcon">
                    <i class="fa fa-close" @click="close"></i>
                </div>
            </div>
            <div class = "le_dialog_contine" v-bind:style="dialogStyle">
                <slot name="body"></slot>
            </div>
            <div class="dialogBtnContent">
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import tool from "../leCompsTool.js";
export default {
    name:"LeDialog",
    props:["title","width","height"],
    data(){
        return {
            dialogZIndex:tool._idSeed.newId(),
            dialogTag:false
        }
    },
    computed:{
        
        dialogStyle(){
            let w = 0;
            let h = 0;
            if(this.width && isNaN(this.width) &&this.width.indexOf('vw') != -1){
                w = this.width;
            }else{
                w = this.width?this.width + "px" : "700px";
            }
            if(this.height && isNaN(this.height) &&this.height.indexOf('vh') != -1){
                h = this.height;
            }else{
                h = this.height?this.height + "px" : "340px";
            }

            return {width:w,height:h}
        },
        valueCls(){
            return this.dialogTag?"show_le_dialog_mask":"hide_le_dialog_mask";
        }
    },
    methods:{
        close(){
            this.hide();
        },
        show(){
            this.dialogTag = true;
        },
        hide(){
            this.dialogTag = false;
            this.$emit("closeCallback",false);
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
    }

    /* 遮罩 */
    .le_dialog_mask{
        position:fixed;
        width:100%;
        height:100%;
        z-index:999;
        background:rgba(30,30,30,0.6);
        top: 0;
        left: 0;
    }
    /* dialog  box */
    .le_dialog_box{
        position: absolute;;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        background:#fff;
        border-radius: 4px;
        min-width: 400px;
        padding-bottom: 0;
    }

    /* 上面部分 */
    .le_dialog_top{
        width:100%;
        display:box;
        display:-webkit-box;
        display:-webkit-flex; 
        display:-moz-box; 
        display:-ms-flexbox; 
        display:flex;
        justify-content:space-between;
        border-bottom: 1px solid #dcdfe6;
        padding: 22px 30px;
        /* margin-bottom: 20px; */
    }
    /* 标题 */
    .le_dialog_title{
        color:#62626e;
        font-size:14px;
        padding-bottom:0;
        font-weight:bold;
        text-align: left;
        margin-left: 4px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    /* 关闭按钮 */
    .le_dialog_closeIcon {
        flex:1;
        text-align:right;
        vertical-align: middle;
        font-size:14px;
    }

    .fa-close{
        cursor: pointer;
    }

    /* 内容区 */
    .le_dialog_contine{
        flex:1;
        overflow:auto;
        font-size: 14px;
        color: #606266;
        text-align: left;
        position: relative;
        padding: 0px 30px;
    }
    /* 滚动条整体的样式 */
    .le_dialog_contine::-webkit-scrollbar{
        width: 1px;
        height:10px;
    }
    

    .dialogBtnContent{
        text-align: right;
        border-top: 1px solid #ccc;
        background-color: #fff;
        padding: 22px 30px;
        background-color: #ecf0f1;
        border-radius: 0 0 4px 4px;
    }
    
    .show_le_dialog_mask{
        animation: showMask 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes showMask{
        from {opacity:0}
        to {opacity: 1}
    }

</style>
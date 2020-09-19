<template>
    <div class = "le_loading_mask" v-show="value">
        <div class = "le_loadingBox">
            <div class = "fa fa-spinner fa-pulse mask_icon"></div>
            <div class = "loadingMsg">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LeLoading",
    props:["msg","value"],
}
</script>

<style scoped>
    /* 遮罩 */
    .le_loading_mask{
        position:fixed;
        width:100%;
        height:100%;
        z-index:99999;
        background:rgba(30,30,30,0.6);
        top:0;
        left:0;
        
    }
    .mask_icon{
        font-size:50px;
        color:#fff;
    }
    .loadingMsg{
        color:#fff;
        line-height:40px;
        font-size:25px;
    }
    .le_loadingBox{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-25px;
        margin-top:-45px;   
        text-align: center;
    }
</style>

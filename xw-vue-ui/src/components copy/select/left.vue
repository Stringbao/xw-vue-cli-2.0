<template>
    <div class="selectedTagBox">
        <div class="selectedTag">
            <!-- <span>{{data.length!=0 && data[0][displayName]}}</span> -->
            <div class="selectedTagItem" v-for="(item,idx) in data" :key="idx">{{item[displayName]}}</div>

            <!-- <i class="fa fa-times" @click.stop="removeItem(data[0])"></i> -->
        </div>
		<!-- <span class="selectedTag" style="width: 23px;padding: 0px;" v-show="data.length > 1?true:false" >
            <span>+{{data.length-1}}</span>
        </span> -->
    </div>
</template>

<script>
    export default {
        name: 'LeftSection',
        components: {},
        props:["data","noticeParent","displayName"],
        data () {
            return {}
        },
        methods:{
            removeItem(item){
                this.noticeParent(item);
            }
        }
    }
</script>
<style scoped>
    .searchMulSelect .tags .selectedTagBox{
		/* min-height: 24px; */
		/* max-width: 244px; */
	}
	
    .searchMulSelect .selectedTagBox .selectedTag .selectedTagItem{ 	    
	    /* display: inline-block; */
	    padding: 0 10px;
	    height: 24px;
	    line-height: 22px;
	    font-size: 14px;
	    border-radius: 4px;
	    border: 1px solid rgba(64,158,255,.2);
	    white-space: nowrap;
	    box-sizing: border-box;
	    border-color: transparent;
	    margin: 7px 0 2px 6px;
	    background-color: #f0f2f5;
	    color: #606266;
	    /* padding-right: 25px; */
	    position: relative;
		/* max-width: 230px; */
		max-width: 80%;
	    overflow: hidden;
		float: left;
    }
	
	.searchMulSelect .selectedTagBox .selectedTag i{
		width: 12px;
	    height: 12px;
	    line-height: 12px;
	    display: inline-block;
	    position: absolute;
	    top: 5px;
	    right: 4px;
	    font-size: 12px;
	     font-size: 12px; 
	    font-style: normal;
	    background-color: #c8cacd;
	    border-radius: 9px;
	    color: #fff3f3;
	    text-align: center;
	}
	
	.searchMulSelect .selectedTagBox .selectedTag i:hover{
		cursor: pointer;
		background-color: #acadb0;
	}
	
	.searchMulSelect .selectedTagBox .selectedTag span{
		max-width: 100%;
	    overflow: hidden;
	    display: inline-block;
	}
</style>
<template>
    <div class="selectedTagBox" v-show="data.length>0">
        <div class="selectedTag">
            <div class="selectedTagItem" v-for="(item,idx) in data" :title="`${item[displayName]}(${item[displayValue]})`" :key="idx">{{item[displayName] ? item[displayName] : item[displayValue]}}<i class="fa fa-times" :class="{'readonly-i': readonly}" v-if="multiple" @click.stop="removeItem(data[idx])"></i></div>
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
        props:["data","noticeParent","displayName",'displayValue','multiple','readonly'],
        data () {
            return {}
		},
		computed:{},
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
	    padding: 0 18px;
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
	    position: absolute;
	    top: 5px;
	    right: 4px;
	    font-size: 12px;
	    font-style: normal;
	    color: #3c3c3c;
	    text-align: center;
		
	}
	
	.searchMulSelect .selectedTagBox .selectedTag i:not(.readonly-i):hover{
		cursor: pointer;
		background-color: #acadb0;
	}
	
	.searchMulSelect .selectedTagBox .selectedTag span{
		max-width: 100%;
	    overflow: hidden;
	    display: inline-block;
	}
</style>
<template>
	<div>
		<div class="selectList" v-show="showButtom">
			<ul>
				<li @click.stop="selectItem(item)" v-for="(item,index) in data" :key="index" :class="item.cls">{{item[displayName]}}</li>
			</ul>
		</div>
		<!-- <div class="selectList" v-show="searchKey && data.length == 0?true:false">
			<ul>
				<li style="text-align:center">无数据</li>
			</ul>
		</div> -->
	</div>
</template>
<script>

  export default {
    name: 'ButtomSection',
    props:['showButtom','data','noticeParent','searchKey','displayName'],
    data () {
		return {
			
		}
	},
	
    methods:{
		selectItem(item){
			this.noticeParent(item);
		}
    }
  }
</script>

<style scoped>
	.fa-check:before {
		content: "\F00C";
		position: absolute;
		right: 10px;
	}

  	.selectList{
		width: 100%;
	    transform-origin: center top 0px;
	    z-index: 2270;
	    position: absolute;
	    /* top: 35px; */
	    left: 0;
	    border: 1px solid #e4e7ed;
	    border-radius: 4px;
	    background-color: #fff;
	    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	    box-sizing: border-box;
	    margin: 5px 0;
	}

	.selectList ul{
		padding: 0;
		max-height: 186px;
		overflow-y: scroll;
		scrollbar-arrow-color: transparent; 
		scrollbar-face-color: transparent; 
		scrollbar-3dlight-color: transparent; 
		scrollbar-highlight-color: transparent; 
		scrollbar-shadow-color: transparent; 
		scrollbar-darkshadow-color: transparent; 
		scrollbar-track-color: transparent; 
	}

.selectList ul::-webkit-scrollbar{
	width:0px;
	height:0px;
}
.selectList ul::-webkit-scrollbar-track{
	background: transparent;
	border-radius:2px;
}
.selectList ul::-webkit-scrollbar-thumb{
	background: transparent;
	border-radius:2px;
}
.selectList ul::-webkit-scrollbar-thumb:hover{
	background: transparent;
}
.selectList ul::-webkit-scrollbar-corner{
	background: transparent;
}


	.selectList li{
			width: 100%;
		font-size: 14px;
		padding: 0 30px 0 10px;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #606266;
		height: 34px;
		line-height: 34px;
		box-sizing: border-box;
		cursor: pointer;
		text-align: left;
	}

	.selectList li:hover{
		background-color: #51536a;
		color: #fff;
	}

	.selectList li i{
		display: inline-block;
		position: absolute;
		top: 0;
		right: 5px;
		width: 16px;
		height: 100%;
		font-size: 12px;
	}

	.selectList li.active{
		color: #409eff;
		display: block;
	}

	.selectList li.active i{
		color: #409eff;
	}
</style>
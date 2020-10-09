<template>
    <div style="position:relative" class="form-item selectContent" >
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on!=undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div searchMulSelect" :class="state.successIcon" @click="focusInput" v-bodyClick="hideButtom" :_body_tag="inputdomKey">
			<!--选中的标签-->
			<div class="tags" :_body_tag="inputdomKey" :class="{readonlyIcon:readonlyFlag}" @mouseenter="showArr" @mouseleave="hideArr">
                <i v-show="showArrow" :_body_tag="inputdomKey" class="fa fa-chevron-down icon-del" @click="clickInput"></i>
                <i v-show="!showArrow&&showClearButtonFlag" class="fa fa-chevron-down icon-del fa-times-circle" @click.stop="clear"></i>
                <span class="placeholderText" @click.stop="focusInput" v-show="placeholderStr && (!inputFlag && !readonlyFlag)">{{placeholderStr}}</span>
				<left-section :readonly="readonlyFlag" :display-name="displayName" :data="leftArray" :notice-parent="noticeFromLeft"></left-section>
				
				<input :placeholder="placeholderStr" :_body_tag="inputdomKey" @click="clickInput" :ref="inputdomKey" :readonly=" !inputFlag || readonlyFlag" type="text" :class="{searchMsg:true,hideInput:!inputFlag || readonlyFlag}" v-model="searchName" />
			
                <p class="promptMsg" @click.stop v-show="state.showError">{{$attrs.msg}}</p>
                <p class="tip" @click.stop v-show="!state.showError">{{$attrs.tip}}</p>
            </div>

            <!--下拉弹出框-->
            <buttom-section :show-buttom="showButtom" :display-name="displayName" :searchKey="searchName" :data="buttomArray" :multipl="multiple" :notice-parent="noticeFromButtom"></buttom-section>
        </div>
    </div>
</template>

<script>
    import tool from '../leCompsTool.js';
    import LeftSection from "./left.vue";
    import ButtomSection from "./buttom.vue";
    import define from "../define.js";

    const getItemByDisplayValue = (data,displayValue,value)=>{
        let res = null;
        data.forEach(item=>{
            if(item[displayValue] != null && item[displayValue] != undefined && item[displayValue].toString() == value){
                res = item;
            }
        })
        return res;
    }

  export default {
    name: 'LeLocalSelect',
    props:["multiple","displayName","displayValue","value","dataSource","readonly","enabledInput","hideClearButton"],
    components: {LeftSection,ButtomSection},
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data () {
        return {
            validataComponentType:"Radio",
            inputdomKey:tool._idSeed.newId(),
            state:{
                successIcon:"",
                showError:false,
            },
            searchName:"",
            data:[],
            showButtom:false,
            showArrow:true,
            formLabelWidth:"0",
            placeholderStr:""
        }
    },
    computed:{
        labelWidthVal(){
            if(this.$attrs.labelWidth){
                return this.$attrs.labelWidth;
            }
            if(this.formLabelWidth != 0){
                return this.formLabelWidth;
            }
            return define.LABELWIDTH;
        },
        /**
         * @description 根据输入关键字来搜索
         * @returns 查询后的Array
         */
        buttomArray(){
            if(this.searchName != ""){
                return this.data.filter(item=>{
                    return item[this.displayName].toLowerCase().indexOf(this.searchName.toLowerCase()) != -1;
                })
            }
            return this.data;
        },
        leftArray(){
            return tool.object.getCheckedItems(this.data).items;
        },
        readonlyFlag(){
            if(this.readonly == undefined){
                return false;
            }
            if(this.readonly === ""){
                return true;
            }
            if(this.readonly === false){
                return false;
            }
            return true;
        },
        //是否允许模糊查询，默认不开启
        inputFlag(){
            if(this.enabledInput == undefined){
                return false;
            }
            if(this.enabledInput == ""){
                return true;
            }
            if(this.enabledInput == false){
                return false;
            }
            return true;
        },
        showClearButtonFlag(){
            if(this.hideClearButton){
                return false;
            }
            return true;
        }
    },
    watch:{
        value(val){
            this.setValue(val);
        },
        dataSource(val){
            if(val && val.length >0){
                this.init(val);
                this.setValue(this.value);
            }else{
                this.init([]);
                this.$emit("input","");
            }
        }
    },
    methods:{
        /**
         * @description 点击整体div，触发焦点到input框上面(输入框初始宽度不够)
         * @returns
         */
        focusInput(){
            if(this.readonlyFlag){
                return;
            }
            this.$refs[this.inputdomKey].focus();
            this.clickInput();
        },
        hideButtom(){
            this.showButtom = false;
        },
        /**
         * @description 输入框的点击事件
         * @returns
         */
        clickInput(){
            if(this.readonlyFlag){
                return;
            }
            if(this.data.length != 0){
                this.showButtom = true;
            }
        },
        /**
         * @description 搜索框的change事件，并且需要动态改变input框的宽度
         * @returns
         */
        inputChange(){
            let offsetWidth = parseInt(this.$refs[this.inputdomKey].offsetWidth);
            this.$refs[this.inputdomKey].style.width = (offsetWidth + 5) + "px";
        },
        /**
         * @description 设置数据源
         * @param data 设置数据源, 必须在组件上面配置displayName 和 displayValue
         * @returns 
         */
        init(data){
            let tmp = tool.object.cloneObj(data);
            this.data = tool.object.addPrimaryAndCk(tmp);
        },
        /**
         * @description 组件验证以及分发change事件
         * @returns
         */
        onEmit(){
            let selectedItems = this.getSelectedItems();
            let vals = selectedItems.vals.join(',');
            this.$emit("input",vals);
            this.$emit("change",vals);
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        checkPlaceholder(){
            let selectedItems = this.getSelectedItems();
            let vals = selectedItems.vals.join(',');
            if(vals != ""){
                this.placeholderStr = "";
            }else{
                this.placeholderStr = this.$attrs.placeholder;
            }
        },
        /**
         * @description buttom组件发来的更新通知,更新数据源
         * @returns
         */
        noticeFromButtom(item){
            //多选
            if(this.multiple != undefined){
                item.ck = !item.ck;
                item.cls = !item.ck?"":"active fa fa-check"
            }else{
                //单选
                this.data.forEach(x=>{
                    if(x.__tmpId == item.__tmpId){
                        item.ck = !item.ck;
                        item.cls = item.ck?"active fa fa-check":"";
                    }else{
                        x.cls = "";
                        x.ck = false;
                    }
                })
                this.showButtom = false;
            }
            this.searchName = "";
            this.onEmit();
        },
        /**
         * @description left组件发来的更新通知，更新数据源
         * @returns
         */
        noticeFromLeft(item){
            if(this.readonlyFlag){
                return;
            }
            item.cls = "";
            item.ck = false;
            this.onEmit();
        },
        /**
         * @description 获取所选项
         * @returns items:所选的对象数组，vals:所选的值集合
         */
        getSelectedItems(filed){
            return tool.object.getCheckedItems(this.data,filed?filed:this.displayValue);
        },
        /**
         * @description 获取选中项的displayValue的集合
         * @returns {String} 逗号分隔的字符串
         */
        getValue(){
            if(this.data.length ==0){
                return "";
            }
            return this.getSelectedItems().vals.join(',');
        },
        /**
         * @description 设置选中项
         * @param {ids} displayValue的集合, 逗号分隔, 如果传入空，则重置所有
         */
        setValue(ids = ""){
            ids = ids.toString();
            //重置
            this.resetDataCkStatus();
            //选中
            ids.split && ids.split(',').forEach(val=>{
                let tmp = getItemByDisplayValue(this.data,this.displayValue,val);
                if(tmp){
                    tmp.cls = "active fa fa-check";
                    tmp.ck = true;
                }
            })
            this.checkPlaceholder();
        },
        resetDataCkStatus(){
            this.data.forEach(item=>{
                item.cls = "";
                item.ck = false;
            })
        },
        /**
         * @description 清空
         * @returns 
         */
        clear(){
            if(this.readonlyFlag){
                return;
            }
            this.resetDataCkStatus();
            this.searchName = "";
            this.$emit("input","");
            this.$emit("change","");
            this.showButtom = false;
            window.setTimeout(()=>{
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },0)
        },
        hideArr(){
            if(this.readonlyFlag){
                return;
            }
            if(this.hideClearButton){
                return;
            }
            this.showArrow = true;
        },
        showArr(){
            if(this.readonlyFlag){
                return;
            }
            if(this.leftArray.length == 0){
                return;
            }
            if(this.hideClearButton){
                return;
            }
            this.showArrow = false;
        },
    },
    created(){
        let that = this;
        tool._form_event_publisher.on(that._uid,(data)=>{
            this.formLabelWidth = data;
        });
    },
    mounted(){
        /**
         * @description 添加事件监听
         * @returns
         */
        // document.body.addEventListener("click",this.bodyClick,false);
        //在有数据的清空下，直接初始化数据源以及设置值
        if(this.dataSource && this.dataSource.length >0){
            this.init(this.dataSource);
        }
        this.setValue(this.value);
    },
    beforeDestroy(){
        /**
         * @description 在组件销毁之前，取消事件监听
         * @returns
         */
        // document.body.removeEventListener("click",this.bodyClick);
    }
  }
</script>
<style scoped>
    .blueborder{
        border-color:#409eff !important;
    }
    
    .selectContent{
        position: relative;
        text-align: left;
        margin-bottom: 22px;
        display: flex;
    }
    
    .selectContent label{
        text-align: right;
        color: #606266;
        display: inline-block;
        font-size: 14px;
    }

    .medium .selectContent label{
        display: inline-block;
    }

    .searchMulSelect{
		position: relative;
	    background-color: #fff;
	    background-image: none;
	    border-radius: 4px;
	    border: 1px solid #dcdfe6;
	    box-sizing: border-box;
	    color: #606266;
	    outline: none;
	    display: inline-block;
	    font-size: inherit;
	    min-height: 40px;
	    line-height: 40px;
	    width:180px;
        cursor: pointer;
        margin: 0;
        vertical-align: middle;
        padding: 0 !important;
	}
	
	.searchMulSelect input:focus{
		border-color: #409EFF;
	}
	
	.searchMulSelect .tags{
        padding-right: 26px;
		width: 100%;
        /* min-height: 100%; */
        min-height: 40px;
        line-height: normal;
        white-space: normal;
        z-index: 1;
        position: relative;
	}

    .searchMulSelect .placeholderText{
        color: #b9bdc3;
        /* color: red; */
        font-size: 14px;
        position: absolute;
        top: 52%;
        left: 10px;
        transform: translateY(-50%);    
    }

    .searchMulSelect .tags.readonlyIcon{
        background-color: #f1f1f1;
    }
	
	.searchMulSelect .searchMsg{
		outline: none;
	    margin-left: 5px;
	    color: #666;
	    font-size: 14px;
	    border:none;
	    padding: 0 5px;
	    height: 40px;
        line-height: 100%;
	    background-color: transparent;
	    width: 100px;
	    vertical-align: top;
    }

    .searchMulSelect .hideInput{
        display: none;
    }
    
    .tags .icon-del{
        position: absolute;
        top: 50%;
        right: 8px;
        color: #c0c4cc;
        font-weight: normal;
        transform: translateY(-50%);
    }

    .searchMulSelect.fa-check-circle-o {
        border: 1px solid #67c23a;
    }

    .searchMulSelect.fa-times-circle-o {
        border: 1px solid #f56c6c;
    }

    .form-item .form-item-div{
        width: 100%;
            flex: 1;
        min-width: 130px;
    }

    .searchMulSelect .fa-chevron-down.fa-times-circle:before{
        content: "\F057";
    }

    .selectContent .form-item-label{
        margin: 0 5px 0 10px;
    }
</style>
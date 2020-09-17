<template>
    <div>
        <div class="table-title" v-show="title">{{title}}</div>
        <div class="tableContainer">
            <div class="tableBox">
                <table class="table">
                    <header-section :singleSelected="singleSelected" :show-ck="showCk" :origin-cols="originCols" :accpet-h-b-notice="accpetHBNotice" :notice-change-cols="noticeChangeCols" :ck="state.ck" :actions="actions" :cols="state.cols"></header-section>        

                    <body-section :singleSelected="singleSelected" :show-ck="showCk" :actions="actions" :cols="state.cols" :accpet-h-b-notice="accpetHBNotice" :data="state.data"></body-section>
                </table>
            </div>

            <paging-section :changeKey="changeKey" :options="state.pageOption" :go-index="gIndex" :go-prev="prev" :go-next="next"></paging-section>

            <div v-show='isLoading' class="tableMask">
                <img class="tableLoadingImg" src="//p2-nec.static.pub/fes/cms/2020/04/19/t960paupk2x9wzsw1y79dcmpeho847108450.gif"/>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderSection from "./header.vue";
    import BodySection from "./body.vue";
    import PagingSection from "./paging.vue";
    import tool from "../leCompsTool.js";
    // import Ajax from "../../tool/http.js";
    
    export default {
        components: {HeaderSection,BodySection,PagingSection},
        props:["options","title"],
        name: "TableList",
        data(){
            return {
                changeKey:tool._idSeed.newId(),
                state:{
                    data:[],
                    cols:this.options.map,
                    ck:false,
                    pageOption:{
                        index:this.options.pageOption.index?this.options.pageOption.index:1,
                        size:this.options.pageOption.size?this.options.pageOption.size:10,
                        count:0,
                        total:0
                    },
                },
                //在上一次请求没有完成之前，不允许发送下一次请求
                isLoading:false
            }
        },
        computed:{
            ajaxType(){
                return this.options.ajaxType?this.options.ajaxType:"get";
            },
            originCols:function(){
                return tool.object.cloneObj(this.options.map);
            },
            showCk:function(){
                return this.options.showCk;
            },
            actions:function(){
                return this.options.actions;
            },
            getUrl:function(){
                return this.options.getUrl;
            },
            singleSelected:function(){
                return this.options.singleSelected;
            }
        },
        methods:{
            /**
             * @description 根据参数获取数据源
             * @returns
             */
            getData:function(index){
                if(this.isLoading){
                    return;
                }
                this.isLoading = true;
                if(!index){
                    index = 1;
                }
                let url = this.options.getUrl();
                let size = this.state.pageOption.size;
                if( url === ""){
                    this.noResultCb();
                    console.log("invalid url !");
                    return;
                }
                let tmpPromise = null;
                if(this.ajaxType == "get"){
                    let suffix = url.indexOf('?') === -1?"?":"&";
                    url += suffix + this.options.pageOption.indexKey + "=" + index + "&"+ this.options.pageOption.sizeKey + "=" + size;
                    tmpPromise = this.ajax.get(url);
                }else{
                    let tmpData = this.options.getParams?this.options.getParams():{};
                    tmpData[this.options.pageOption.indexKey] = index;
                    tmpData[this.options.pageOption.sizeKey] = size;
                    tmpPromise = this.ajax.post(url,tmpData);
                }
                
                tmpPromise.then(data=>{
                    this.isLoading = false;
                    let res = {};
                    if(this.options.analysis){
                        res = this.options.analysis(data);
                    }else{
                        res = data;
                    }                    
                    if(res.data && res.data instanceof Array && res.data.length != 0){
                        let arr = tool.object.addPrimaryAndCk(res.data);
                        let total = -1;
                        if(parseInt(res.count)%size == 0){
                            total = parseInt(res.count)/size;
                        }else{
                            total = parseInt(parseInt(res.count)/size) + 1;
                        }

                        this.state = {
                            data:arr,
                            cols:this.state.cols,
                            ck:false,
                            pageOption:{
                                index:index,
                                count:res.count,
                                total:total,
                                size:size
                            }
                        }
                    }else{
                        this.noResultCb();
                        console.log("The data source is empty, please check  analysis , getUrl and pageOption");
                    }
                }).catch(e=>{
                    this.alert.showAlert("error",e.msg);
                    this.noResultCb();
                })
            },
            /**
             * @description 没有请求或者请求异常的情况下，显示无结果的数据处理
             * @returns
             */
            noResultCb(){
                let size = this.state.pageOption.size;
                this.isLoading = false;
                this.state = {
                    data:[],
                    cols:this.state.cols,
                    ck:false,
                    pageOption:{
                        index:1,
                        count:0,
                        total:1,
                        size:size
                    }
                }
            },
            /**
             * @description 从head和body接收到通知，需要更新数据源，然后下发所有子组件
             */
            accpetHBNotice:function(hData,bData){
                //如果data有参数，说明是从head过来的通知，如果没有就说明是body过来的通知
                if(hData){
                    this.state.data.map(item=>{
                        item.ck = hData.ck;
                    })
                    this.state = {
                        data:this.state.data,
                        ck:hData.ck,
                        cols:this.state.cols,
                        pageOption:this.state.pageOption
                    }
                }
                if(bData){
                    let items = tool.object.getCheckedItems(bData.data);
                    let flag = items.items.length == this.state.data.length?true:false;
                    this.state = {
                        data:bData.data,
                        ck:flag,
                        cols:this.state.cols,
                        pageOption:this.state.pageOption
                    }
                }
            },
            /**
             * @description 从head里面收到通知，表头的cols变化
             * @returns
             */
            noticeChangeCols:function(map){
                this.state.cols = map;
            },
            /**
             * @description 分页的上一页事件
             * @returns
             */
            prev:function(){
                let index = this.state.pageOption.index;
                index--;
                this.getData(index);
            },
            /**
             * @description 分页的下一页事件
             * @returns
             */
            next:function(){
                let index = this.state.pageOption.index;
                index++;
                this.getData(index);
            },
            /**
             * @description 分页组件，到某一页的事件
             * @returns
             */
            gIndex:function(index){
                this.getData(index);
            },
            /**
             * @description 获取tbody里面选中了哪些项
             * @param field 字段名称, 非必填项
             * @returns {data:[],vals:[]}
             */
            getCheckedItems(field){
                let res = {data:[],vals:[]};
                if(this.state.data && this.state.data instanceof Array){
                    this.state.data.forEach(x=>{
                        if(x.ck){
                            res.data.push(x);
                            if(field){
                                res.vals.push(x[field]);
                            }
                        }
                    })
                }
                return res;
            },
            /**
             * @description 获取组件当前参数，包含index，和 tbody的data
             * @returns {index:0,data:[]}
             */
            getParams(){
                return {index:this.state.pageOption.index,data:this.state.data};
            },
            /**
             * @description 搜索方法
             * @param index 搜索索引，非必填
             * @returns
             */
            search(index){
                if(!index){
                    this.getData();
                }else{
                    this.getData(this.state.pageOption.index);
                }
            },
            /**
             * @description 在当前index下搜索
             * @returns
             */
            searchCurrentIndex(){
                this.search(this.getParams().index);
            }
        },
        mounted () {
            this.getData(this.state.pageOption.index);

            tool._form_event_publisher.on(this.changeKey,(data)=>{
                this.state.pageOption.size = data.size;
                this.search();
            });
        },
        destroyed(){
            
        }
    }
</script>
<style scoped>
    .table-title{
        text-align: center;
        width: 100%;
        margin: 0 auto;
        border-radius: 3px 3px 0 0;
        height: 38px;
        line-height: 38px;
        background-color: #434e5b;
        font-size: 14px;
        color: #fff;
    }
    
    .tableContainer{
        display: block;
        min-width: 100%;
        position: relative;
    }

    .tableContainer .tableMask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left:0;
        background: rgba(0, 0, 0, 0.8);
        display: block;
    }

    .tableContainer .tableBox{
        overflow:scroll; 
    }

    .tableContainer .table-title{
        text-align: center;
        width: 100%;
        margin: 0 auto;
        border-radius: 3px 3px 0 0;
        height: 38px;
        line-height: 38px;
        background-color: #434e5b;
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .table{
        min-width: 100%;
        width: auto;
        border-collapse: collapse;
        font-size: 14px;
        overflow: hidden;
        margin-bottom: 0px;
    }
  
    table thead{
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        color: #fff;
        background-color: #e3e3e3;
    }

    table tbody{
        height: 38px;
        line-height: 38px;
        font-size: 12px;
    }

    .tableMask .tableLoadingImg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

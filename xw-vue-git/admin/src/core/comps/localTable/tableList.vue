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
        </div>
    </div>
</template>

<script>
    import HeaderSection from "./header.vue";
    import BodySection from "./body.vue";
    import tool from "../leCompsTool.js";
    
    export default {
        components: {HeaderSection,BodySection},
        props:["options","title"],
        name: "LocalTableList",
        data(){
            return {
                originData:[],
                state:{
                    data:[],
                    cols:this.options.map,
                    ck:false
                }
            }
        },
        computed:{
            originCols(){
                return tool.object.cloneObj(this.options.map);
            },
            showCk(){
                return this.options.showCk;
            },
            actions(){
                return this.options.actions;
            },
            singleSelected(){
                return this.options.singleSelected;
            }
        },
        methods:{
            /**
             * @description 根据参数获取数据源
             * @returns
             */
            init(data){
                if(data && data instanceof Array && data.length !=0){
                    let tmp = tool.object.cloneObj(data);
                    this.originData = tool.object.cloneObj(data);
                    this.state = {
                        data:tool.object.addPrimaryAndCk(tmp),
                        cols:this.state.cols,
                        ck:false
                    }
                }else{
                    this.noResultCb();
                }
            },
            resetTable(){
                this.init(this.originData);
            },
            /**
             * @description 没有请求或者请求异常的情况下，显示无结果的数据处理
             * @returns
             */
            noResultCb(){
                this.state = {
                    data:[],
                    cols:this.state.cols,
                    ck:false
                }
            },
            /**
             * @description 从head和body接收到通知，需要更新数据源，然后下发所有子组件
             */
            accpetHBNotice(hData,bData){
                //如果data有参数，说明是从head过来的通知，如果没有就说明是body过来的通知
                if(hData){
                    this.state.data.map(item=>{
                        item.ck = hData.ck;
                    })
                    this.state = {
                        data:this.state.data,
                        ck:hData.ck,
                        cols:this.state.cols
                    }
                }
                if(bData){
                    let items = tool.object.getCheckedItems(bData.data);
                    let flag = items.items.length == this.state.data.length?true:false;
                    this.state = {
                        data:bData.data,
                        ck:flag,
                        cols:this.state.cols
                    }
                }
            },
            /**
             * @description 从head里面收到通知，表头的cols变化
             * @returns
             */
            noticeChangeCols(map){
                this.state.cols = map;
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
             * @description 删除指定项或者当前选中项
             * @param {json} row:非必填
             * @returns
             */
            removeItems(row){
                if(row){
                    this.state.data = tool.arrayServer.removeItems(this.state.data, [row]);
                }else{
                    let items = this.getCheckedItems();
                    if(items.data.length > 0){
                        this.state.data = tool.arrayServer.removeItems(this.state.data, items.data);
                    }
                }
            }
        },
        mounted () {

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

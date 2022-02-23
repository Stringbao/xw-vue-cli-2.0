<template>
    <div class="ML12" >
         <div class = "fa-item" :class="item.__color" :style="'margin-left:'+(item.__level-1)*10+'px'">
            <!-- <input type="button"  class="fa" :class="item.__cls" /> -->
            <span @click="expandNode(item)" type="button" class="fa arrIcon" :class="item.__cls"></span>
            <span v-if="checkbox!=undefined?true:false" class="fa" :class="[getCheckedCls(item),readonly?'readonly-checkbox':'']" @click="changeCheckboxStatus(item)"></span>
            <span class="tree-item-name" @dblclick="dbClickItem(item)" @click="selectItem(item)" :title="item[displayName]">{{asynOptions.convert?asynOptions.convert(item):item[displayName]}}</span>    
        </div>
        <div v-if="item.__children instanceof Array && item.__children.length != 0" v-show="item.__expand">
            <tree-item
                v-for="(x,index) in item.__children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :asynOptions="asynOptions"
                :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
                :checkbox = "checkbox"
                :readonly="readonlyFlag(x)"
            ></tree-item>
        </div>
    </div>
</template>

<script>
import Constant from "../contant/index.js";
import { $idSeed,$obj,$event_publisher } from "../leCompsTool.js";
// import Ajax from "../../tool/http.js";
var time = null; 
export default {
    name:"TreeItem",
    props:["item","displayName","asynOptions","EVENTPUBLISHKEY","checkbox","readonly"],
    data(){
        return {

        }
    },
    methods:{
        readonlyFlag(item){
            /**
             * @description 这里是树节点针对每个节点上的私有方法
             * @param 当前node节点
             * @returns
             */
            if(this.asynOptions.showPartialCheckBox){
                return this.asynOptions.showPartialCheckBox(item)
            }
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
        getCheckedCls(item){
            if(item.__checkboxStatus == "1"){
                return 'fa-checkBox fa-check-square';
            }else if(item.__checkboxStatus == "3"){
                return 'fa-minus-square';
            }
            else{
                return 'fa-checkBox';
            }
        },
        /**
         * @description checkbox状态改变的事件
         * 1：选中，2：未选中，3：子节点未全部选中
         */
        changeCheckboxStatus(item){
            if(this.readonly){
                return;
            }
            if(this.checkbox != undefined){
                $event_publisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:Constant.TREE_CONFIG.ACTIONKEY.CHECKBOX,
                    item:item,
                    __tmpId:item.__tmpId,
                    checkboxStatus:item.__checkboxStatus == 1?2:1
                });
            }
        },
        /**
         * @description 展开节点操作，包含无子节点数据情况下的ajax请求和有数据情况下的显示和隐藏
         * @param item: 当前选中节点
         */
        expandNode(item){
            if(item.__children.length == 0){
                let _url  = this.asynOptions.getUrl(item);
                //发送ajax请求, 改变loading状态
                if(!_url){
                    return;
                }
                item.__cls = "fa-caret-load";
                this.ajax.get(_url).then(d=>{
                    //asynOptions 函数必须返回数组
                    let tmp = this.asynOptions.analysis && this.asynOptions.analysis(d);
                    
                    //通知root节点，有数据变化，自己本身节点不做任何改变(不能改变自身对象)
                    let tmpObject = {actionKey:Constant.TREE_CONFIG.ACTIONKEY.UPDATECHILDREN,__tmpId:item.__tmpId,item:item,data:{}};
                    if(tmp && tmp instanceof Array && tmp.length != 0){
                        let tmpData = Constant.TREE_CONFIG.ASYNINITATTRIBUTE(tmp,item,false);
                        tmpObject.data.children = tmpData;
                        tmpObject.data.expand = true;
                        tmpObject.data.cls = "fa-caret-down";
                    }else{
                        tmpObject.data.children = [];
                        tmpObject.data.expand = false;
                        tmpObject.data.cls = "fa-caret-left";
                    }
                    $event_publisher.broadcast(this.EVENTPUBLISHKEY,tmpObject);
                }).catch(e => {
                    this.alert.showAlert("error",e.msg || e)
                });
            }else{
                let cls = "";
                if(item.__children && item.__children instanceof Array && item.__children.length != 0){
                    if(item.__cls == "fa-caret-right"){
                        cls = "fa-caret-down";
                    }else{
                        cls = "fa-caret-right";
                    }
                }else{
                    cls = "fa-caret-left";
                }

                $event_publisher.broadcast(this.EVENTPUBLISHKEY,{
                    actionKey:Constant.TREE_CONFIG.ACTIONKEY.OPEN,
                    item:item,
                    __tmpId:item.__tmpId,
                    data:{
                        expand:!item.__expand,
                        cls:cls
                    }
                });
            }
        },
        /**
         * @description 选中当前项事件，会传递到root触发选中回调
         * @param item:当前选中项
         */
        selectItem(item){
            clearTimeout(time);  //首先清除计时器
            time = setTimeout(() => {
                if(this.readonly){
                    return false
                }
                if(this.asynOptions.expandNotSelect){
                    this.expandNode(item);
                    return;
                }else{
                    if(this.asynOptions.expandAndSelect){
                        this.expandNode(item);
                    }
                    $event_publisher.broadcast(this.EVENTPUBLISHKEY,{
                        actionKey:Constant.TREE_CONFIG.ACTIONKEY.SELECTEDITEM,
                        __tmpId:item.__tmpId,
                        item:item,
                        selectedItem:item
                    });
                }
            },300)
        },
        dbClickItem(item){
            clearTimeout(time);
            $event_publisher.broadcast(this.EVENTPUBLISHKEY,{
                actionKey:Constant.TREE_CONFIG.ACTIONKEY.DBSELECTEDITEM,
                __tmpId:item.__tmpId,
                item:item,
                selectedItem:item
            });
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
    div{
        color: #606266;
    }
    .tree-item-name{
        cursor:pointer;
    } 
    .ML12 .color{
        /* background:#f55!important;
        color:#fff!important; */
        color: red !important;
    }
    .ML12{
        padding-left:6px;
        padding-right: 6px;
    }
    .ML12 .fa-item{
        padding-left: 0;
        text-align: left;
        color: #606266;
        font-size: 14px;
        padding:2px;
        /* overflow: hidden;
        text-overflow:ellipsis; */
        white-space: nowrap;
        position: relative;
    }
    .fa-item button{
        color: #606266;
        padding:0;
        border: none;
        background-color: transparent;
        outline: none;
    }
    .fa-item button::before{
        color: #a7acb5;
        width: 12px;
        height: 12px;
        display: inline-block;
        text-align: center;
        vertical-align: baseline;
        padding: 6px 0;
    }

    .fa-item .fa-caret-left::before{
        color: transparent;
    }

    .fa-item .fa-caret-load{
        background: url("//p3-nec.static.pub/fes/cms/2020/04/19/y83k4voc830up7l4m2jlrvy4b2x9nf443748.gif") 0 0 no-repeat;
        background-size: 100%;
        width: 12px;
        height: 23px;
        /* padding: 6px 0; */
        background-position: center;
        vertical-align: middle;
        background-position-y: 2px;
     }
    
    .fa-checkBox{
        width: 12px;
        height: 12px;
        border: 1px solid #337ab7;
        display: inline-block;
        border-radius: 2px;
        margin-right: 2px;
        /* vertical-align: sub; */
        vertical-align: middle;
        position: relative;
    }

    .fa-check-square:before{
        color: #337ab7;
        position: absolute;
        top: -2px;
        left: -1px;
    }

    .fa-item .arrIcon{
        width: 10px;
        height: 12px;
    }

    .fa-caret-right:before {
        position: absolute;
        /* top: 8px; */
        top: 6px;
        left: 6px;
    }

    .fa-minus-square:before{
        color: #337ab7;
    }
    .readonly-checkbox{
        background-color: #f1f1f1;
    }
</style>

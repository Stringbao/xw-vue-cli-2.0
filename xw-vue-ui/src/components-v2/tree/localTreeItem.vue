<template>
    <div class="ML12" >
         <div class = "fa-item" :class="item.__color" :style="'margin-left:'+(item.__level-1)*10+'px'">
            <!-- <input type="button" @click="expandNode(item)" class="fa" :class="item.__cls" /> -->
            <span type="button" @click="expandNode(item)" class="fa arrIcon" :class="item.__cls"></span>
            <span v-if="checkbox!=undefined?true:false" class="fa" :class="getCheckedCls(item)" @click="changeCheckboxStatus(item)"></span>
            <span class="tree-item-name" @dblclick="dbClickItem(item)" @click="selectItem(item)" :title="item[displayName]">{{item[displayName]}}</span>     
        </div>
        <div v-if="item.__children instanceof Array && item.__children.length != 0" v-show="item.__expand">
            <tree-item
                v-for="(x,index) in item.__children"
                :item="x"
                :key="index"
                :displayName="displayName"
                :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
                :checkbox = "checkbox"
                :readonly="readonly"
            ></tree-item>
        </div>
    </div>
</template>

<script>
import Constant from "../contant/index.js";
import { $idSeed,$obj,$event_publisher } from "../leCompsTool.js";

export default {
    name:"TreeItem",
    props:["item","displayName","EVENTPUBLISHKEY","checkbox","readonly"],
    data(){
        return {

        }
    },
    methods:{
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
                    __tmpId:item.__tmpId,
                    item:item,
                    checkboxStatus:item.__checkboxStatus == 1?2:1
                });
            }
        },
        /**
         * @description 展开节点操作
         * @param item: 当前选中节点
         */
        expandNode(item){
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
                __tmpId:item.__tmpId,
                item:item,
                data:{
                    expand:!item.__expand,
                    cls:cls
                }
            });
        },
        /**
         * @description 选中当前项事件，会传递到root触发选中回调
         * @param item:当前选中项
         */
        selectItem(item){
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
        },
        dbClickItem(item){
            console.log(item)
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
        padding: 6px 0;
        background-position: center;
        vertical-align: baseline;
        background-position-y: 5px;
     }
    
    .fa-checkBox{
        width: 12px;
        height: 12px;
        border: 1px solid #337ab7;
        display: inline-block;
        border-radius: 2px;
        margin-right: 2px;
        margin-bottom: 3px;
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

    .fa-caret-right:before{
        position: absolute;
        left:6px;
    }

</style>

<template>
    <div class="asynTreeContent">
        <tree-item
            v-for="(item,index) in state.data" :key="index"
            :item="item"
            :displayName="displayName"
            :asynOptions="asynOptions"
            :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
            :checkbox="checkbox"
            :readonly="readonlyFlag"
        ></tree-item>
    </div>
</template>
<script>

import TreeItem from "./asynTreeItem.vue";
import tool from '../leCompsTool.js';
import DEFINE_KEY from "../define.js";
import _treeTool from "./treePrivateMethods.js";
// import Ajax from "../../tool/http.js";

export default {
    name:"LeAsynTree",
    components:{TreeItem},
    props:["displayName","asynOptions","itemClick",'checkbox',"readonly"],
    data(){
        return {
            originData:null,
            state:{
                data:[]
            },
            EVENTPUBLISHKEY:tool._idSeed.newId() + "_TREE_NOTICEKEY",
        }
    },
    computed:{
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
    },
    methods:{
        /**
         * @description 根据当前节点的checkbox状态，修改所有父节点的checkbox状态
         * @param 当前node节点
         * @returns
         */
        setParentCheckBoxStatus(node){
            
            if(node && node.__children.length != 0){
                let res = {s1:0,s2:0,s3:0};
                node.__children.forEach(x=>{
                    if(x.__checkboxStatus == 1){
                        res.s1++;
                    }
                    if(x.__checkboxStatus == 2){
                        res.s2++;
                    }
                    if(x.__checkboxStatus == 3){
                        res.s3++;
                    }
                })
                
                if(res.s2 == node.__children.length){
                    node.__checkboxStatus = 2;
                }else{
                    if(res.s1 == node.__children.length){
                        node.__checkboxStatus = 1;
                    }
                    if(res.s1 >0 && res.s1 < node.__children.length){
                        node.__checkboxStatus = 3;
                    }
                    if(res.s3 >0){
                        node.__checkboxStatus = 3;
                    }
                }
                
                // node.__checkboxStatus = count == node.__children.length?true:false;

                this.setParentCheckBoxStatus(node.__parentNode);
            }
        },
        /**
         * @description 根据当前节点的checkbox状态，修改所有子节点的checkbox状态
         * @param 当前node节点
         * @param status状态
         * @returns
         */
        setChildrenCheckboxStatus(node, status){
            if(!node){
                return;
            }
            node.__checkboxStatus = status;
            //如果存在children，则改变所有子元素
            if(node.__children.length != 0){
                node.__children.forEach(x => {
                    x.__checkboxStatus = status;
                    this.setChildrenCheckboxStatus(x,status);
                });
            }
        },
        /**
         * @description 初始化并且默认获取第一个根节点
         * @returns node/null
         */
        init(data){
            this.originData = tool.object.cloneObj(data);
            let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(tool.object.cloneObj(data),null,true);
            this.state = {
                data:tmpData
            };
            if(this.state.data.length > 0){
                return this.state.data[0];
            }
            return null;
        },
        /**
         * @description 重置所有
         */
        reset(){
            let _originData = tool.object.cloneObj(this.originData);
            this.state = {
                data:DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(_originData,null,true)
            };
            this._originData = _originData;
        },
        // updateSingleNode(node,data){
        //     node[this.displayName] = data.__displayName?data.__displayName:node[this.displayName];
        //     if(data.__children && data.__children instanceof Array && data.__children.length != 0){
        //         let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(data.__children,node,false);
        //         node.__children = tmpData;
        //     }
        // },
        /**
         * @description 更新当前节点
         * @param node 当前节点
         */
        reloadNode(node){
            let _url  = this.asynOptions.getUrl(node);
            node.__cls = "fa-caret-load";
            this.ajax.get(_url).then(d=>{
                let tmp = this.asynOptions.analysis && this.asynOptions.analysis(d);
                if(tmp && tmp instanceof Array && tmp.length != 0){
                    let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(tmp, node, false);
                    node.__children = tmpData;
                    node.__cls = "fa-caret-down";
                }else{
                    node.__children = [];
                    node.__cls = "fa-caret-left";
                }
            })
        },
        /**
         * @description 删除节点
         * @param node 需要删除的节点
         */
        deleteSingleNode(node){
            let parentNode = node.__parentNode;
            //非根节点
            if(parentNode){
                tool.arrayServer.removeItems(parentNode.__children,[node]);
            }
            //根节点
            else{
                tool.arrayServer.removeItems(this.state.data,[node]);
            }
        },
        convertData(arr, filed){
            let res = [];
            arr.forEach(x=>{
                let tmp = {name:x[filed],status:x.__checkboxStatus};
                res.push(tmp);
            })
            return res;
        },
        getIdsInConvertData(data){
            let res = [];
            data.forEach(x=>{
                res.push(x.name);
            })
            return res.join(',');
        },
        /**
         * @description 获取所有被选中子节点
         * @returns Array
         */
        getAllCheckedNodes(){
            _treeTool.checkedNodes = [];
            _treeTool.getAllCheckedNodes(this.state.data);
            return _treeTool.checkedNodes;
        },
        /**
         * @description 获取所有被选中子节点，不包含parentNode
         * @returns Array
         */
        getAllCheckboxNodesExcludeParent(){
            _treeTool.checkedNodes = [];
            _treeTool.getAllCheckboxNodesExcludeParent(this.state.data);
            return _treeTool.checkedNodes;
        },
        expandNodeById(idArr, count = 0, cb){
            if(idArr.length == count){
                return;
            }
            let id = idArr[count].name;
            let node = _treeTool.getNodeByField(this.state.data, "id", id);
            if(!node){
                console.log('node 404');
                return;
            }
            node.__checkboxStatus = idArr[count].status;
            console.log(node);
            let _url  = this.asynOptions.getUrl(node);
            node.__cls = "fa-caret-load";
            this.ajax.get(_url).then(d=>{
                let tmp = this.asynOptions.analysis && this.asynOptions.analysis(d);
                let tmpData = DEFINE_KEY.TREE_CONFIG.ASYNINITATTRIBUTE(tmp, node, false);
                node.__children = tmpData;
                node.__expand = true;
                node.__cls = "fa-caret-down";
                count++;
                this.expandNodeById(idArr, count, cb);
                if(idArr.length == count){
                    cb && cb();
                }
            })
        },
        /**
         * {id1:status,id2:status}
         */
        bindData(arr){
            this.expandNodeById(arr, 0, ()=>{
                console.log(this.state.data);
            });
        }
    },
    mounted(){
        //订阅所有
        let that = this;
        /**
         * @description 处理所有订阅事件
         */
        tool._form_event_publisher.on(this.EVENTPUBLISHKEY,d=>{
            let item = d.item;
            //如果数据错误，没有找到当前节点，直接return
            if(!item){
                return;
            }
            //无children情况下，展开事件（ajax请求）
            if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.UPDATECHILDREN){
                console.log("do ajax");
                item.__children = d.data.children;
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //有children的情况下，展开事件
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.OPEN){
                console.log("do expand");
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //当前项选中事件，执行callback
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.SELECTEDITEM){
                console.log("do select item");
                _treeTool.setSingleColor(this.state.data,item);
                this.itemClick(item);
            }
            //checkbox状态变化事件
            else if(d.actionKey == DEFINE_KEY.TREE_CONFIG.ACTIONKEY.CHECKBOX){
                console.log("checkbox status changed");
                //改变所有子节点的checkbox状态
                this.setChildrenCheckboxStatus(item, d.checkboxStatus);
                //改变所有父节点的checkbox状态
                this.setParentCheckBoxStatus(item.__parentNode);
            }
        })
    }
}
</script>

<style scoped>
    .asynTreeContent{
        overflow: auto;
        width: 100%;
        height: 100%;
    }
</style>


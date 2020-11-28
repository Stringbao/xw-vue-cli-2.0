
<template>
    <div class="localTreeContent">
        <tree-item
            v-for="(item,index) in state.data" :key="index"
            :item="item"
            :displayName="displayName"
            :EVENTPUBLISHKEY="EVENTPUBLISHKEY"
            :checkbox="checkbox"
            :readonly="readonlyFlag"
        ></tree-item>
    </div>
</template>
<script>

import TreeItem from "./localTreeItem.vue";
import tool from '../leCompsTool.js';
import Constant from "../contant/index.js";
import _treeTool from "./treePrivateMethods.js";
import { $idSeed,$event_publisher,$obj} from "../leCompsTool.js";
export default {
    name:"LeLocalTree",
    components:{TreeItem},
    props:["displayName","itemClick",'checkbox','childrenKey',"related"],
    data(){
        return {
            originData:null,
            state:{
                data:[]
            },
            EVENTPUBLISHKEY:$idSeed.newId() + "_TREE_NOTICEKEY",
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
        setChildrenCheckboxStatus(node,status){
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
         * @description 递归初始化数据源
         * @param {Array} data 
         * @param {Object} parentNode 
         */
        initAttributeData(data,parentNode){
            if(data && data instanceof Array && data.length != 0){
                for(let i=0;i<data.length;i++){
                    data[i].__parentId = parentNode?parentNode.__tmpId:-1;
                    if(!parentNode){
                        data[i].__level = 1;
                    }else{
                        data[i].__level = parentNode.__level + 1;
                    }
                    data[i].__parentNode = parentNode;
                    data[i].__tmpId = $idSeed.newId();
                    data[i].__children = data[i][this.childrenKey]&&data[i][this.childrenKey] != 0?data[i][this.childrenKey]:[];
                    if(data[i].__children.length >0){
                        data[i].__cls = "fa-caret-right";
                    }else{
                        data[i].__cls = "fa-caret-left";
                    }
                    data[i].__expand = false;
                    data[i].__color = "";
                    data[i].__checkboxStatus = 2;
                    this.initAttributeData(data[i].__children,data[i]);
                }
            }
        },
        /**
         * @description 初始化并且默认获取第一个根节点
         * @returns node/null
         */
        init(data){
            this.originData = $obj.clone(data);
            let tmpData = $obj.clone(data);
            this.initAttributeData(tmpData, null);
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
            let _originData = $obj.clone(this.originData);
            this.initAttributeData(_originData);
            this.state = {
                data:_originData
            };
            this._originData = _originData;
        },
        /**
         * @description 递归，展开折叠所有
         * @param {Array} data 
         * @param {beanloon} flag 
         */
        recurrentExpand(data,flag){
            if(data && data instanceof Array && data.length >0){
                for(let i=0;i<data.length;i++){
                    let _children = data[i][this.childrenKey];
                    if(flag){
                        data[i].__expand = true;
                        if(_children && _children instanceof Array && _children.length != 0){
                            data[i].__cls = "fa-caret-down";
                        }else{
                            data[i].__cls = "fa-caret-left";
                        }
                    }else{
                        data[i].__expand = false;
                        data[i].__cls = "fa-caret-right";
                    }
                    if(_children && _children instanceof Array && _children.length != 0){
                        this.recurrentExpand(_children,flag);
                    }
                }
            }
        },
        /**
         * @description 递归，是否选中所有
         * @param {Array} data 
         * @param {beanloon} flag 
         */
        recurrentChecked(data, flag){
            if(data && data instanceof Array && data.length > 0){
                for(let i=0;i<data.length;i++){
                    data[i].__checkboxStatus = flag;
                    let _children = data[i][this.childrenKey];
                    if(_children && _children instanceof Array && _children.length != 0){
                        this.recurrentChecked(_children,flag);
                    }
                }
            }
        },
        /**
         * @description 对外暴露绑定方法
         * @param {String} field 
         * @param {Array} array 
         */
        bindData(field, array){
            array.forEach(x=>{
                let node = _treeTool.getNodeByField(this.state.data, field, x.name);
                node.__checkboxStatus = x.status;
                node.__expand = true;
                if(node.__children.length >0){
                    node.__cls = "fa-caret-down";
                }else{
                    node.__cls = "fa-caret-left";
                }
            })
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
        setParentNodeExpand(node,tag){
            let parentNode = node.__parentNode;
            if(!parentNode){
                return;
            }
            parentNode.__expand = tag;
            let _p_p_node = parentNode.__parentNode;
            if(_p_p_node){
                _p_p_node.__expand = tag;
                this.setParentNodeExpand(_p_p_node,tag);
            }
        },
        /**
         * @description 设置选中项
         */
        setSelectItem(field,val){
            let item = _treeTool.getNodeByField(this.state.data,field,val);
            _treeTool.setSingleColor(this.state.data,item);
            this.setParentNodeExpand(item,true);
            this.itemClick(item);
        },
        /**
         * @description 对外暴露展开折叠所有方法
         * @param {beanloon} flag 
         */
        expandAll(flag){
            this.recurrentExpand(this.state.data,flag);
        },
        /**
         * @description 对外暴露checkbox选中方法
         * @param {beanloon} flag 
         */
        checkAll(flag){
            this.recurrentChecked(this.state.data, flag);
        },
        /**
         * @description 更新单个节点
         * @param node 当前节点
         * @param data 传输的数据,格式{__displayName:"a",__children:[]}
         */
        reloadNode(node,data){
            node[this.displayName] = data.__displayName?data.__displayName:node[this.displayName];
            if(data.__children && data.__children instanceof Array && data.__children.length != 0){
                let tmpData = Constant.TREE_CONFIG.ASYNINITATTRIBUTE(data.__children,node,false);
                node.__children = tmpData;
            }else{
                node.__children = [];
            }
        },
        /**
         * @description 删除节点
         * @param node 需要删除的节点
         */
        deleteSingleNode(node){
            let parentNode = node.__parentNode;
            //非根节点
            if(parentNode){
                $array.removeItem(parentNode.__children,[node]);
            }
            //根节点
            else{
                $array.removeItem(this.state.data,[node]);
            }
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
        }
    },
    mounted(){
        //订阅所有
        let that = this;
        /**
         * @description 处理所有订阅事件
         */
        $event_publisher.on(this.EVENTPUBLISHKEY,d=>{
            let item = d.item;
            //如果数据错误，没有找到当前节点，直接return
            if(!item){
                return;
            }
            //有children的情况下，展开事件
            else if(d.actionKey == Constant.TREE_CONFIG.ACTIONKEY.OPEN){
                item.__expand = d.data.expand;
                item.__cls = d.data.cls;
            }
            //当前项选中事件，执行callback
            else if(d.actionKey == Constant.TREE_CONFIG.ACTIONKEY.SELECTEDITEM){
                _treeTool.setSingleColor(this.state.data,item);
                this.itemClick(item);
            }
            //checkbox状态变化事件
            else if(d.actionKey == Constant.TREE_CONFIG.ACTIONKEY.CHECKBOX){
                if(this.related == undefined){
                    //改变所有子节点的checkbox状态
                    this.setChildrenCheckboxStatus(item, d.checkboxStatus);
                    //改变所有父节点的checkbox状态
                    this.setParentCheckBoxStatus(item.__parentNode);
                }else{
                    item.__checkboxStatus = d.checkboxStatus;
                }
            }
        })
    }
}
</script>

<style scoped>
.localTreeContent{
    overflow: auto;
    width: 100%;
    height: 100%;
}
</style>
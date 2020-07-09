
<template>
    <div class="treeContent" style="height:2000px;border:1px solid bule">
        <div style="float:left">
            <button @click="deleteNode">删除节点</button>
            <button @click="getNodes">获取被选中节点</button>
            <button @click="reSet">reSet</button>
            <button @click="bind">bind</button>
            <button @click="setItem">setItem</button>
            <button @click="expandAll(true)">expand</button>
            <button @click="expandAll(false)">unExpand</button>
            <button @click="checkall(true)">checkAll</button>
            <button @click="checkall(false)">unCheckAll</button>
            <!-- <le-asyn-tree displayName="name" :asynOptions="asynOptions" ref="tree" :itemClick="itemClick" checkbox></le-asyn-tree> -->
            <div style="width:200px">
                <le-local-tree displayName="classificationName" ref="tree1" :itemClick="itemClick" childrenKey="nodes" checkbox></le-local-tree>
            </div>
            <!-- <le-local-tree displayName="classificationName" ref="tree1" :itemClick="itemClick" childrenKey="nodes" checkbox></le-local-tree> -->

            <le-button type="upload" @click="uploadb" value="上传"></le-button>
            <le-button type="upload" @click="setFile" value="setFile"></le-button>
            <le-button type="upload" @click="clear" value="clear"></le-button>

            <le-local-upload :options="upo" ref="upod"></le-local-upload>
        </div>
        <div style="float:left">
            <le-button value="新增菜单" @click="save"></le-button>
            <le-button value="删除节点" @click="remove"></le-button>

            <le-button value="Local更新节点" @click="updateLocal"></le-button>
            <le-button value="Local删除节点" @click="removeLocal"></le-button>
        </div>

        <!-- <div style="clear:both">
            <table-list
                title="<#Compontent Template Mangerment#> "
                ref="component_table"
                :options="tableOptions"
            ></table-list>
        </div> -->

        <div style="clear:both">
            <le-date-picker label="日期组件" v-model="entity.date"></le-date-picker>

            <le-date-time-picker label="时间日期组件" v-model="entity.datetime"></le-date-time-picker>


            <le-button value="success" @click="getDT('success')"></le-button>
            <le-button value="warning" @click="getDT('warning')"></le-button>
            <le-button value="error" @click="getDT('error')"></le-button>
        </div>
    </div>
    
</template>

<script>
import DATA from "./data.js";
import Uint from "../core/tool/commonUtil.js";
export default {
    name:"TreeTest",
    data(){
        return {
            entity:{
                date:"",
                datetime:""
            },
            selectNode:null,
            data:[],
            postData:null,
            asynOptions:{
                getUrl:d=>{
                    return "/auth/resources/getResources?parent_id="+d.id;
                },
                analysis:d=>{
                    return d.data;
                }
            },
            upo:{
                fname:"file",
                callback:(data=>{
                    this.postData = data;
                })
            },
            tableOptions:{
                getUrl(){
                    return "/tpl/component/pagelist?isEdit=true&types=3&categoryId=&nameLike=&terminal=1";
                },
                pageOption: {
                    sizeKey: "pageSize",
                    indexKey: "curPage",
                    index: 1,
                    size: 10
                },
                 actions:[
                    {
                        key:"update",
                        val:"编辑",
                    },
                    {
                        key:"remove",
                        val:"注销",
                    },
                ],
                map: [
                    { key:"id",val:"<#Component ID#>"},
                    { key:"name",val:"<#Component Name#>"},
                    { key:"remark",val:"<#Comp Description#>"},
                ],
                analysis: data => {
                    if (data && data.data && data.data.dataList) {
                        return {
                            data: data.data.dataList,
                            count: data.data.count
                        };
                    } else {
                        return { data: [], count: 0 };
                    }
                }
            }
        }
    },
    methods:{
        getDT(t){
            this.alert.showAlert(t,"asd");
        },
        itemClick(item){
            console.log(11111,item);
            this.selectNode = item;
        },
        setItem(){
            this.$refs["tree1"].setSelectItem("categoryCode",1);
        },
        deleteNode(){
            this.$refs["tree"].deleteSingleNode(this.selectNode);
        },
        getNodes(){
            let res = this.$refs["tree"].getAllCheckedNodes();
            let res1 = this.$refs["tree1"].getAllCheckedNodes();
            console.log(res,res1);
        },
        getTreeData(id){
            // if(this._store.treeData.length >0){
            //     return;
            // }
            this.ajax.getFetch("/auth/resources/getResources?parent_id="+id).then(d=>{
                this.data = d.data;
                this.$refs["tree"].init(d.data);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        reSet(){
            this.$refs["tree"].reset();
            this.$refs["tree1"].reset();
        },
        bind(){
            this.$refs["tree1"].bindCKByField("code",["2610","2631","2715","2635","2735","2736","2738","2673"]);
        },
        expandAll(flag){
            this.$refs["tree1"].expandAll(flag);
        },
        checkall(flag){
            this.$refs["tree1"].checkAll(flag);
        },
        save(){
            let params = {
                parent_id: "dd9dcf8b-b882-4611-908b-e2cf03ace556",
                id: "",
                name: "test" + Math.ceil(Math.random()*100),
                url: "11111"+ Math.ceil(Math.random()*100),
                display_order: 1,
                isIdempotent: 0,
                isCompatible: 0,
                isDefaultOpt: 0,
                isWritable: 0,
                isOutLink: 0,
                paramFilters: [],
                createBy: "",
                createTimeStr: "",
                updateBy: "",
                updateTimeStr: "",
            }
            this.ajax.postFormData("/auth/resources/saveOrUpdateApi", params).then(d=>{
                this.alert.showAlert("success","insert success");
                this.$refs["tree"].reloadNode(this.selectNode);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        remove(){
            this.ajax.postFormData("/auth/resources/delResource?id=" + this.selectNode.id, null).then(d=>{
                this.alert.showAlert("success","remove success");
                this.$refs["tree"].reloadNode(this.selectNode.__parentNode);
            }).catch(e=>{
                this.alert.showAlert("error",e.data);
            })
        },
        updateLocal(){
            let data = {__displayName:"newNodeName",__children:[
                {name:"B2_1",age:5,code:3},
                {name:"B2_1",age:6,code:4}
            ]};
            this.$refs["tree1"].reloadNode(this.selectNode, data);
        },
        removeLocal(){
            let data = {__children:[]};
            this.$refs["tree1"].reloadNode(this.selectNode, data);
        },
        uploadb(){
            this.postData.delete("key");
            this.postData.append("key","abcd");
            this.ajax.uploadFetch("xxxx",this.postData);
        },
        setFile(){
            debugger
            this.$refs.upod.getCurrentComponent().setValue("//p2-nec.static.pub//resource/NEC-CTO/QQ20200218-0.fd52ddcd2a40594f.gif");
        },
        clear(){
            // this.$refs.upod.getCurrentComponent().reset();
        },
    },
    mounted(){
        // this.getTreeData(0);
        let tmp_data = DATA.data;
        this.$refs["tree1"].init(tmp_data);

        window.setTimeout(()=>{
            this.entity.datetime = "2043/03/23 12:12:56";
        },1200)
    }
}
</script>

<style>
    .treeContent{
        width: auto;
        border: 1px solid red;
        float: left;
        padding: 24px;
        padding-left: 0;
        text-align: left;
        color: #606266;
        font-size: 14px;
    }

    .treeContent div{
        line-height: 24px;
    }

    .treeContent button{
        border: none;
        background-color: transparent;
        outline: none;
    }
</style>

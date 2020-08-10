<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
            <le-radio-list 
                label="hasDialog" 
                :data-source="hasDialog" display-name="name" display-value="code" 
                v-model="page.hasDialog">
            </le-radio-list>
            <le-local-select
                    label="modelName:"
                    class="pagesType"
                    :data-source="currentModule.modelList"
                    display-name="name"
                    display-value="name"
                    v-model="page.model"
            ></le-local-select>
            <le-input on required msg="请输入页面名称"
                tip="提示: 页面名称必须以.vue结尾"
                label="PageName:" v-model="page.pageName">
            </le-input>
            <le-input 
                on required msg="请输入列表标题"
                label="PageTitle:" v-model="page.pageTitle">
            </le-input>
            <!-- searchModel的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">searchModel</h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.config.searchModel" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="pagesDatasource.searchModelTypes" 
                                        display-name="name" display-value="code"
                                        v-model="item.type">
                                    </le-local-select>
                                    <le-input label="label:" v-model="item.label"></le-input>
                                    <le-input label="field:" v-model="item.field"></le-input>
                                    <le-button type="remove" 
                                        value=" deleteItems" @click="removeCurSearchModelItem(item,idx)">
                                    </le-button>
                                </div>
                                <div class="clearfix le_form_row_item" v-if="item.type == 'select' || item.type == 'checkboxList' || item.type=='radioList'">
                                    <le-input label="displayName:" v-model="item.displayName"></le-input>
                                    <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                                    <le-local-select label="dataSource:" :data-source="dataSource" 
                                        display-name="name" display-value="name"
                                        v-model="item.dataSource">
                                    </le-local-select>
                                    <le-button type="create" value="datasource" @click="add"></le-button>
                                </div>              
                            </div>           
                        </li>
                        <li class="createBtn">
                            <i class="fr addParams iconfont icon-add" type="button" @click="addSearchModel"></i>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- toolbar的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">toolbar</h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.config.toolbar" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="pagesDatasource.toolbarType" 
                                        display-name="name" display-value="code"
                                        v-model="item.type">
                                    </le-local-select>
                                    <le-input label="value:" v-model="item.value"></le-input>
                                    <le-input label="fnName:" tip="提示:请勿输入关键字" v-model="item.fnName"></le-input>
                                    <le-button type="remove" 
                                        value=" deleteItems" @click="removeToolbarItem(item,idx)">
                                    </le-button>
                                </div>           
                            </div>           
                        </li>
                        <li class="createBtn">
                            <i class="fr addParams iconfont icon-add" type="button" @click="addToolbar"></i>
                        </li>
                    </ul>
                </div>
            </div>
   
            <!-- table的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix"> 
                    <h4 class="label">table</h4>
                </div>
                <div class="item">
                    <le-input label="url:" v-model="page.config.table.url"></le-input>
                    <le-radio-list label="showCK:" :data-source="pagesDatasource.tableShowCK" 
                        display-name="name" display-value="code" 
                        v-model="page.config.table.showCK">
                    </le-radio-list>
                    <div>
                        <le-input label="sizeKey:" v-model="page.config.table.page.pageSize"></le-input>
                        <le-input label="pageKey:" v-model="page.config.table.page.currentPage"></le-input>
                    </div>
                    <div>
                        <div class="configItem-title">
                            <h4 data-v-12db787f="" data-v-17f97166="" class="label">map</h4>
                        </div>
                        <div class="item mapItem" v-for="(item,idx) in page.config.table.map" :key="idx">
                            <div class="le_form_row_item col3">
                                <le-input label="key:" v-model="item.key"></le-input>
                                <le-input label="val:" v-model="item.val"></le-input>
                                <le-button class="fr" type="remove" value="deleteItem" @click="removeCurTableMap(item,idx)"></le-button>
                            </div>
                            <i v-if="idx=='page.config.table.map.length-1'" class="fr addParams iconfont icon-add" @click="addTableModelMap"></i>
                        </div>
                        <div class="createBtn iconfont icon-add" @click="addTableModelMap">
                            <!-- <i ></i> -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- datasource的配置 -->
            <le-dialog title="新建dataSource" height="505" width="1000" v-model="dialog.showDialog">
                <div slot="body">
                    <StoreDialog :store="store" :action="dialog.action" :idx="dialog.idx" ref="store" />
                </div>
                <div slot="button">
                    <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                    <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
                </div>
            </le-dialog>
        </div>
    </le-form>
</template>
<script>
import Util from "@util/util.js";
import { mapState, mapActions, mapMutations } from "vuex";
import StoreDialog from "./Store.vue";
export default {
    data(){
        return {
            dialog: {
                showDialog: false,
                action:"",
                idx:null
            },
            store: {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon:false,
            },
            datasourceDialog:false,
           
            hasDialog:[
                { name: "Yes", code: true },
                { name: "No", code: false },
            ],
        }
    },
    props: {
        action:{
            type: String
        },
        page:{
            type : Object
        },
        dataSource : {
            type : Array
        },
        idx:{
            type : Number
        }
    },
    computed:{
        ...mapState(["pagesDatasource","currentModule"]),
        ...mapMutations([]),
    },
    components:{StoreDialog},
    methods:{
        ...mapActions(["addPages","updatePages","addStore", "removeStore"]),
        //添加搜搜条件
        addSearchModel(){
            let obj = {
                label: "",
                type: "text",
                field: "",
            };
            this.page.config.searchModel.push(obj)
        },  
        //删除添加的搜索条件
        removeCurSearchModelItem(item,idx){
            this.page.config.searchModel.splice(idx, 1)
        },
        //添加按钮
        addToolbar(){
            let obj = {
                type: "",
                value: "",
                fnName: "",
            };
            this.page.config.toolbar.push(obj)
        },
        //删除添加的搜索条件
        removeToolbarItem(item,idx){
            this.page.config.toolbar.splice(idx, 1)
        },
        //添加table的map
        addTableModelMap(){
            let obj = {
                key:"",
                val:""
            };
            this.page.config.table.map.push(obj)
        },
        //删除用户添加的tableMap参数
        removeCurTableMap(item,idx){
            this.page.config.table.map.splice(idx, 1)
        },  
        //添加model的参数
        addModelArr(){
            let obj = {
                label: "",
                type: "text",
                field: "",
            };
            this.page.model.push(obj);
        },
        //删除用户添加的dialog参数
        removeCurModelItem(item,idx){
            this.page.model.splice(idx, 1)
        },
        save(){
            let that = this;
            debugger
            let res = this.$refs.saveForm.validate()
                .then(res=>{
                    that.page.type = "list";
                    let reg = /^.*\.vue$/; 
                    if(reg.test(that.page.pageName)){
                        that.page.pageName.replace(/\s/, "");
                        if(that.action == "create"){ 
                            that.addPages(that.page).then(res=>{
                                that.$emit("closePageDialog");
                            }).catch(error=>{
                                that.alert.showAlert("error",error.msg)
                            })  
                        }else{
                            debugger
                            that.updatePages({page:that.page,idx:that.idx}).then(res=>{
                                that.$emit("closePageDialog");
                            }).catch(error=>{
                                that.alert.showAlert("error",error.msg)
                            })
                        };
                    }else{
                        that.alert.showAlert("error","页面名称必须以.vue结尾");
                    };
                })
                .catch(error => {
                    that.alert.showAlert("error", "请填写所有的必填项");
                })
        },
        clearStore(){
            this.store = {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon: false,
            }
        },
        //DataSource
        add() {
            this.clearStore()
            this.dialog.showDialog = true;
            this.dialog.action = "create";
        },
        handleSave() {
            this.$refs.store.submit().then((res)=>{
                this.dialog.showDialog = false;
            }).catch(err=>{
                console.log(err)
                // this.dialog.showDialog = true;
            })
        },
        handleClose() {
            this.dialog.showDialog = false;
        }
    },
    mounted(){
        console.log(this.page)
    }
}
</script>
<style lang="scss" scoped>
.label{
    font-weight: 600;
    font-size: 16px;
}
.configItem{
    border: 1px solid#dcdfe6;
    border-top:none ;
    margin: 10px 0;
    margin-bottom: 40px;
    border-radius: 3px;
    .configItem-title {
        border-bottom: 1px solid #dcdfe6;
        border-top: 1px solid #dcdfe6;
        margin-bottom: 20px;
        height: 43px;
        line-height: 43px;
        text-align: center;
    }
    .item{
        border-bottom: 1px solid #dcdfe6;
        // margin-bottom: 20px;
        li{
            overflow-x: auto;
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
            overflow: visible;
        }
        .createBtn{
            text-align: center;
            border: none;
            line-height: 30px;
            background-color: #e0e0e0;
            margin-bottom: 0;
            font-weight: 900;
            background-color: #a2d469;
            color: #fff;
            font-size: 16px;

                i{
                    width: 100%;
                }
        }
    }
    .mapItem{
        margin-bottom: 20px;
    }
    .item:last-child{
        border-bottom: none;
    }
    .addParams{
        width: 40px;
        height: 100%;
        border-left: 1px solid #dcdfe6;
        cursor: pointer;
    }
}
</style>
<template>
    <div>
        <Tab  :modules="modules" @add="add" @del="del" @change="change">
            <template #pane="{currentIndex}">
                <TabPane
                    v-for="(module,i) in modules"
                    :key="module.ModuleName"
                    :index="i"
                    :currentIndex="currentIndex"
                >
                    <!-- {{module.ModuleName}} -->
                    <div class="card">
                        <Service :sevices="module.Services"></Service>
                    </div>
                    <div class="card pagesCard">
                        <div class="head">
                            <h4 class="le_page_name" style="text-align:center;">Pages Management</h4>
                            <button class="tab_add" @click="createPage">
                                <span role="img" class="actions_add">
                                    <i class="iconfont icon-add"></i>
                                </span>
                            </button>
                        </div>
                        
                        <table class="le_table_container">
                            <thead>
                                <tr>
                                    <th>PageName</th>
                                    <th>PageTitle</th>
                                    <th>PageType</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,idx) in module.Pages" :key="idx">
                                    <td>{{item.pageName}}</td>
                                    <td>{{item.PageTitle}}</td>
                                    <td>{{item.type}}</td>
                                    <td>
                                        <le-button type="update" value="modify" @click="modifyPageHandle(item,idx)"></le-button>
                                        <le-button type="remove" value="delete" @click="removePageHandle(item,idx)"></le-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <le-dialog :title="pageDialog.title" v-model="pageDialog.showDialog" width="1100" height="600">
                            <div slot="body">
                                <le-local-select label="页面类型:" class="pagesType"
                                    :data-source="pageTypes" 
                                    display-name="name" display-value="code" 
                                    :readonly="isEditPages"
                                    @change="changePageType"
                                    v-model="pageType">
                                </le-local-select>
                                <div>
                                    <component v-if="pageDialog.showDialog" ref="pageDialog"  :dataSource = "module.Store" 
                                        :action="pageDialog.action"
                                        :is="pageDialog.component" 
                                        :page="pageDialog.params"
                                        :idx = "pageDialog.idx"
                                        @closePageDialog="closePagesDialogs"
                                    >
                                    </component>
                                </div>
                            </div>
                            <div slot="button">
                                <div class="le_new_page_btn_group">
                                    <le-button value="返回" type="back" @click="closePagesDialogs"></le-button>
                                    <le-button value="确定" type="save" @click="handleSavePages"></le-button>
                                </div>
                            </div>
                        </le-dialog>
                    </div>
                    <div class="card">
                        <storeForm :stores="module.Store.state"></storeForm>
                    </div>
                </TabPane>
            </template>
        </Tab>
        <le-dialog title="create Module" v-model="dialog.showDialog">
            <div slot="body">
                <le-form ref="module">
                    <le-input
                        label="模块名称"
                        msg="请输入模块名称"
                        tip="请输入合法的文件夹名称"
                        v-model="moduleName"
                        on
                        required
                    ></le-input>
                </le-form>
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import Tab from "@pages/components/tab/Tab.vue";
import TabPane from "@pages/components/tab/TabPane.vue";
import PageListForm from "@pages/views/Module/PageListForm.vue";
import PageSaveForm from "@pages/views/Module/PageSaveForm.vue";
import StoreForm from "./StoreForm.vue";
import Service from "./service.vue";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            dialog: {
                showDialog: false,
            },
            pageDialog:{
                showDialog:false,
                title:"",
                params:null,
                component:PageListForm,
                action:"",
                type:"",
                idx:null
            },
            pageModel:{
                pageName:"",
                type:"list",
                pageTitle:"",
                config:{
                    searchModel:[
                        
                    ],
                    table:{
                        url:"",
                        page: {
                            pageSize: "",
                            currentPage: ""
                        },
                        map:[],
                    },
                },
                model:[

                ]
            },
            pageSaveModel:{
                pageName:"",
                type:"save",
                model:[

                ]
            },
            moduleName: "",
            pageType:"list",
            pageTypes:[
                {name:"list",code:"list"},
                {name:"save",code:"save"}
            ],
            isEditPages:false,
        };
    },
    computed: {
        ...mapState(["modules","currentModule"]),
    },
    components: {
        Tab,
        TabPane,
        PageListForm,
        PageSaveForm,
        StoreForm,
        Service
    },
    methods: {
        ...mapActions(["addModules", "removeModules","changeModules","removePages"]),
        del(item) {
            this.removeModules(item.ModuleName);
        },
        add() {
            this.dialog.showDialog = true;
        },
        change(module,idx){
            this.changeModules(module);
        },
        handleSave() {
            this.$refs.module
                .validate()
                .then(res => {
                    if (res.success) {
                        this.addModules(this.moduleName);
                        this.dialog.showDialog = false;
                        this.moduleName = "";
                    }
                })
                .catch(err => {
                    this.alert.showAlert("error", err.info[0]);
                });
        },
        handleClose() {
            this.dialog.showDialog = false;
            this.moduleName = "";
        },

        //添加page的操作
        createPage(){
            this.clearPage();
            this.pageDialog.params = this.pageModel;
            this.pageDialog.showDialog = true;
            this.pageDialog.action = "create";
            this.pageDialog.title = "create";
            this.isEditPages = false;
        },
        clearPage(){
            this.pageDialog.params = null;
            this.pageDialog.showDialog = true;
        },
        clearPageModel(){
            this.pageModel = {
                pageName:"",
                type:"list",
                pageTitle:"",
                config:{
                    searchModel:[
                        
                    ],
                    table:{
                        url:"",
                        page: {
                            pageSize: "",
                            currentPage: ""
                        },
                        map:[],
                    }
                },
                model:[

                ]
            }
        },
        clearSavePageModel(){
            this.pageSaveModel = {
                pageName:"",
                type:"save",
                model:[

                ]
            }
        },
        modifyPageHandle(data,idx){
            this.pageDialog.showDialog = true;
            this.pageType = data.type;
            this.changePageType();
            this.pageDialog.params = {...data};
            this.pageDialog.action = "edit";
            this.pageDialog.title = "edit";
            this.pageDialog.idx = idx;
        },  
        removePageHandle(data){
            this.removePages(data);         
        },
        //关闭dialog
        closePagesDialogs(val){
            if(this.pageType == "list"){
                 this.clearPageModel();
            }else{
                 this.clearSavePageModel();
            };
            this.pageDialog.showDialog = false;
        },
        handleSavePages(){
            this.$refs.pageDialog[0].save();
        },
        changePageType(){
            
            if(this.pageType == "list"){
                this.pageDialog.params = this.pageModel;
                this.pageDialog.component = "PageListForm";
            }else{
                this.pageDialog.params = this.pageSaveModel;
                this.pageDialog.component="PageSaveForm";
            }
            
            this.pageDialog.type = this.pageType;
        }
    }
};
</script>

<style lang="scss" scoped>
.card{
    padding: 10px;
    color: #333;
    font-style: normal;
    .le_table_container {
            width: 100%;
            thead {
                width: 100%;
                th {
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                }
            }
            tbody {
                width: 100%;
                tr {
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    td {
                        text-align: center;
                        border-right: 1px solid #ccc;
                        border-left: 1px solid #ccc;
                    }
                }
            }
    }
    .head {
        position: relative;
        display: flex;
        width: 100%;
        transition: transform 0.3s;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        margin-top: 20px;
        .le_page_name {
            width: 100%;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }
        .tab_add {
            min-width: 40px;
            padding: 0 8px;
            background: #fafafa;
            border: 1px solid #f0f0f0;
            border-radius: 2px 2px 0 0;
            outline: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            .actions_add {
                display: inline-block;
                color: inherit;
                font-style: normal;
                line-height: 0;
                text-align: center;
                text-transform: none;
                vertical-align: -0.125em;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                svg {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
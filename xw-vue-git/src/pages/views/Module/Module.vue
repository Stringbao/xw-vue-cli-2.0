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
                    <h2 class="ModuleName">{{module.ModuleName}}</h2>
                    <div class="card">
                        <h3 class="cardTitle">Services</h3>
                    </div>
                    <div class="card">
                        <h3 class="cardTitle">
                            pages
                            <le-button class="fr" type="create" value="添加" @click="createPage"></le-button>
                        </h3>
                        <ul class="pages">
                            <li v-for="(item,idx) in module.Pages" :key="idx">
                                <div>
                                    <span><i>PageName :</i>{{item.PageName}}</span>
                                    <span><i>PageTitle :</i>{{item.PageTitle}}</span>
                                    <span><i>PageType :</i>{{item.type}}</span>
                                </div>
                                <le-button type="update" value="modify" @click="modifyPageHandle(item,i)"></le-button>
                                <le-button type="remove" value="delete" @click="removePageHandle(item,i)"></le-button>
                            </li>
                        </ul>
                        <le-dialog :title="pageDialogTitle" v-model="dialog.showCreatePage" width="900" height="600">
                            <div slot="body">
                                <le-local-select label="页面类型:" class="pagesType"
                                    :data-source="pageTypes" 
                                    display-name="name" display-value="code" 
                                    :readonly="isEditPages"
                                    v-model="pageType">
                                </le-local-select>
                                <div>
                                    <PageListForm @closePagesDialog="closePagesDialogs" 
                                        :isEditPages = "isEditPages" ref="PageListForm" 
                                        :dataSource = "module.Store"
                                        :Pages = "module.Pages" v-show = "pageType=='list'">
                                    </PageListForm>
                                    <PageSaveForm @closePagesDialog="closePagesDialogs" 
                                        :isEditPages="isEditPages" ref="PageSaveForm" 
                                        :dataSource = "module.Store"
                                        :Pages="module.Pages" v-show="pageType=='save'">
                                    </PageSaveForm>
                                </div>
                            </div>
                        </le-dialog>
                    </div>
                    <div class="card">
                        <h3 class="cardTitle">store</h3>
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
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            dialog: {
                showDialog: false,
                showCreatePage : false
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
        pageDialogTitle(){
            let res = "";
            if(!this.isEditPages){
                res = "Create Page"
            }else{
                res = "Modify Page"
            };
            return res;
        }
    },
    components: {
        Tab,
        TabPane,
        PageListForm,
        PageSaveForm
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
            this.dialog.showCreatePage = true;
            this.isEditPages = false;
            this.$refs.PageListForm[0].resetPageModel();
            console.log(this.modules)
        },
        modifyPageHandle(data,idx){
            debugger
            this.dialog.showCreatePage = true;
            this.isEditPages = true;
            
            if(data.type == "list"){
                this.$refs.PageListForm[idx].initPageModel(data);
            }else{
                this.$refs.PageSaveForm[idx].initPageModel(data)
            };
            this.pageType = data.type;
        },  
        removePageHandle(data){
            this.removePages(data);         
        },
        //关闭dialog
        closePagesDialogs(val){
            this.dialog.showCreatePage = false;
            this.isEditPages = false;
            // this.$refs.PageListForm[0].reset();
        }
    }
};
</script>

<style lang="scss" scoped>
.pages{
    padding: 10px;
    font-size: 16px;
    color: #333;
    font-style: normal;
    li {
    border-bottom: 1px solid #e6e2e2;
    padding: 10px 0;
    display: flex;
        div{
            flex: 1;
            line-height: 36px;
            span{
                    width: 28%;
                    display: inline-block;
                    word-break: break-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    margin: 0 10px;
            }
        }
        span{
            margin: 0 30px;
            color: rgba(0,0,0,0.65);
        }
        .asBtn{
            margin: 3px;
            color: #fff;
        }
        i{
            font-style: normal;
            font-weight: 600;
            margin-right: 10px;
            font-size: 14px;
        }
    }
}
</style>
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
                :data-source="modelList"
                display-name="name"
                display-value="name"
                @change="changeModelName"
                v-model="page.modelName"
        ></le-local-select>
            <le-input on required msg="请输入页面名称"
                tip="提示: 页面名称必须以.vue结尾"
                label="PageName:" v-model="page.pageName"></le-input>
            <!-- Model的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">Model</h4>
                </div>
                <div class="item">
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.model" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="pagesDatasource.searchModelTypes" 
                                        display-name="name" display-value="code"
                                        v-model="item.type">
                                    </le-local-select>
                                    <le-input label="label:" v-model="item.label"></le-input>
                                    <le-input label="field:" v-model="item.field"></le-input>
                                    <le-button class="fr" type="remove" value="deleteItems" 
                                        @click="removeCurModelItem(item,idx)">
                                    </le-button>
                                </div>
                                <div class="le_form_row_item" v-if="item.type == 'select' || item.type == 'checkboxList' || item.type=='radioList'">
                                    <le-input label="displayName:" v-model="item.displayName"></le-input>
                                    <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                                    <le-local-select label="dataSource:" :data-source="dataSource" 
                                        display-name="name" display-value="name" 
                                        v-model="item.dataSource">
                                    </le-local-select>
                                    <!-- 新建DataSource -->
                                    <le-button class="fr" type="create" value="datasource" @click="showDatasource"></le-button>
                                </div>
                                <div class="le_form_row_item col3">
                                    <le-radio-list label="on:" :data-source="pagesDatasource.dialogValidateType" 
                                        display-name="name" display-value="code" 
                                        v-model="item.on">
                                    </le-radio-list>
                                    <le-radio-list label="required:" :data-source="pagesDatasource.dialogValidateType" 
                                        display-name="name" display-value="code" 
                                        v-model="item.required">
                                    </le-radio-list>
                                        <le-input label="msg:" v-model="item.msg"></le-input>
                                </div>
                                <div class="clearfix le_form_row_item col3">
                                    <le-input label="tip:" v-model="item.tip"></le-input>
                                    <!-- <le-input label="Vtype:" v-model="item.Vtype" v-if="item.type == 'text'"></le-input> -->
                                    <le-local-select label="Vtype" v-if="item.type == 'text'"
                                        :data-source="pagesDatasource.vtypeList" 
                                        display-name="name" display-value="code" 
                                        v-model="item.Vtype">
                                    </le-local-select>
                                </div>
                            </div>
                        </li>
                        <li class="createBtn">
                            <i class="fr addParams iconfont icon-add" type="button" @click="addModel"></i>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- datasource的配置 -->
            <le-dialog title="新建dataSource" height="505" width="1000" v-model="dialog.showDialog">
                <div slot="body">
                    <StoreDialog :store="newAddDataSource" :action="dialog.action" :idx="dialog.idx" ref="store" />
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
            //用户配置的dataSource的数据
            newAddDataSource:{},
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
        idx : {
            type : Number
        }
    },
    computed:{
        ...mapState(["modules","pagesDatasource","modelList"]),
        ...mapMutations([]),
    },
    components:{},
    methods:{
        ...mapActions(["addPages","updatePages","addStore"]),
        //添加model
        addModel(){
            let obj = {
                label: "",
                type: "text",
                field: "",
            };
            this.page.model.push(obj)
        }, 
        //删除model
        removeCurModelItem(item,idx){
            this.page.model.splice(idx, 1)
        },
        save(){
            let that = this;
            let res = this.$refs.saveForm.validate()
                .then(res=>{
                    that.page.type = "save";
                    let reg = /^.*\.vue$/; 
                    if(reg.test(that.page.pageName)){
                        that.page.pageName.replace(/\s/, "");
                        if(that.action == "create"){ 
                            that.addPages(that.page);  
                        }else{
                            that.updatePages({page:that.page,idx:that.idx});
                        };
                        this.$emit("closePageDialog");
                    }else{
                        that.alert.showAlert("error","页面名称必须以.vue结尾");
                    };
                })
                .catch(error => {
                    that.alert.showAlert("error", "请填写所有的必填项");
                })
        },
        close(){
            this.$emit("closePagesDialog");
        },
        //DataSource
        showDatasource(){
            this.newAddDataSource = {
                name : "",
                type : "",
                reqType : "",
                url : "",
                isCommon:false,
            };
            this.datasourceDialog = true; 
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
            margin-bottom: 0;
            font-weight: 900;
            background-color: #a2d469;
            color:#fff;

            i{
                width: 100%;
            }
        }
    }
    .item:last-child{
        border-bottom: none;
    }
    .asBtn{
        // padding-left: 10px;
    }
    .addParams{
        width: 40px;
        height: 100%;
        border-left: 1px solid #dcdfe6;
        cursor: pointer;
    }
}
</style>
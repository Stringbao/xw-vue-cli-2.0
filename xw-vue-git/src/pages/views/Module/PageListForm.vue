<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
            <le-radio-list 
                label="hasDialog" 
                :data-source="hasDialog" display-name="name" display-value="code" 
                v-model="page.hasDialog">
            </le-radio-list>
            <le-local-select
                    on required msg="必选"
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
                                    <le-local-select label="dataSource:" :data-source="dataSource.state" 
                                        display-name="name" display-value="name"
                                        v-model="item.dataSource">
                                    </le-local-select>
                                    <le-button type="create" value="datasource" @click="showDatasource"></le-button>
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

            <!-- model的配置 -->
            <div class="configItem">
                <div class="configItem-title">
                    <h4 data-v-12db787f="" data-v-17f97166="" class="label">dialog</h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.model" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="pagesDatasource.dialogFieldType" 
                                        display-name="name" display-value="name"
                                        v-model="item.type">
                                    </le-local-select>
                                    <le-input label="label:" v-model="item.label"></le-input>
                                    <le-input label="field:" v-model="item.field"></le-input>
                                    <le-button class="fr" type="remove" 
                                        value="deleteItem" @click="removeCurModelItem(item,idx)">
                                    </le-button>
                                </div>
                                <div class="le_form_row_item" 
                                    v-if="item.type == 'select' || item.type == 'checkboxList' || item.type=='radioList'">
                                    <le-input label="displayName:" v-model="item.displayName"></le-input>
                                    <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                                    <le-local-select label="dataSource" :data-source="dataSource.state" 
                                        display-name="name" display-value="name" 
                                        v-model="item.dataSource">
                                    </le-local-select>
                                    <le-button class="fr" type="create" value="datasource" @click="showDatasource"></le-button>
                                </div>
                                <div class="col4">
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
                                <div class="clearfix le_form_row_item co2">
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
                            <i class="addParams iconfont icon-add" @click="addModelArr"></i>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- datasource的配置 -->
            <le-dialog title="新建dataSource" height="505" width="1000" v-model="datasourceDialog">
                <div slot="body">
                    <le-form labelWidth='180' ref="dataSourceSaveForm">
                        <div class="clearfix">
                            <le-input on required msg="name必填" label="name:" v-model="newAddDataSource.name"></le-input>
                            <le-radio-list label="type:" :data-source="pagesDatasource.dataSourceType" 
                                display-name="name" display-value="code" 
                                v-model="newAddDataSource.type">
                            </le-radio-list>
                            <le-radio-list labelWidth='180' v-if="newAddDataSource.type == 'array'" label="reqType:" :data-source="pagesDatasource.dataSourceReqType" 
                                display-name="name" display-value="code" 
                                v-model="newAddDataSource.reqType">
                            </le-radio-list>
                            <le-input on required msg="url必填" label="url:" v-model="newAddDataSource.url"></le-input>
                        </div>
                    </le-form>
                </div>
                <div slot="button">
                    <le-button type="cancel" value="<#取消#>" @click="closeDatasourceDialog"></le-button>
                    <le-button type="save" value="<#保存#>" @click="saveDatasourceDialog"></le-button>
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
            type : Object
        },
        idx:{
            type : Number
        }
    },
    computed:{
        ...mapState(["pagesDatasource","modelList"]),
        ...mapMutations([]),
    },
    components:{},
    methods:{
        ...mapActions(["addPages","updatePages","addStore"]),
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
            let res = this.$refs.saveForm.validate()
                .then(res=>{
                    that.page.type = "list";
                    let reg = /^.*\.vue$/; 
                    if(reg.test(that.page.pageName)){
                        that.page.pageName.replace(/\s/, "");
                        if(that.action == "create"){ 
                            that.addPages(that.page);  
                        }else{
                            that.updatePages({page:that.page,idx:that.idx});
                        }
                        this.$emit("closePageDialog");
                    }else{
                        that.alert.showAlert("error","页面名称必须以.vue结尾");
                    };
                })
                .catch(error => {
                    that.alert.showAlert("error", "请填写所有的必填项");
                })
        },
        //如果storee中的DataSource为空则显示新建DataSource的框
        addDataSource(){
            this.newAddDataSource = {
                name : "",
                type : "",
                reqType : "",
                url : ""
            };
            // this.newAddDataSource.push(dataSource);
        },
        showDatasource(){
            this.newAddDataSource = {
                name : "",
                type : "",
                reqType : "",
                url : ""
            };
            this.datasourceDialog = true; 
        },
        saveDatasourceDialog(){
            this.$refs.dataSourceSaveForm.validate()
            .then(res=>{
                this.addStore(this.newAddDataSource);
                this.closeDatasourceDialog(); 
            })
            .catch(error=>{
                this.alert.showAlert("error","请填写所有必填项")
            })
        },
        closeDatasourceDialog(){
            this.datasourceDialog = false; 
        },
        changeModelName(name){
            let model = this.modelList.find(item => item.name==name);
            this.page.model = model.props;
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
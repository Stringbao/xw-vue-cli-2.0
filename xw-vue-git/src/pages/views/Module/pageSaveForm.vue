<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
            <le-input :readonly="isEditPages" on required msg="请输入页面名称"
            label="PageName:" v-model="pageModel.PageName"></le-input>
            <!-- searchModel的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">Model
                        <i class="fr addParams iconfont icon-add" type="button" @click="addModel"></i>
                    </h4>
                </div>
                <div class="item" v-for="(item, idx) in pageConfigModel" :key="idx">
                    <le-button class="fr" type="remove" value="" 
                        @click="removeCurModelItem(item,idx)">
                    </le-button>
                    <le-radio-list label="type:" :data-source="searchModelTypes" 
                        display-name="name" display-value="code" 
                        v-model="item.type">
                    </le-radio-list>
                    
                    <le-input label="label:" v-model="item.label"></le-input>
                    
                    <le-input label="field:" v-model="item.field"></le-input>
                    <div v-if="item.type == 'select'">
                        <le-input label="displayName:" v-model="item.displayName"></le-input>
                        <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                        <le-local-select label="dataSource" :data-source="dataSource.state" 
                            display-name="name" display-value="name" 
                            v-model="item.dataSource">
                        </le-local-select>
                        <!-- 新建DataSource -->
                        <le-button class="fr" type="create" value="addDatasource" @click="showDatasource"></le-button>
                    </div>
                    <le-radio-list label="on:" :data-source="dialogValidateType" 
                        display-name="name" display-value="code" 
                        v-model="item.on">
                    </le-radio-list>
                    <le-radio-list label="required:" :data-source="dialogValidateType" 
                        display-name="name" display-value="code" 
                        v-model="item.required">
                    </le-radio-list>
                </div>
            </div>
            <!-- datasource的配置 -->
            <le-dialog title="新建dataSource" height="505" width="1000" v-model="datasourceDialog">
                <div slot="body">
                    <div class="">
                        <div class="clearfix">
                            <le-input label="name:" v-model="newAddDataSource.name"></le-input>
                            <le-radio-list label="type:" :data-source="dataSourceType" 
                                display-name="name" display-value="code" 
                                v-model="newAddDataSource.type">
                            </le-radio-list>
                            <le-radio-list label="reqType:" :data-source="dataSourceReqType" 
                                display-name="name" display-value="code" 
                                v-model="newAddDataSource.reqType">
                            </le-radio-list>
                            <le-input label="url:" v-model="newAddDataSource.url"></le-input>
                        </div>
                    </div>
                </div>
                <div slot="button">
                    <le-button type="cancel" value="<#取消#>" @click="closeDatasourceDialog"></le-button>
                    <le-button type="save" value="<#保存#>" @click="saveDatasourceDialog"></le-button>
                </div>
            </le-dialog>
        </div>
        <div class="le_new_page_btn_group">
            <le-button value="返回" type="back" @click="close"></le-button>
            <le-button value="确定" type="save" @click="save"></le-button>
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
            searchModelTypes:[
                {name:"text",code:"text"},
                {name:"select",code:"select"}
            ],
            dialogValidateType:[
                {name:"true",code:true},
                {name:"false",code:false},
            ],
            //用户添加的数据
            pageConfigModel:[],
            pageModel:{
                PageName:"",
                type:"save",
                config:{
                    model:[
                        
                    ],
                }
            },
            dataSourceType:[
                {name:"array",code:"array"},
                {name:"enum",code:"enum"},
            ],
            dataSourceReqType:[
                {name:"get",code:"get"},
                {name:"post",code:"post"},
            ],
            //用户配置的dataSource的数据
            newAddDataSource:{}
        }
    },
    props: {
        Pages: {
            type: Array,
        },
        isEditPages : {
            type : Boolean
        },
        dataSource : {
            type : Object
        }
    },
    computed:{
        ...mapState([]),
        ...mapMutations([]),
    },
    components:{},
    methods:{
        ...mapActions(["addPages","removePages","addStore"]),
         //添加搜搜条件
        addModel(){
            let obj = {
                label: "",
                type: "text",
                field: "",
            };
            this.pageConfigModel.push(obj);
        },  
        //删除添加的搜索条件
        removeCurModelItem(item,idx){
            this.pageConfigModel.splice(idx, 1)
        },
        save(){
            this.$refs.saveForm.validate()
            .then(res=>{
                if(res.success){
                    this.pageModel.config.model = this.pageConfigModel;
                    let cloneData = JSON.parse(JSON.stringify( this.pageModel ));
                    if(this.isEditPages){
                        //如果是修改配置的话就把store.js中 保存的数据先删除了  然后在添加新修改过的数据
                        this.removePages(cloneData);
                    };
                    this.addPages(cloneData);
                    this.$emit("closePagesDialog");
                    this.resetPageModel();  
                }
            })
            .catch( error => {
                this.alert.showAlert("error", "请填写所有的必填项");
            })
        },
        //修改的时候 用传入的数据 初始化pageModel
        initPageModel(data){
            if(!data){
                return
            };
            if(data.PageName !== "" && data.PageName !== undefined && data.PageName !== null){
                this.pageModel.PageName = data.PageName;
            };
            if(data.config !== "" && data.config !== undefined && data.config !== null){
                if(data.config.model !== "" && data.config.model !== undefined && data.config.model !== null){
                    this.pageConfigModel = data.config.model;
                }; 
            }
        },
        resetPageModel(){
            this.$refs.saveForm.reset();
            this.pageConfigModel = [],
            this.pageModel = {
                PageName:"",
                type:"save",
                config:{
                    model:[
                        
                    ],
                }
            }
        },
        close(){
            this.$emit("closePagesDialog");
            this.resetPageModel();
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
            this.addStore(this.newAddDataSource);
            this.closeDatasourceDialog(); 
        },
        closeDatasourceDialog(){
            this.datasourceDialog = false; 
        }
    },
    mounted(){
        
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
        margin-bottom: 20px;
    }
    .item:last-child{
        border-bottom: none;
    }
    .asBtn{
        padding-left: 10px;
    }
    .addParams{
        width: 40px;
        height: 100%;
        border-left: 1px solid #dcdfe6;
        cursor: pointer;
    }
}
</style>
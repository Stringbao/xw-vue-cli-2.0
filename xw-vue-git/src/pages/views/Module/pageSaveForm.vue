<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
            <le-input on required msg="请输入页面名称"
            label="PageName:" v-model="page.PageName"></le-input>
            <!-- searchModel的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">Model
                        <i class="fr addParams iconfont icon-add" type="button" @click="addModel"></i>
                    </h4>
                </div>
                <!-- <div class="item" v-for="(item, idx) in page.model" :key="idx"> -->
                    <div class="item" >
                        <ul>
                            <li class="clearfix" v-for="(item, idx) in page.model" :key="idx">
                                <div>
                                    <div class="le_form_row_item">
                                        <le-radio-list label="type:" :data-source="searchModelTypes" 
                                            display-name="name" display-value="code" 
                                            v-model="item.type">
                                        </le-radio-list>
                                        <le-input label="label:" v-model="item.label"></le-input>
                                        <le-input label="field:" v-model="item.field"></le-input>
                                        <le-button class="fr" type="remove" value="deleteItems" 
                                            @click="removeCurModelItem(item,idx)">
                                        </le-button>
                                    </div>
                                    <div class="le_form_row_item" v-if="item.type == 'select'">
                                        <le-input label="displayName:" v-model="item.displayName"></le-input>
                                        <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                                        <le-local-select label="dataSource:" :data-source="dataSource.state" 
                                            display-name="name" display-value="name" 
                                            v-model="item.dataSource">
                                        </le-local-select>
                                        <!-- 新建DataSource -->
                                        <le-button class="fr" type="create" value="datasource" @click="showDatasource"></le-button>
                                    </div>
                                    <div class="le_form_row_item col3">
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
                            </li>
                        </ul>
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
        action:{
            type: String
        },
        page:{
            type : Object
        },
        dataSource : {
            type : Object
        },
        idx : {
            type : Number
        }
    },
    computed:{
        ...mapState(["modules"]),
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
                    if(that.action == "create"){
                        that.addPages(that.page);   
                    }else{
                        that.updatePages({page:that.page,idx:that.idx})
                    }
                    this.$emit("closePageDialog");
                })
                .catch(error => {
                    that.alert.showAlert("error", "请填写所有的必填项");
                })
        },
        close(){
            this.$emit("closePagesDialog");
        },
        //如果storee中的DataSource为空则显示新建DataSource的框
        addDataSource(){
            this.newAddDataSource = {
                name : "",
                type : "",
                reqType : "",
                url : ""
            };
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
        margin-bottom: 20px;
        li{
            overflow-x: auto;
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
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
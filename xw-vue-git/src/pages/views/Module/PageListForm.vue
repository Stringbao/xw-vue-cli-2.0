<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
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
                    <h4 class="label">searchModel
                        <i class="fr addParams iconfont icon-add" type="button" @click="addSearchModel"></i>
                    </h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.config.searchModel" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="searchModelTypes" 
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
                    </ul>
                </div>
            </div>




            <!-- toolbar的配置 -->
            <div class="configItem">
                <div class="configItem-title clearfix">
                    <h4 class="label">toolbar
                        <i class="fr addParams iconfont icon-add" type="button" @click="addToolbar"></i>
                    </h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.config.toolbar" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="toolbarType" 
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
                    <le-radio-list label="showCK:" :data-source="tableShowCK" 
                        display-name="name" display-value="code" 
                        v-model="page.config.table.showCK">
                    </le-radio-list>
                    <div>
                        <le-input label="sizeKey:" v-model="page.config.table.page.pageSize"></le-input>
                        <le-input label="pageKey:" v-model="page.config.table.page.currentPage"></le-input>
                    </div>
                    <div>
                        <div class="configItem-title">
                            <h4 data-v-12db787f="" data-v-17f97166="" class="label">map
                                <i class="fr addParams iconfont icon-add" @click="addTableModelMap"></i>
                            </h4>
                        </div>
                        <div class="item" v-for="(item,idx) in page.config.table.map" :key="idx">
                            <div class="le_form_row_item col3">
                                <le-input label="key:" v-model="item.key"></le-input>
                                <le-input label="val:" v-model="item.val"></le-input>
                                <le-button class="fr" type="remove" value="deleteItem" @click="removeCurTableMap(item,idx)"></le-button>
                                
                            </div>
                            <i v-if="idx=='page.config.table.map.length-1'" class="fr addParams iconfont icon-add" @click="addTableModelMap"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- model的配置 -->
            <div class="configItem">
                <div class="configItem-title">
                    <h4 data-v-12db787f="" data-v-17f97166="" class="label">dialog
                        <i class="fr addParams iconfont icon-add" @click="addModelArr"></i>
                    </h4>
                </div>
                <div class="item" >
                    <ul>
                        <li class="clearfix" v-for="(item, idx) in page.model" :key="idx">
                            <div>
                                <div class="le_form_row_item">
                                    <le-local-select label="type:" :data-source="dialogFieldType" 
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
                                    <le-radio-list label="on:" :data-source="dialogValidateType" 
                                        display-name="name" display-value="code" 
                                        v-model="item.on">
                                    </le-radio-list>
                                    <le-radio-list label="required:" :data-source="dialogValidateType" 
                                        display-name="name" display-value="code" 
                                        v-model="item.required">
                                    </le-radio-list>
                                    <le-input label="msg:" v-model="item.msg"></le-input>
                                </div>
                                <div class="clearfix le_form_row_item co2">
                                    <le-input label="tip:" v-model="item.tip"></le-input>
                                    <!-- <le-input label="Vtype:" v-model="item.Vtype" v-if="item.type == 'text'"></le-input> -->
                                    <le-local-select label="Vtype" v-if="item.type == 'text'"
                                        :data-source="vtypeList" 
                                        display-name="name" display-value="code" 
                                        v-model="item.Vtype">
                                    </le-local-select>
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
                {name:"select",code:"select"},
                {name:"datepicker",code:"datepicker"},
                {name:"timepicker",code:"timepicker"},
                {name:"dateTimepicker",code:"dateTimepicker"},
                {name:"checkboxList",code:"checkboxList"},
                {name:"radioList",code:"radioList"},
                {name:"textarea",code:"textarea"}
            ],
            toolbarType:[
                {name:"下载",code:"download"},
                {name:"审核",code:"approve"},
                {name:"拒绝",code:"reject"},
                {name:"启用",code:"start"},
                {name:"停用",code:"stop"},
                {name:"重置",code:"reset"},
                {name:"上架",code:"up"},
                {name:"下架",code:"down"},
                {name:"发布",code:"publish"},
                {name:"取消发布",code:"cancelPublish"},
                {name:"导入",code:"import"},
                {name:"导出",code:"export"},
                {name:"批量操作",code:"review"},
                {name:"复制",code:"copy"},
                {name:"设置",code:"setting"},
                {name:"装修",code:"decorate"},
                {name:"上一页",code:"prevPage"},
                {name:"下一页",code:"nextPage"},
                {name:"确定",code:"confirm"},
                {name:"保存",code:"save"},
                {name:"返回",code:"back"},
                {name:"取消",code:"cancel"},
                {name:"请选择XXX",code:"choose"},
                {name:"暂存",code:"holdSave"},
                {name:"上一步",code:"prev"},
                {name:"下一步",code:"next"},
                {name:"默认",code:"default"},
                {name:"警告",code:"warning"},
            ],
            dialogFieldType:[
                {name:"text",code:"text"},
                {name:"select",code:"select"},
                {name:"datepicker",code:"datepicker"},
                {name:"timepicker",code:"timepicker"},
                {name:"dateTimepicker",code:"dateTimepicker"},
                {name:"checkboxList",code:"checkboxList"},
                {name:"radioList",code:"radioList"},
                {name:"textarea",code:"textarea"}
            ],
            tableShowCK:[
                {name:"none",code:""},
                {name:"radio",code:"isRadio"},
                {name:"checkbox",code:"isCheckbox"},
            ],
            vtypeList:[
                {name:"自然数,包含0和正整数",code:"natureNum"},
                {name:"正数,负数,小数,整数",code:"decimals"},
                {name:"正数,负数,整数",code:"number"},
                {name:"正整数",code:"positive"},
                {name:"正小数",code:"positiveDecimals"},
                {name:"正数",code:"positiveNumber"},
                {name:"负数",code:"negativeNumber"},
                {name:"负小数",code:"negativeDecimals"},
                {name:"负整数",code:"negative"},
                {name:"邮箱",code:"email"},
                {name:"url",code:"url"},
                {name:"https",code:"https"},
                {name:"http",code:"http"},
                {name:"身份证",code:"id"},
                {name:"手机号(不包含固话)",code:"phone"},
                {name:"电话号(包含固话,手机)",code:"tel"},
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
        idx:{
            type : Number
        }
    },
    computed:{
        ...mapState([]),
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
        margin-bottom: 20px;
        li{
            overflow-x: auto;
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
            overflow: visible;
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